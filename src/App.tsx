import React, { useState, useEffect } from "react";
import {
  Terminal,
  Search,
  Database,
  CheckCircle,
  Globe,
  Code,
  Cpu,
  Activity,
  Upload,
  Image,
  AudioWaveform ,
  Loader2,
} from "lucide-react";
import { GRAPHQL_ENDPOINT } from "./config";
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
  // Debug: log the raw result
  console.log('Raw Gemini result:', result);
  
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
      }
    });
    
    // If we don't have structured data, treat the whole thing as a summary
    if (!parsed.name && !parsed.seemsReal && !parsed.whoIsThis && !parsed.searched) {
      parsed.summary = text;
    }
    
    return parsed;
  };

  const data = parseResult(result);
  
  // Debug: log the parsed data
  console.log('Parsed data:', data);

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
  const [verificationCount, setVerificationCount] = useState(247);
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

  const handleFile = async (file: File) => {
    if (!file) return;
    setSelectedFile(file);
    setUploadResult(null);
    setUploadError(null);
    setIsAnalyzing(true);
    createImagePreview(file);
    try {
      const data = await analyzeImage(file);
      setUploadResult(data);
    } catch (err) {
      setUploadError("Something went wrong.");
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

  useEffect(() => {
    const interval = setInterval(() => {
      setVerificationCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      setGeminiResult(null);
      return;
    }

    setSearchResults([]);
    setGeminiResult(null);
    setIsSearching(true);
    setSearchError(null);
    setIsGeminiSearching(true);
    setGeminiError(null);

    try {
      const query = `
        query {
          searchPerson(name: "${name.trim()}") {
            id
            name
            platform
            profileUrl
            confidence
            isVerified
            lastSeen
          }
        }
      `;

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to search");
      }

      const data = await response.json();
      setSearchResults(data.data.searchPerson || []);
    } catch (error) {
       setSearchResults([]);
    } finally {
      setIsSearching(false);
    }

    try {
      const geminiData = await searchWithGemini(name.trim(), searchContext.trim());
      setGeminiResult(geminiData);
    } catch (error) {
      console.error("Gemini search error:", error);
      setGeminiError(`Failed to get results from Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGeminiSearching(false);
    }
  };

  const techStack = [
    { name: "Java", usage: "Backend API development and business logic" },
    {
      name: "Spring Boot",
      usage: "GraphQL API framework and dependency injection",
    },
    {
      name: "Python (FastAPI)",
      usage: "Machine learning model serving and image processing",
    },
    {
      name: "OpenAI",
      usage: "Natural language processing and content analysis",
    },
    {
      name: "Hugging Face Model",
      usage: "Facial recognition and image comparison",
    },
    { name: "MySQL", usage: "Primary database for user data and results" },
    { name: "Redis", usage: "Caching and session management" },
    { name: "React", usage: "Frontend UI development" },
  ];

  const platforms = [
    { name: "LinkedIn", verified: 5, flagged: 2, accuracy: 78.2 },
    { name: "X", verified: 7, flagged: 1, accuracy: 72.6 },
    { name: "Instagram", verified: 13, flagged: 5, accuracy: 80.1 },
    { name: "Facebook", verified: 8, flagged: 2, accuracy: 75.8 },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
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
      <header className="relative z-50 px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6" />
            <span className="text-lg font-bold tracking-wider">
              ISTHISPERSONREAL
            </span>
          </div>
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <AudioWaveform  className="w-5 h-5"/>
            <span className="font-bold tracking-wider">built by <u><a href="https://github.com/jvalaj">@jvalaj</a></u></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter relative z-10">
              Is This Person <br />
              <span className="text-blue-400 mb-3 ">Real?</span>
            </h1>
                  <br />
            <p className="mt-4 text-xl text-gray-300 relative z-10">
              Ever wondered if that person you see online is real..
            </p>
            <p className="text-gray-400 mt-2 text-xs mx-auto relative z-10">
              [We search the web for traces of their existence and tell you what we found.]
              <br />
            
            </p>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row lg:space-x-8 mb-24">
          {/* Search Section */}
          <section id="search" className="w-full lg:w-1/2">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold tracking-wider">
                  Search by Name
                </h2>
              </div>
              <p className="text-gray-400 mb-6">
                Enter a name to search for public records and social media
                presence.
              </p>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Enter a full name..."
                    className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => searchPerson(searchName)}
                    disabled={isSearching}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md disabled:bg-gray-600 flex items-center flex-shrink-0"
                  >
                    {isSearching ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <Search className="mr-2" />
                    )}
                    Search
                  </button>
                </div>
                <div>
                  <input
                    type="text"
                    value={searchContext}
                    onChange={(e) => setSearchContext(e.target.value)}
                    placeholder="Why are you looking for this person? (optional context)"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {searchError && (
                <p className="text-red-400 mt-4">{searchError}</p>
              )}

              {/* Fixed height container for search results */}
              <div className="mt-6 min-h-[400px] max-h-[400px] overflow-y-auto">
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
          <section id="image-analysis" className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Image className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold tracking-wider">
                  Analyze by Image
                </h2>
              </div>
              <p className="text-gray-400 mb-6">
                Upload an image to detect if it was generated by AI.
              </p>

              <div
                className={`relative border-2 border-dashed border-gray-600 rounded-lg p-10 text-center cursor-pointer hover:border-purple-400 transition-colors ${
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
                <div className="mt-8 text-center">
                  <Loader2 className="animate-spin inline-block w-8 h-8" />
                  <p>Analyzing image...</p>
                </div>
              )}

              {uploadError && (
                <p className="text-red-400 mt-4">{uploadError}</p>
              )}

              {imagePreview && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Analysis Result</h3>
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
                          {uploadResult.map(
                            (
                              item: { label: string; score: number },
                              index: number
                            ) => (
                              <div key={index}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-base font-medium text-gray-300">
                                    {item.label}
                                  </span>
                                  <span className="text-sm font-medium text-gray-400">
                                    {(item.score * 100).toFixed(2)}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className={`h-2.5 rounded-full ${
                                      item.label === "real"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${item.score * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )
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
          </section>
        </div>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="mb-24">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="border border-gray-700 p-6 hover:border-white transition-colors"
                >
                  <div className="flex items-center mb-3">
                    <Code className="w-5 h-5 mr-3" />
                    <h3 className="font-bold">{tech.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{tech.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Results */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Platforms Analysed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="border border-gray-700 p-6 hover:border-white transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">{platform.name}</h3>
                  <Globe className="w-5 h-5" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Verified:</span>
                    <span>{platform.verified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Flagged:</span>
                    <span>{platform.flagged}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-800">
                    <span className="text-gray-400">Accuracy:</span>
                    <span className="font-bold">{platform.accuracy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-gray-700 p-6">
              <div className="text-2xl font-bold mb-1">
                27
              </div>
              <div className="text-gray-400 text-sm">Profiles Processed</div>
            </div>
            <div className="border border-gray-700 p-6">
              <div className="text-2xl font-bold mb-1">76.7%</div>
              <div className="text-gray-400 text-sm">Overall Accuracy</div>
            </div>
            <div className="border border-gray-700 p-6">
              <div className="text-2xl font-bold mb-1">4</div>
              <div className="text-gray-400 text-sm">Platforms Supported</div>
            </div>
            <div className="border border-gray-700 p-6">
              <div className="text-2xl font-bold mb-1">{'<'}10s</div>
              <div className="text-gray-400 text-sm">
                Average Processing Time
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-700 p-8 hover:border-white transition-colors">
              <Search className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-4">Image Analysis</h3>
              <p className="text-gray-300 mb-4">
                Uses DeepFace to analyze profile pictures for signs of
                manipulation or AI generation.
              </p>
              <div className="text-sm text-gray-400">
                <div>• Face detection algorithms</div>
                <div>• Image metadata analysis</div>
              </div>
            </div>

            <div className="border border-gray-700 p-8 hover:border-white transition-colors">
              <Database className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-4">Data Collection</h3>
              <p className="text-gray-300 mb-4">
                Scrapes publicly available information from social media
                platforms to build a comprehensive profile. Looks for
                inconsistencies in posting patterns and connections.
              </p>
              <div className="text-sm text-gray-400">
                <div>• Multi-platform data gathering</div>
                <div>• Activity pattern analysis</div>
              </div>
            </div>

            <div className="border border-gray-700 p-8 hover:border-white transition-colors">
              <Cpu className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-4">Credibility Scoring</h3>
              <p className="text-gray-300 mb-4">
                Combines all collected data points using OpenAI and machine
                learning models to generate a credibility score. Trained on
                manually verified fake and real profiles.
              </p>
              <div className="text-sm text-gray-400">
                <div>• ML-based scoring algorithm</div>
                <div>• Behavioral pattern recognition</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Terminal className="w-5 h-5" />
            <span className="font-bold tracking-wider">ISTHISPERSONREAL</span>
          </div>
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <AudioWaveform  className="w-5 h-5"/>
            <span className="font-bold tracking-wider">built by <u><a href="https://github.com/jvalaj">@jvalaj</a></u></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
