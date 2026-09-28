import fs from 'fs';

// Helper to create an item
const createWord = (id, language, level, unit, word, phonetic, partOfSpeech, vietnameseMeaning, example, exampleMeaning, extra = {}) => ({
  id,
  language,
  level,
  unit,
  word,
  phonetic,
  partOfSpeech,
  vietnameseMeaning,
  example,
  exampleMeaning,
  ...extra,
});

console.log('Building dictionary entries...');
