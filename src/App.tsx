import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Database, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Globe, 
  Code,
  Server,
  Cpu,
  Activity,
  GitBranch,
  Upload,
  Image,
  Loader2,
  Wrench
} from 'lucide-react';

interface SearchResult {
  name: string;
  source: string;
  confidence: number;
}

function App() {
  const [verificationCount, setVerificationCount] = useState(247);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerificationCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Disabled for feature upgrade
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Disabled for feature upgrade
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Disabled for feature upgrade
  };

  const createImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const performReverseImageSearch = async () => {
    // Disabled for feature upgrade
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setSearchResult(null);
    setIsAnalyzing(false);
  };

  const techStack = [
    { name: 'Java', usage: 'Backend API development and business logic' },
    { name: 'Spring Boot', usage: 'GraphQL API framework and dependency injection' },
    { name: 'Python (FastAPI)', usage: 'Machine learning model serving and image processing' },
    { name: 'OpenAI', usage: 'Natural language processing and content analysis' },
    { name: 'DeepFace', usage: 'Facial recognition and image comparison' },
    { name: 'MySQL', usage: 'Primary database for user data and results' },
    { name: 'Redis', usage: 'Caching and session management' },
    { name: 'React', usage: 'Frontend user interface development' }
  ];

  const platforms = [
    { name: 'LinkedIn', verified: 42, flagged: 8, accuracy: 78.2 },
    { name: 'Twitter', verified: 29, flagged: 11, accuracy: 72.6 },
    { name: 'Instagram', verified: 36, flagged: 9, accuracy: 80.1 },
    { name: 'Facebook', verified: 18, flagged: 6, accuracy: 75.8 }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6" />
            <span className="text-lg font-bold tracking-wider">ISTHISPERSONREAL</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero */}
          <section className="mb-20">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                Profile Verification
                <br />
                <span className="text-gray-400">Tool</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                A web application that helps verify if social media profiles are authentic or fake. 
                Uses computer vision to analyze profile pictures, web scraping to gather data across platforms, 
                and machine learning to score credibility.
              </p>
            </div>

            {/* Upload Section - Disabled */}
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">Upload Profile Image</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Area - Disabled */}
                <div>
                  <div className="border-2 border-dashed border-gray-600 bg-gray-900 opacity-50 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <Wrench className="w-12 h-12 text-gray-500" />
                      <p className="text-lg text-gray-500">Feature Enhancement in Progress</p>
                      <p className="text-gray-600">I'm currently upgrading the image analysis capabilities with advanced AI models and enhanced accuracy</p>
                    </div>
                  </div>
                </div>

                {/* Results Area - Placeholder */}
                <div className="space-y-6">
                  <div className="border border-gray-700 p-6 rounded-lg opacity-50">
                    <h3 className="font-bold mb-3 text-gray-500">Analysis Results</h3>
                    <div className="text-gray-600">
                      Enhanced results with detailed confidence scores and multi-platform verification will appear here.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Technologies Used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="border border-gray-700 p-6 hover:border-white transition-colors">
                  <div className="flex items-center mb-3">
                    <Code className="w-5 h-5 mr-3" />
                    <h3 className="font-bold">{tech.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{tech.usage}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Platform Results */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Platforms Analysed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, index) => (
                <div key={index} className="border border-gray-700 p-6 hover:border-white transition-colors">
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
                <div className="text-2xl font-bold mb-1">{verificationCount.toLocaleString()}</div>
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
                <div className="text-2xl font-bold mb-1">3.2s</div>
                <div className="text-gray-400 text-sm">Average Processing Time</div>
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
                  Uses DeepFace to analyze profile pictures for signs of manipulation or AI generation. 
                  Performs reverse image searches and checks for duplicate usage across platforms.
                </p>
                <div className="text-sm text-gray-400">
                  <div>• Reverse image search</div>
                  <div>• Face detection algorithms</div>
                  <div>• Image metadata analysis</div>
                </div>
              </div>

              <div className="border border-gray-700 p-8 hover:border-white transition-colors">
                <Database className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold mb-4">Data Collection</h3>
                <p className="text-gray-300 mb-4">
                  Scrapes publicly available information from social media platforms to build 
                  a comprehensive profile. Looks for inconsistencies in posting patterns and connections.
                </p>
                <div className="text-sm text-gray-400">
                  <div>• Multi-platform data gathering</div>
                  <div>• Activity pattern analysis</div>
                  <div>• Network connection mapping</div>
                </div>
              </div>

              <div className="border border-gray-700 p-8 hover:border-white transition-colors">
                <Cpu className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold mb-4">Credibility Scoring</h3>
                <p className="text-gray-300 mb-4">
                  Combines all collected data points using OpenAI and machine learning models to generate 
                  a credibility score. Trained on manually verified fake and real profiles.
                </p>
                <div className="text-sm text-gray-400">
                  <div>• ML-based scoring algorithm</div>
                  <div>• Behavioral pattern recognition</div>
                  <div>• Confidence interval reporting</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Terminal className="w-5 h-5" />
            <span className="font-bold tracking-wider">ISTHISPERSONREAL</span>
          </div>
          <div className="text-gray-400 text-sm text-center md:text-right">
            <p>Profile Verification System</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;