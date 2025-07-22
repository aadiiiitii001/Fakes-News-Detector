import React from 'react';
import { History, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisHistoryProps {
  results: AnalysisResult[];
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ results }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
      <div className="flex items-center space-x-2 mb-6">
        <History className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-slate-900">Analysis History</h3>
        <span className="text-sm text-slate-500">({results.length})</span>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {result.prediction === 'real' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  result.prediction === 'real' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.prediction === 'real' ? 'Authentic' : 'Fake'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-sm text-slate-600">
                  {Math.round(result.confidence)}% confidence
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                <span>{formatTime(result.timestamp)}</span>
              </div>
            </div>

            {result.title && (
              <h4 className="font-medium text-slate-900 mb-2">
                {truncateText(result.title, 80)}
              </h4>
            )}

            <p className="text-sm text-slate-600 mb-3">
              {truncateText(result.article, 150)}
            </p>

            <div className="flex flex-wrap gap-1">
              {result.keywords.slice(0, 4).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  {keyword}
                </span>
              ))}
              {result.keywords.length > 4 && (
                <span className="text-xs text-slate-500 px-2 py-1">
                  +{result.keywords.length - 4} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;
