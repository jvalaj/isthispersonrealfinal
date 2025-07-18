import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Search,
  CheckCircle,
  Globe,
  Activity,
  Upload,
  Image,
  AudioWaveform,
  Loader2,
} from "lucide-react";
import { searchWithGemini } from "./gemini";
// Add this function at the top (outside App)
async function analyzeImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch("https://youngjeck-aidetect.hf.space/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  const result = await response.json();
  return result;
}

// Gemini Loading Animation Component
const GeminiLoadingAnimation = () => {
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCountdown(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showCountdown, countdown]);

  return (
    <div className="mt-8 text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
      </div>
      
      {!showCountdown ? (
        <div className="text-lg font-bold animate-pulse">
          Is this person <span className="text-blue-400">real</span>?
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-sm text-gray-400">
            You will find out in..
          </div>
          <div className="text-3xl font-bold text-blue-400 animate-bounce">
            {countdown > 0 ? countdown : "🔍"}
          </div>
      
        </div>
      )}
    </div>
  );
};

// Person Results Card Component
const PersonResultsCard = ({ result }: { result: string }) => {
  // Parse the result to extract structured information
  const parseResult = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const parsed: any = {};
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('- Name:') || trimmedLine.startsWith('Name:')) {
        parsed.name = trimmedLine.replace(/^-?\s*Name:\s*/, '').trim();
      } else if (trimmedLine.startsWith('- seemsReal:') || trimmedLine.startsWith('seemsReal:')) {
        parsed.seemsReal = trimmedLine.replace(/^-?\s*seemsReal:\s*/, '').trim();  
      } else if (trimmedLine.startsWith('- who is this?:') || trimmedLine.startsWith('who is this?:')) {
        parsed.whoIsThis = trimmedLine.replace(/^-?\s*who is this\?:\s*/, '').trim();
      } else if (trimmedLine.startsWith('- Searched:') || trimmedLine.startsWith('Searched:')) {
        parsed.searched = trimmedLine.replace(/^-?\s*Searched:\s*/, '').trim();
      } else if (trimmedLine.startsWith('- realnessExplanation:') || trimmedLine.startsWith('realnessExplanation:')) {
        parsed.realnessExplanation = trimmedLine.replace(/^-?\s*realnessExplanation:\s*/, '').trim();
      }
    });
    
    // If we don't have structured data, treat the whole thing as a summary
    if (!parsed.name && !parsed.seemsReal && !parsed.whoIsThis && !parsed.searched) {
      parsed.summary = text;
    }
    
    return parsed;
  };

  const data = parseResult(result);

  return (
    <div className="mt-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 rounded-xl p-6 backdrop-blur-sm shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-grey-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {data.name ? data.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{data.name || 'Search Results'}</h3>
           
          </div>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {data.seemsReal || 'analyzing.'}
        </div>
      </div>

      {/* Verification Status */}
      {data.whoIsThis && (
        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-semibold text-blue-400">who is this?</h4>
          </div>
          <p className="text-sm text-gray-300">{data.whoIsThis}</p>
        </div>
      )}

      {/* Searched Platforms */}
      {data.searched && (
        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-semibold text-purple-400">source</h4>
          </div>
          <p className="text-sm text-gray-300">{data.searched}</p>
        </div>
      )}

      {/* Realness Explanation */}
      {data.realnessExplanation && (
        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <h4 className="text-sm font-semibold text-green-400">Realness Details</h4>
          </div>
          <p className="text-sm text-gray-300">{data.realnessExplanation}</p>
        </div>
      )}

      {/* Display full response if no structured data found */}
      {data.summary && (
        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-orange-400" />
            <h4 className="text-sm font-semibold text-orange-400">Full Response</h4>
          </div>
          <div className="text-sm text-gray-300 whitespace-pre-wrap">{data.summary}</div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
      
      </div>
    </div>
  );
};



interface Person {
  id: string;
  name: string;
  platform: string;
  profileUrl?: string;
  confidence: number;
  isVerified: boolean;
  lastSeen?: string;
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [searchContext, setSearchContext] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);
  const [isGeminiSearching, setIsGeminiSearching] = useState<boolean>(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const searchMessages = [
    'Finding the person...',
    'Scraping sites...',
    'Analyzing multiple sites...',
    'Deciding if person is real...'
  ];
  const [searchMessageIndex, setSearchMessageIndex] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    
    // File validation
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setUploadError("File size too large. Please upload an image smaller than 10MB.");
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      setUploadError("Please upload a valid image file.");
      return;
    }
    
    setSelectedFile(file);
    setUploadResult(null);
    setUploadError(null);
    setIsAnalyzing(true);
    createImagePreview(file);
    
    try {
      const data = await analyzeImage(file);
       setUploadResult(data);
    } catch (err) {
      console.error('Image analysis error:', err); // Debug log
      setUploadError("Failed to analyze image. Please try again.");
      // Set fallback demo data for testing
      setUploadResult({
        label: "Real",
        confidence: 0.8542,
        scores: {
          "Real": 0.8542,
          "AI": 0.1458
        }
      });
    }
    setIsAnalyzing(false);
  };

  // Update handleFileSelect to enable upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const createImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };



  const resetAnalysis = () => {
    if (selectedFile) {
      setSelectedFile(null);
      setImagePreview(null);
      setUploadResult(null);
      setIsAnalyzing(false);
      setUploadError(null);
    }
  };

  const searchPerson = async (name: string) => {
    if (!name.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      setGeminiResult(null);
      setSearchError(null);
      return;
    }

    // start cycling messages
    setSearchMessageIndex(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setSearchMessageIndex(i => (i + 1) % searchMessages.length);
    }, 1000);

    setHasSearched(true);
    setSearchResults([]);
    setGeminiResult(null);
    setIsSearching(true);
    setSearchError(null);
    setIsGeminiSearching(true);
    setGeminiError(null);

    try {
      const geminiData = await searchWithGemini(name.trim(), searchContext.trim());
      setGeminiResult(geminiData);
      setSearchError(null);
    } catch (error) {
      console.error("Gemini search error:", error);
      setGeminiError(`Failed to get results from Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSearching(false);
      setIsGeminiSearching(false);
      // stop cycling messages
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  // Handle key press for search input fields
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchName.trim()) {
      searchPerson(searchName);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-4 py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5" />
            <span className="text-base font-bold tracking-wider">
              ISTHISPERSONREAL
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <AudioWaveform className="w-4 h-4"/>
            <span className="font-bold tracking-wider text-sm">built by <u><a href="https://github.com/jvalaj">@jvalaj</a></u></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl  mx-auto px-6 py-6 flex-grow flex flex-col">
        {/* Hero Section - reducing size to fit screen better */}
        <section className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter relative z-10">
              Is This Person <br />
              <span className="text-blue-400">Real?</span>
            </h1>
            <p className="mt-3 text-lg text-gray-300 relative z-10">
              Ever wondered if that person you see online is real..
            </p>
            <p className="text-gray-400 mt-1 text-xs mx-auto relative z-10">
              [We search the web for traces of their existence and tell you what we found.]
            </p>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row lg:space-x-8 flex-grow">
          {/* Search Section */}
          <section id="search" className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm flex flex-col h-auto">
              <div className="flex items-center space-x-3 mb-3">
                <Search className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold tracking-wider">
                  Search by Name
                </h2>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Enter a name to search for public records and social media
                presence.
              </p>
              <div className="space-y-3">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter a full name..."
                    className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => searchPerson(searchName)}
                    disabled={isSearching}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md disabled:bg-gray-600 flex items-center flex-shrink-0"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="animate-spin mr-2" />
                        {searchMessages[searchMessageIndex]}
                      </>
                    ) : (
                      <>
                        <Search className="mr-2" />
                        {hasSearched ? 'Search again' : 'Search'}
                      </>
                    )}
                  </button>
                </div>
                <div>
                  <input
                    type="text"
                    value={searchContext}
                    onChange={(e) => setSearchContext(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Why are you looking for this person? (optional context)"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {searchError && (
                <p className="text-red-400 mt-4">{searchError}</p>
              )}

              {/* Fixed height scrollable container for search results */}
              <div className="mt-4 flex-grow overflow-y-auto max-h-[400px]">
                {searchResults.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Search Results</h3>
                    <div className="space-y-3">
                      {searchResults.map((person) => (
                        <div
                          key={person.id}
                          className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold">{person.name}</span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                person.isVerified
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-yellow-500/20 text-yellow-300"
                              }`}
                            >
                              {person.isVerified ? "Verified" : "Unverified"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            {person.platform}
                          </p>
                          {person.profileUrl && (
                            <a
                              href={person.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-sm block mb-2"
                            >
                              View Profile
                            </a>
                          )}
                          <p className="text-sm">
                            Confidence: {person.confidence.toFixed(2)}%
                          </p>
                          {person.lastSeen && (
                            <p className="text-xs text-gray-500 mt-1">
                              Last seen: {person.lastSeen}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isGeminiSearching && (
                  <GeminiLoadingAnimation />
                )}

                {geminiError && (
                  <p className="text-red-400 mt-4">{geminiError}</p>
                )}

                {geminiResult && (
                  <PersonResultsCard result={geminiResult} />
                )}
              </div>
            </div>
          </section>

          {/* Image Analysis Section */}
          <section id="image-analysis" className="w-full lg:w-1/2 mt-6 lg:mt-0 flex flex-col">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm flex flex-col h-auto">
              <div className="flex items-center space-x-3 mb-3">
                <Image className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold tracking-wider">
                  Analyze by Image
                </h2>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Upload an image to detect if it was generated by AI.
              </p>

              <div
                className={`relative border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors ${
                  dragActive ? "border-purple-400 bg-gray-800/50" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                  accept="image/*"
                  aria-label="Upload an image for analysis"
                />
                <Upload className="w-8 h-8 mx-auto mb-4 text-gray-500" />
                <label htmlFor="file-upload" className="text-purple-400">
                  Drag & drop or <u>click to upload</u>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>

              {isAnalyzing && (
                <div className="mt-6 text-center">
                  <Loader2 className="animate-spin inline-block w-8 h-8" />
                  <p>Analyzing image...</p>
                </div>
              )}

              {uploadError && (
                <p className="text-red-400 mt-4">{uploadError}</p>
              )}

              {/* Fixed height scrollable container for image results */}
              <div className={`flex-grow overflow-y-auto  ${imagePreview ? 'mt-4' : 'mt-0'}`}>
                {imagePreview && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">Analysis Result</h3>
                    <div className="space-y-4">
                      <div className="w-full">
                        <img
                          src={imagePreview}
                          alt="Uploaded preview"
                          className="rounded-lg max-h-60 w-full object-cover"
                        />
                      </div>
                      <div className="w-full">
                        {uploadResult && (
                          <div className="space-y-4">
                            {uploadResult.label && uploadResult.confidence ? (
                              <div>
                                {/* Main Result */}
                                <div className="mb-4">
                                  <div className="flex justify-between mb-2">
                                    <span className="text-lg font-bold text-gray-200">
                                      Analysis Result
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                      uploadResult.label.toLowerCase() === "real" 
                                        ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                                    }`}>
                                      {uploadResult.label}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-400 mb-3">
                                    Confidence: {(uploadResult.confidence * 100).toFixed(2)}%
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div
                                      className={`h-3 rounded-full ${
                                        uploadResult.label.toLowerCase() === "real"
                                          ? "bg-green-500"
                                          : "bg-red-500"
                                      }`}
                                      style={{
                                        width: `${uploadResult.confidence * 100}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>

                                {/* Detailed Scores */}
                                {uploadResult.scores && (
                                  <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-300">Detailed Scores:</h4>
                                    {Object.entries(uploadResult.scores).map(([key, score]: [string, any]) => (
                                      <div key={key} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-300">{key}</span>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-sm text-gray-400">
                                            {(score * 100).toFixed(2)}%
                                          </span>
                                          <div className="w-20 bg-gray-700 rounded-full h-2">
                                            <div
                                              className={`h-2 rounded-full ${
                                                key.toLowerCase() === "real" || key.toLowerCase() === "human"
                                                  ? "bg-green-500"
                                                  : "bg-red-500"
                                              }`}
                                              style={{
                                                width: `${score * 100}%`,
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="p-4 bg-gray-800 rounded-lg">
                                <p className="text-gray-300 text-sm">
                                  Analysis Result: {JSON.stringify(uploadResult, null, 2)}
                                </p>
                              </div>
                            )}
                            <button
                              onClick={resetAnalysis}
                              className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md w-full"
                            >
                              Analyze Another Image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-6 py-4 border-t border-gray-800 mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Terminal className="w-5 h-5" />
            <span className="font-bold tracking-wider">ISTHISPERSONREAL</span>
          </div>
          <div className="flex items-center space-x-3">
            <AudioWaveform className="w-5 h-5"/>
            <span className="font-bold tracking-wider">built by <u><a href="https://github.com/jvalaj">@jvalaj</a></u></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
