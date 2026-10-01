// International Standard Text-to-Speech (TTS) & Speech Recognition (STT) Engine

export type EnglishAccent = 'uk' | 'us';

const ACCENT_STORAGE_KEY = 'linguavocab_en_accent';

// Retrieve saved accent preference (default: US)
export const getPreferredAccent = (): EnglishAccent => {
  try {
    const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
    return saved === 'uk' ? 'uk' : 'us';
  } catch (e) {
    return 'us';
  }
};

// Set and save accent preference
export const setPreferredAccent = (accent: EnglishAccent): void => {
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  } catch (e) {
    // ignore local storage errors
  }
};

// Clean and sanitize text for crystal-clear natural speech output
export const cleanTextForSpeech = (text: string): string => {
  if (!text) return '';
  return text
    // Remove cloze blank indicators [ _____ ]
    .replace(/\[\s*_{2,}\s*\]/g, 'blank')
    .replace(/\[\s*\?\s*\]/g, '')
    // Remove phonetic slashes like /.../
    .replace(/\/[^/]+\//g, '')
    // Remove markdown formatting like * or ** or _
    .replace(/[*_#`~]/g, '')
    // Remove brackets with case indicators
    .replace(/\[Case #[0-9]+\]/gi, '')
    .replace(/\[场景 #[0-9]+\]/gi, '')
    .replace(/\(Test Item #[0-9]+\)/gi, '')
    // Normalize extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

// Voice pre-cache and listener
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

// Find the highest quality native neural voice available
const findBestVoice = (
  lang: 'en' | 'zh',
  accent: EnglishAccent = 'us'
): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  if (lang === 'en') {
    const targetTag = accent === 'uk' ? 'en-GB' : 'en-US';

    // Prioritized list of high quality voices
    const ukVoiceNames = ['google uk english female', 'google uk english male', 'libby', 'ryan', 'daniel', 'serena', 'oliver', 'george', 'sonia', 'en-gb'];
    const usVoiceNames = ['google us english', 'jenny', 'guy', 'aria', 'samantha', 'alex', 'ava', 'davis', 'en-us'];

    const preferredNames = accent === 'uk' ? ukVoiceNames : usVoiceNames;

    // 1. Try preferred neural/high quality voice names
    for (const name of preferredNames) {
      const match = voices.find(
        (v) => v.name.toLowerCase().includes(name) || (v.lang.toLowerCase() === targetTag.toLowerCase() && v.name.toLowerCase().includes(name))
      );
      if (match) return match;
    }

    // 2. Try exact locale match
    const exactMatch = voices.find((v) => v.lang.toLowerCase() === targetTag.toLowerCase());
    if (exactMatch) return exactMatch;

    // 3. Fallback to any English voice
    return voices.find((v) => v.lang.toLowerCase().startsWith('en')) || null;
  }

  if (lang === 'zh') {
    const preferredChineseNames = ['google 普通话', 'xiaoxiao', 'yunxi', 'yunjian', 'xiaoyi', 'tingting', 'sinji', 'cmn', 'zh-cn'];
    for (const name of preferredChineseNames) {
      const match = voices.find(
        (v) => v.name.toLowerCase().includes(name) || (v.lang.toLowerCase().includes('zh') && v.name.toLowerCase().includes(name))
      );
      if (match) return match;
    }

    // Locale match
    const zhMatch = voices.find((v) => v.lang.toLowerCase().startsWith('zh') || v.lang.toLowerCase().startsWith('cmn'));
    if (zhMatch) return zhMatch;
  }

  return null;
};

// Main Speech Synthesis trigger
export const speak = (
  text: string,
  lang: 'en' | 'zh',
  rate: number = 1.0,
  onEnd?: () => void,
  customAccent?: EnglishAccent
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  const cleanText = cleanTextForSpeech(text);
  if (!cleanText) return false;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const accent = customAccent || getPreferredAccent();
  const targetLocale = lang === 'en' ? (accent === 'uk' ? 'en-GB' : 'en-US') : 'zh-CN';
  utterance.lang = targetLocale;

  // Pick best international standard voice
  const bestVoice = findBestVoice(lang, accent);
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  // Chrome 15-second speech synthesis pause bug fix
  let resumeInterval: NodeJS.Timeout | null = null;
  const clearResume = () => {
    if (resumeInterval) {
      clearInterval(resumeInterval);
      resumeInterval = null;
    }
  };

  utterance.onstart = () => {
    resumeInterval = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearResume();
      }
    }, 10000);
  };

  utterance.onend = () => {
    clearResume();
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    clearResume();
    console.debug('SpeechSynthesis error:', e);
    if (onEnd) onEnd();
  };

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
