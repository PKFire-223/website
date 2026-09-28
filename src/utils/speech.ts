// Text-to-Speech and Speech Recognition Utility

export const speak = (
  text: string,
  lang: 'en' | 'zh',
  rate: number = 1.0,
  onEnd?: () => void
): boolean => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const targetLang = lang === 'en' ? 'en-US' : 'zh-CN';
  utterance.lang = targetLang;

  // Try to pick the best matching voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(
    (v) => v.lang.startsWith(targetLang) || (lang === 'zh' && v.lang.includes('zh'))
  );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

// Check if speech recognition is available in browser
export const isSpeechRecognitionSupported = (): boolean => {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

// Calculate normalized similarity score between spoken and target string (0 - 100)
export const calculatePronunciationScore = (spoken: string, target: string): number => {
  const cleanSpoken = spoken.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"'，。！？]/g, '').trim();
  const cleanTarget = target.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"'，。！？]/g, '').trim();

  if (!cleanSpoken || !cleanTarget) return 0;
  if (cleanSpoken === cleanTarget) return 100;

  // Word token containment
  const targetWords = cleanTarget.split(/\s+/);
  const spokenWords = cleanSpoken.split(/\s+/);

  let matches = 0;
  for (const tw of targetWords) {
    if (spokenWords.includes(tw)) {
      matches++;
    }
  }

  const tokenScore = (matches / targetWords.length) * 100;

  // Levenshtein distance for fuzzy character matching
  const matrix: number[][] = [];
  const len1 = cleanSpoken.length;
  const len2 = cleanTarget.length;

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = cleanSpoken[i - 1] === cleanTarget[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  const levScore = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));

  // Weighted score
  const finalScore = Math.round(levScore * 0.7 + tokenScore * 0.3);
  return Math.min(100, Math.max(0, finalScore));
};
