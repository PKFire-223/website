import { VocabWord } from '../types';
import englishData from './englishVocab.json';
import chineseData from './chineseVocab.json';

export const ENGLISH_VOCABULARY: VocabWord[] = englishData as VocabWord[];
export const CHINESE_VOCABULARY: VocabWord[] = chineseData as VocabWord[];

export const VOCABULARY_DATABASE: VocabWord[] = [
  ...ENGLISH_VOCABULARY,
  ...CHINESE_VOCABULARY,
];
