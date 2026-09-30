export type Language = 'en' | 'zh';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export type ChineseLevel = 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6';

export type LevelType = EnglishLevel | ChineseLevel;

export interface VocabWord {
  id: string;
  language: Language;
  level: LevelType;
  unit: string;
  word: string;
  phonetic: string; // IPA for English, Pinyin with tones for Chinese
  partOfSpeech: string;
  sinoVietnamese?: string; // Hán-Việt cho tiếng Trung
  vietnameseMeaning: string;
  definitions?: string[];
  example: string;
  examplePhonetic?: string; // Pinyin cho câu ví dụ tiếng Trung
  exampleMeaning: string;
  collocations?: string[];
  mnemonicTip?: string; // Mẹo chuyên gia ghi nhớ
}

export type LearningStatus = 'new' | 'learning' | 'review' | 'mastered';

export interface UserWordProgress {
  wordId: string;
  status: LearningStatus;
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  nextReviewDate: number; // timestamp
  correctCount: number;
  incorrectCount: number;
  lastReviewed: number; // timestamp
  isBookmarked: boolean;
  bestSpeechScore?: number;
}

export interface PeriodicTestRecord {
  id: string;
  date: number; // timestamp
  language: Language;
  level: LevelType;
  score: number;
  total: number;
  percentage: number;
  timeSpentSeconds: number;
  passed: boolean;
  wrongWordIds: string[];
}

export interface UserProfileProgress {
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoal: number; // e.g. 10 words
  todayLearnedCount: number;
  wordsProgress: Record<string, UserWordProgress>;
  testHistory: PeriodicTestRecord[];
  randomDrawnToday?: string[]; // IDs of words drawn today in random mode
  randomDrawnDate?: string; // YYYY-MM-DD
}

export type ClozeCategory = 'all' | 'tense' | 'meaning' | 'word-form' | 'preposition' | 'conjunction';

export interface ClozeQuestion {
  id: string;
  passage: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  translation: string;
  category: string;
  level: LevelType;
  language: Language;
}

