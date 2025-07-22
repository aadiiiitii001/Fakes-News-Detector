import React from 'react';

interface ConfidenceMeterProps {
  confidence: number;
  prediction: 'fake' | 'real';
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ confidence, prediction }) => {
  const getColor = () => {
    if (prediction === 'real') {
      if (confidence >= 80) return 'bg-green-500';
      if (confidence >= 60) return 'bg-yellow-500';
      return 'bg-orange-500';
    } else {
      if (confidence >= 80) return 'bg-red-500';
      if (confidence >= 60) return 'bg-orange-500';
      return 'bg-yellow-500';
    }
  };

  const getLabel = () => {
    if (confidence >= 80) return 'High Confidence';
    if (confidence >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span>Confidence Level</span>
        <span className="font-semibold">{getLabel()}</span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ease-out ${getColor()}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="text-xs text-slate-600 space-y-1">
        <p>
          <strong>Note:</strong> This analysis is based on textual patterns and linguistic features.
        </p>
        <p>
          Always verify information through multiple credible sources.
        </p>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
