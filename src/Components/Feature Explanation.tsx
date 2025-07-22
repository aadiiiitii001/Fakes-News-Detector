import React from 'react';
import { Brain, Target, TrendingUp, AlertCircle } from 'lucide-react';

const FeatureExplanation: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Natural Language Processing",
      description: "Analyzes text structure, grammar patterns, and linguistic complexity to identify potential red flags commonly found in misinformation.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Target,
      title: "Sentiment Analysis",
      description: "Measures emotional tone and bias indicators. Fake news often uses extreme language or manipulative emotional appeals.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "TF-IDF Vectorization",
      description: "Term frequency analysis identifies unusual word patterns and phrases that deviate from standard journalistic language.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: AlertCircle,
      title: "Credibility Scoring",
      description: "Evaluates source attribution, fact-checking elements, and balanced reporting indicators present in authentic news.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">How It Works</h3>
      
      <div className="grid gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex space-x-4">
            <div className={`p-3 rounded-xl ${feature.color} flex-shrink-0`}>
              <feature.icon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-yellow-800 mb-1">Important Disclaimer</h5>
            <p className="text-sm text-yellow-700">
              This tool provides analysis based on textual patterns and should not be considered definitive. 
              Always verify news through multiple credible sources and fact-checking organizations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureExplanation;
