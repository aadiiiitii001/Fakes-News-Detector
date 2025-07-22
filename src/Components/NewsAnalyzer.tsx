import React, { useState } from 'react';
import { Search, Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { AnalysisResult } from '../types';
import { analyzeArticle } from '../utils/mlSimulation';
import ConfidenceMeter from './ConfidenceMeter';

interface NewsAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const NewsAnalyzer: React.FC<NewsAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [article, setArticle] = useState('');
  const [title, setTitle] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!article.trim()) return;

    setAnalyzing(true);
    setResult(null);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const analysisResult = analyzeArticle(article, title);
    setResult(analysisResult);
    onAnalysisComplete(analysisResult);
    setAnalyzing(false);
  };

  const handleReset = () => {
    setArticle('');
    setTitle('');
    setResult(null);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Article Analysis</h3>
          <p className="text-slate-600">
            Paste your news article below for AI-powered authenticity analysis
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Article Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the article headline..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={analyzing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Article Content *
            </label>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="Paste the full article content here. The more text you provide, the more accurate the analysis will be..."
              rows={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              disabled={analyzing}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-slate-500">
                Characters: {article.length}
              </span>
              <span className="text-sm text-slate-500">
                Recommended: 200+ characters
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAnalyze}
            disabled={!article.trim() || analyzing}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Analyze Article</span>
              </>
            )}
          </button>
          
          {(article || result) && (
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
            >
              Reset
            </button>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            {/* Main Result */}
            <div className={`p-6 rounded-2xl border-2 ${
              result.prediction === 'real' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                {result.prediction === 'real' ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
                <div>
                  <h4 className="text-xl font-bold">
                    {result.prediction === 'real' ? 'Likely Authentic' : 'Potentially Fake'}
                  </h4>
                  <p className="text-sm text-slate-600">
                    Confidence: {Math.round(result.confidence)}%
                  </p>
                </div>
              </div>
              
              <ConfidenceMeter 
                confidence={result.confidence} 
                prediction={result.prediction}
              />
            </div>

            {/* Feature Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-semibold text-slate-900">Analysis Features</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span>Sentiment Score</span>
                    <span className="font-medium">{result.features.sentiment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span>Text Complexity</span>
                    <span className="font-medium">{result.features.complexity.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span>Credibility Score</span>
                    <span className="font-medium">{result.features.credibility.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span>Bias Detection</span>
                    <span className="font-medium">{result.features.bias.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-slate-900">Key Terms</h5>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsAnalyzer;
