import React from 'react';
import { BookOpen, Zap } from 'lucide-react';
import { AnalysisResult } from '../types';
import { analyzeArticle } from '../utils/mlSimulation';

interface SampleArticlesProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const sampleArticles = [
  {
    title: "Local Mayor Announces New Infrastructure Plan",
    content: "Mayor Johnson announced today a comprehensive $50 million infrastructure improvement plan that will focus on road repairs, bridge maintenance, and expanded public transportation options. The plan, developed over six months with input from city engineers and community leaders, aims to address the most pressing infrastructure needs identified in last year's comprehensive assessment. Construction is expected to begin in early spring and create approximately 200 local jobs. The mayor emphasized that the project will be funded through a combination of federal grants, state funding, and municipal bonds, ensuring no immediate tax increases for residents.",
    type: "real" as const
  },
  {
    title: "Scientists Discover Cure for All Diseases Using Simple Kitchen Ingredient",
    content: "Breaking news that will shock the medical establishment: researchers at an undisclosed location have discovered that a common kitchen ingredient can cure every known disease. This miraculous substance, which cannot be named due to pharmaceutical industry pressure, has shown 100% success rates in secret trials. Government officials are allegedly trying to suppress this information to protect big pharma profits. The anonymous lead researcher claims that major medical journals refuse to publish the groundbreaking findings. Health experts you've never heard of confirm this revolutionary discovery will change everything, but mainstream media won't report it.",
    type: "fake" as const
  },
  {
    title: "University Research Shows Promise in Renewable Energy Storage",
    content: "Researchers at the State University's Engineering Department have published findings in the Journal of Energy Storage showing significant improvements in battery technology for renewable energy applications. The study, conducted over 18 months with funding from the Department of Energy, demonstrates a 35% increase in storage efficiency using a novel lithium-polymer configuration. Dr. Sarah Chen, the lead researcher, notes that while promising, the technology requires further testing and development before commercial viability. The research team plans to continue trials and expects to publish additional findings next year. Industry experts suggest this could contribute to more reliable renewable energy systems.",
    type: "real" as const
  }
];

const SampleArticles: React.FC<SampleArticlesProps> = ({ onAnalysisComplete }) => {
  const handleAnalyzeSample = async (article: typeof sampleArticles[0]) => {
    const result = analyzeArticle(article.content, article.title);
    onAnalysisComplete(result);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-slate-900">Sample Articles</h3>
      </div>
      
      <p className="text-sm text-slate-600 mb-6">
        Try these examples to see how the detector works with different content types.
      </p>

      <div className="space-y-4">
        {sampleArticles.map((article, index) => (
          <div key={index} className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors">
            <h4 className="font-medium text-slate-900 mb-2 line-clamp-2">
              {article.title}
            </h4>
            <p className="text-sm text-slate-600 mb-3 line-clamp-3">
              {article.content}
            </p>
            <div className="flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${
                article.type === 'real' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                Example: {article.type}
              </span>
              <button
                onClick={() => handleAnalyzeSample(article)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                <Zap className="h-4 w-4" />
                <span>Analyze</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleArticles;
