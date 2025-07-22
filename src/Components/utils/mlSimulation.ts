import { AnalysisResult } from '../types';

// Simulated ML analysis functions (replacing sklearn/nltk functionality)
export const analyzeArticle = (content: string, title: string = ''): AnalysisResult => {
  const id = Math.random().toString(36).substr(2, 9);
  const timestamp = new Date();

  // Simulate feature extraction
  const features = extractFeatures(content, title);
  
  // Simulate classification
  const prediction = classifyArticle(features);
  const confidence = calculateConfidence(features, prediction);
  
  // Extract keywords
  const keywords = extractKeywords(content);

  return {
    id,
    article: content,
    title,
    prediction,
    confidence,
    features,
    keywords,
    timestamp
  };
};

const extractFeatures = (content: string, title: string) => {
  // Simulate sentiment analysis
  const sentiment = calculateSentiment(content + ' ' + title);
  
  // Simulate text complexity
  const complexity = calculateComplexity(content);
  
  // Simulate credibility indicators
  const credibility = calculateCredibility(content, title);
  
  // Simulate bias detection
  const bias = calculateBias(content, title);

  return {
    sentiment,
    complexity,
    credibility,
    bias
  };
};

const calculateSentiment = (text: string): number => {
  // Simulate sentiment analysis (-1 to 1 scale)
  const positiveWords = ['good', 'great', 'excellent', 'positive', 'success', 'improvement', 'benefit', 'effective'];
  const negativeWords = ['bad', 'terrible', 'awful', 'negative', 'failure', 'decline', 'harm', 'dangerous'];
  const extremeWords = ['amazing', 'incredible', 'shocking', 'unbelievable', 'miraculous', 'devastating', 'catastrophic'];
  
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  let extremeCount = 0;

  words.forEach(word => {
    if (positiveWords.some(pos => word.includes(pos))) score += 0.1;
    if (negativeWords.some(neg => word.includes(neg))) score -= 0.1;
    if (extremeWords.some(ext => word.includes(ext))) extremeCount += 1;
  });

  // Extreme language often indicates fake news
  score -= extremeCount * 0.05;
  
  return Math.max(-1, Math.min(1, score));
};

const calculateComplexity = (text: string): number => {
  // Simulate readability/complexity score
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const avgWordsPerSentence = words / Math.max(sentences, 1);
  
  // Longer words indicate higher complexity
  const avgWordLength = text.replace(/\s+/g, '').length / words;
  
  // Normalize to 0-1 scale
  const complexityScore = Math.min(1, (avgWordsPerSentence * 0.02 + avgWordLength * 0.1));
  
  return complexityScore;
};

const calculateCredibility = (content: string, title: string): number => {
  const text = (content + ' ' + title).toLowerCase();
  
  // Positive credibility indicators
  const credibleIndicators = [
    'according to', 'research shows', 'study found', 'experts say', 'data indicates',
    'published in', 'professor', 'university', 'journal', 'official statement'
  ];
  
  // Negative credibility indicators
  const nonCredibleIndicators = [
    'secret', 'they dont want you to know', 'shocking truth', 'doctors hate',
    'miracle cure', 'one weird trick', 'government coverup', 'mainstream media wont tell'
  ];
  
  let score = 0.5; // Start neutral
  
  credibleIndicators.forEach(indicator => {
    if (text.includes(indicator)) score += 0.1;
  });
  
  nonCredibleIndicators.forEach(indicator => {
    if (text.includes(indicator)) score -= 0.2;
  });
  
  // Check for proper attribution and sources
  if (text.includes('source:') || text.includes('according to')) score += 0.1;
  if (text.includes('anonymous') && text.includes('source')) score -= 0.1;
  
  return Math.max(0, Math.min(1, score));
};

const calculateBias = (content: string, title: string): number => {
  const text = (content + ' ' + title).toLowerCase();
  
  // Bias indicators (higher score = more biased)
  const biasIndicators = [
    'always', 'never', 'everyone knows', 'obviously', 'clearly',
    'without a doubt', 'absolutely', 'completely', 'totally'
  ];
  
  const emotionalWords = [
    'outrage', 'scandal', 'bombshell', 'explosive', 'shocking',
    'unbelievable', 'incredible', 'amazing', 'terrible', 'awful'
  ];
  
  let biasScore = 0;
  
  biasIndicators.forEach(indicator => {
    if (text.includes(indicator)) biasScore += 0.1;
  });
  
  emotionalWords.forEach(word => {
    if (text.includes(word)) biasScore += 0.05;
  });
  
  // Check for balanced reporting
  if (text.includes('however') || text.includes('although') || text.includes('critics say')) {
    biasScore -= 0.1;
  }
  
  return Math.max(0, Math.min(1, biasScore));
};

const classifyArticle = (features: any): 'fake' | 'real' => {
  // Simulate classification logic
  const { sentiment, complexity, credibility, bias } = features;
  
  // Calculate weighted score
  let score = 0;
  
  // High bias indicates fake news
  score += bias * -0.3;
  
  // Low credibility indicates fake news
  score += (credibility - 0.5) * 0.4;
  
  // Extreme sentiment (positive or negative) can indicate fake news
  score += Math.abs(sentiment) * -0.2;
  
  // Very low or very high complexity can indicate fake news
  const complexityDeviation = Math.abs(complexity - 0.5);
  score += complexityDeviation * -0.1;
  
  // Add some randomness to simulate real ML uncertainty
  score += (Math.random() - 0.5) * 0.1;
  
  return score > 0 ? 'real' : 'fake';
};

const calculateConfidence = (features: any, prediction: 'fake' | 'real'): number => {
  const { sentiment, complexity, credibility, bias } = features;
  
  let confidence = 0.5; // Base confidence
  
  // Higher credibility increases confidence for 'real' prediction
  if (prediction === 'real') {
    confidence += credibility * 0.3;
    confidence += (0.5 - bias) * 0.2;
  } else {
    confidence += (1 - credibility) * 0.3;
    confidence += bias * 0.2;
  }
  
  // Extreme features increase confidence
  confidence += Math.abs(sentiment) * 0.1;
  
  // Add randomness
  confidence += (Math.random() - 0.5) * 0.1;
  
  // Ensure confidence is between 50-95%
  return Math.max(50, Math.min(95, confidence * 100));
};

const extractKeywords = (content: string): string[] => {
  // Simulate keyword extraction (TF-IDF simulation)
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);
  
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  // Count word frequencies
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Get top keywords
  const sortedWords = Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([word]) => word);
  
  return sortedWords;
};
