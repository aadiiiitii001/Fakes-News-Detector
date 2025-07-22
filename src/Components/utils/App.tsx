import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, BarChart3, BookOpen, Zap } from 'lucide-react';
import NewsAnalyzer from './components/NewsAnalyzer';
import FeatureExplanation from './components/FeatureExplanation';
import SampleArticles from './components/SampleArticles';
import AnalysisHistory from './components/AnalysisHistory';
import { AnalysisResult } from './types';

function App() {
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Fake News Detector</h1>
                <p className="text-sm text-slate-600">NLP-powered classification system</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>Confidence Scoring</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>NLP Features</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Detect Misinformation with AI
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Advanced natural language processing and machine learning algorithms 
            analyze news articles to identify potential misinformation patterns.
          </p>
        </div>

        {/* Main Analyzer */}
        <NewsAnalyzer onAnalysisComplete={handleAnalysisComplete} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sample Articles */}
          <div className="lg:col-span-1">
            <SampleArticles onAnalysisComplete={handleAnalysisComplete} />
          </div>

          {/* Feature Explanation */}
          <div className="lg:col-span-2">
            <FeatureExplanation />
          </div>
        </div>

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <AnalysisHistory results={analysisHistory} />
        )}

        {/* Footer Info */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Accuracy Focus</h3>
              <p className="text-sm text-slate-600">
                Our models prioritize precision to minimize false positives
              </p>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Real-time Processing</h3>
              <p className="text-sm text-slate-600">
                Instant analysis with detailed confidence metrics
              </p>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Feature Transparency</h3>
              <p className="text-sm text-slate-600">
                Understand what signals influence the classification
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
