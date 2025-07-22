export interface AnalysisResult {
  id: string;
  article: string;
  prediction: 'fake' | 'real';
  confidence: number;
  features: {
    sentiment: number;
    complexity: number;
    credibility: number;
    bias: number;
  };
  keywords: string[];
  timestamp: Date;
  title?: string;
}
