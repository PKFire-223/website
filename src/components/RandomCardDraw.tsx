import React, { useState, useEffect, useMemo } from 'react';
import {
  Shuffle,
  Volume2,
  Mic,
  Bookmark,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  BookOpen,
  Layers,
  History,
  Info,
  Calendar,
  ChevronRight,
  Flame,
  Award,
  HelpCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { VocabWord, Language, LevelType, UserProfileProgress } from '../types';
import { speak } from '../utils/speech';
import { updateWordSrs } from '../utils/srs';

interface RandomCardDrawProps {
  words: VocabWord[];
  currentLang: Language;
  profile: UserProfileProgress;
  onUpdateProfile: (updated: UserProfileProgress) => void;
  onOpenPronounce: (word: VocabWord) => void;
  isDarkMode?: boolean;
}

export const RandomCardDraw: React.FC<RandomCardDrawProps> = ({
  words,
  currentLang,
  profile,
  onUpdateProfile,
  onOpenPronounce,
  isDarkMode = false,
}) => {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Filter level: 'all' or specific level
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [drawMode, setDrawMode] = useState<'single' | 'pack5'>('single');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Initialize or reset daily drawn IDs if date changed
  const todayDrawnIds = useMemo(() => {
    if (profile.randomDrawnDate === todayStr && profile.randomDrawnToday) {
      return profile.randomDrawnToday;
    }
    return [];
  }, [profile.randomDrawnDate, profile.randomDrawnToday, todayStr]);

  // Current single drawn card
  const [currentWord, setCurrentWord] = useState<VocabWord | null>(null);

  // 5-card mystery pack state
  const [packCards, setPackCards] = useState<VocabWord[]>([]);
  const [packFlippedState, setPackFlippedState] = useState<Record<string, boolean>>({});

  // Available candidate words based on level and anti-repetition rules
  const candidateWords = useMemo(() => {
    return words.filter((w) => {
      if (selectedLevel !== 'all' && w.level !== selectedLevel) return false;
      // Anti-repetition: exclude cards already drawn today
      if (todayDrawnIds.includes(w.id)) return false;
      return true;
    });
  }, [words, selectedLevel, todayDrawnIds]);

  // Level options
  const englishLevels: LevelType[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const chineseLevels: LevelType[] = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'];
  const availableLevels = currentLang === 'en' ? englishLevels : chineseLevels;

  // Record drawn word to profile
  const recordDrawnWords = (drawnWords: VocabWord[]) => {
    const newIds = drawnWords.map((w) => w.id);
    const updatedIds = Array.from(new Set([...todayDrawnIds, ...newIds]));
    onUpdateProfile({
      ...profile,
      randomDrawnDate: todayStr,
      randomDrawnToday: updatedIds,
    });
  };

  // Draw 1 random card
  const drawSingleCard = () => {
    setIsShuffling(true);
    setIsFlipped(false);

    setTimeout(() => {
      let pool = candidateWords;
      // If pool is empty, all words in this level have been drawn today -> allow re-draw from all
      if (pool.length === 0) {
        pool = selectedLevel === 'all' ? words : words.filter((w) => w.level === selectedLevel);
      }

      if (pool.length > 0) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selected = pool[randomIndex];
        setCurrentWord(selected);
        recordDrawnWords([selected]);
      }
      setIsShuffling(false);
    }, 280);
  };

  // Draw 5 cards pack
  const draw5Pack = () => {
    setIsShuffling(true);
    setPackFlippedState({});

    setTimeout(() => {
      let pool = [...candidateWords];
      if (pool.length < 5) {
        pool = selectedLevel === 'all' ? [...words] : words.filter((w) => w.level === selectedLevel);
      }

      // Shuffle pool
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, 5);
      setPackCards(chosen);
      recordDrawnWords(chosen);
      setIsShuffling(false);
    }, 320);
  };

  // Initial draw
  useEffect(() => {
    if (!currentWord && words.length > 0) {
      drawSingleCard();
    }
  }, [words]);

  // Handle Level change
  const handleLevelChange = (lvl: string) => {
    setSelectedLevel(lvl);
    setIsFlipped(false);
    // Draw card matching new level
    setTimeout(() => {
      const pool = lvl === 'all' ? words : words.filter((w) => w.level === lvl);
      if (pool.length > 0) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selected = pool[randomIndex];
        setCurrentWord(selected);
        recordDrawnWords([selected]);
      }
    }, 50);
  };

  // Reset daily draw history
  const handleResetDailyDraw = () => {
    onUpdateProfile({
      ...profile,
      randomDrawnDate: todayStr,
      randomDrawnToday: [],
    });
    setTimeout(() => {
      drawSingleCard();
    }, 100);
  };

  // Mark current word as Mastered / Learned
  const handleMarkMastered = (word: VocabWord) => {
    const cur = profile.wordsProgress[word.id];
    const updated = updateWordSrs(cur, word.id, 4);
    onUpdateProfile({
      ...profile,
      todayLearnedCount: profile.todayLearnedCount + 1,
      wordsProgress: {
        ...profile.wordsProgress,
        [word.id]: updated,
      },
    });
  };

  // Bookmark toggle
  const handleToggleBookmark = (word: VocabWord) => {
    const cur = profile.wordsProgress[word.id];
    const isBookmarked = cur ? !cur.isBookmarked : true;
    onUpdateProfile({
      ...profile,
      wordsProgress: {
        ...profile.wordsProgress,
        [word.id]: {
          ...(cur || {
            wordId: word.id,
            status: 'learning',
            repetitions: 0,
            easeFactor: 2.5,
            intervalDays: 1,
            nextReviewDate: Date.now() + 86400000,
            correctCount: 0,
            incorrectCount: 0,
            lastReviewed: Date.now(),
          }),
          isBookmarked,
        },
      },
    });
  };

  // Get words drawn today objects for history
  const drawnTodayWords = useMemo(() => {
    const idSet = new Set(todayDrawnIds);
    return words.filter((w) => idSet.has(w.id));
  }, [words, todayDrawnIds]);

  const isCurrentBookmarked = currentWord
    ? !!profile.wordsProgress[currentWord.id]?.isBookmarked
    : false;

  const isCurrentMastered = currentWord
    ? profile.wordsProgress[currentWord.id]?.status === 'mastered'
    : false;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎲</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Lật Thẻ Ngẫu Nhiên Mỗi Ngày
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
              Chống trùng lặp 100%
            </span>
          </div>
          <p
            className={`mt-1.5 text-xs sm:text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Mỗi ngày rút ngẫu nhiên các thẻ từ vựng từ kho hơn{' '}
            <strong className="text-indigo-600 font-bold">5.000+ từ vựng {currentLang === 'en' ? 'tiếng Anh' : 'tiếng Trung'}</strong>{' '}
            để học mới mà không lo bị trùng bài cũ!
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2.5">
          {/* Today Drawn Count */}
          <div
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-white border-slate-200 text-slate-800 shadow-xs'
            }`}
          >
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Hôm nay đã lật:</span>
            <span className="text-indigo-600 font-extrabold text-sm">{todayDrawnIds.length}</span>
            <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>thẻ</span>
          </div>

          {/* Remaining un-drawn cards in pool */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-semibold ${
              isDarkMode
                ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs'
            }`}
            title="Số từ vựng mới chưa rút trong kho dữ liệu"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Còn lại: {candidateWords.length.toLocaleString()} từ mới</span>
          </div>

          {/* History Toggle Button */}
          <button
            onClick={() => setShowHistory((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-semibold transition-all ${
              showHistory
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                : isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Lịch sử ({todayDrawnIds.length})</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Level Filter & Draw Mode Tabs */}
      <div
        className={`p-4 rounded-2xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          <span className={`text-xs font-bold mr-1.5 shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Cấp bậc:
          </span>
          <button
            onClick={() => handleLevelChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedLevel === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Toàn bộ kho ({words.length.toLocaleString()} từ)
          </button>
          {availableLevels.map((lvl) => {
            const count = words.filter((w) => w.level === lvl).length;
            const isSel = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lvl} ({count.toLocaleString()})
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher: Single Card vs 5-Card Pack */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <div
            className={`p-1 rounded-xl border flex items-center ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => {
                setDrawMode('single');
                if (!currentWord) drawSingleCard();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                drawMode === 'single'
                  ? 'bg-white text-indigo-700 shadow-xs dark:bg-slate-800 dark:text-indigo-400'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rút từng thẻ</span>
            </button>
            <button
              onClick={() => {
                setDrawMode('pack5');
                if (packCards.length === 0) draw5Pack();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                drawMode === 'pack5'
                  ? 'bg-white text-indigo-700 shadow-xs dark:bg-slate-800 dark:text-indigo-400'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Gói 5 thẻ ngẫu nhiên</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: SINGLE CARD MYSTERY DRAW */}
      {drawMode === 'single' && currentWord && (
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          {/* Card Container with 3D Flip Effect */}
          <div
            className="w-full relative [perspective:1200px] cursor-pointer"
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            <div
              className={`w-full min-h-[420px] sm:min-h-[460px] rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] relative ${
                isFlipped ? '[transform:rotateY(180deg)]' : ''
              } ${isShuffling ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
            >
              {/* FRONT SIDE: MYSTERY CARD (BEFORE FLIP) */}
              <div
                className={`absolute inset-0 rounded-3xl p-8 flex flex-col justify-between [backface-visibility:hidden] border-2 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border-indigo-500/30 shadow-indigo-950/20'
                    : 'bg-gradient-to-br from-white via-indigo-50/40 to-sky-50/40 border-slate-200 shadow-indigo-100/40'
                }`}
              >
                {/* Header of Mystery Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-700 font-extrabold flex items-center justify-center text-sm border border-indigo-500/20">
                      {currentLang === 'en' ? '🇬🇧' : '🇨🇳'}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                      {currentWord.level} &bull; {currentWord.unit.split(':')[0]}
                    </span>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Thẻ bí ẩn ngẫu nhiên
                  </span>
                </div>

                {/* Center Question / Teaser */}
                <div className="text-center my-auto py-6">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 text-3xl font-black mb-4 animate-bounce">
                    ?
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                    Từ vựng ngẫu nhiên hôm nay
                  </h3>
                  <p
                    className={`text-xs sm:text-sm max-w-sm mx-auto ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Bấm vào thẻ bất kỳ đâu để <span className="font-bold text-indigo-600">lật mở thẻ</span> và khám phá từ vựng, phiên âm cùng ví dụ sinh động!
                  </p>

                  {/* Audio Sneak Peek Button */}
                  <div className="mt-5 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(currentWord.word, currentWord.language);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-750'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 shadow-xs'
                      }`}
                    >
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                      <span>Nghe phát âm trước khi lật</span>
                    </button>
                  </div>
                </div>

                {/* Bottom hint */}
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200 text-xs">
                  <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>
                    ID: #{currentWord.id}
                  </span>
                  <span className="font-bold text-indigo-600 flex items-center gap-1">
                    Bấm để lật thẻ <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* BACK SIDE: REVEALED WORD CARD */}
              <div
                className={`absolute inset-0 rounded-3xl p-6 sm:p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] border shadow-xl ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-white shadow-black/40'
                    : 'bg-white border-slate-200 text-slate-900 shadow-slate-100'
                }`}
              >
                {/* Header Info */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-indigo-50 text-indigo-800 border border-indigo-200">
                        {currentWord.level}
                      </span>
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {currentWord.partOfSpeech}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleBookmark(currentWord)}
                        className={`p-2 rounded-xl border transition-all ${
                          isCurrentBookmarked
                            ? 'bg-amber-100 border-amber-300 text-amber-600'
                            : isDarkMode
                            ? 'border-slate-800 text-slate-400 hover:text-white'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                        title="Lưu vào sổ tay yêu thích"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isCurrentBookmarked ? 'fill-amber-500' : ''}`}
                        />
                      </button>

                      <button
                        onClick={() => handleMarkMastered(currentWord)}
                        className={`p-2 rounded-xl border transition-all ${
                          isCurrentMastered
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                            : isDarkMode
                            ? 'border-slate-800 text-slate-400 hover:text-emerald-400'
                            : 'border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                        }`}
                        title="Đánh dấu đã thuộc từ này (loại trừ khỏi các lần rút sau)"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${isCurrentMastered ? 'fill-emerald-500 text-white' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Main Word Typography */}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-indigo-600">
                      {currentWord.word}
                    </h2>
                    <span
                      className={`text-base sm:text-lg font-mono font-medium ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {currentWord.phonetic}
                    </span>
                    {currentWord.sinoVietnamese && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                        Hán-Việt: {currentWord.sinoVietnamese}
                      </span>
                    )}
                  </div>

                  {/* Meaning */}
                  <p className="mt-2 text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {currentWord.vietnameseMeaning}
                  </p>

                  {/* Example Box */}
                  <div
                    className={`mt-4 p-3.5 rounded-2xl border ${
                      isDarkMode
                        ? 'bg-slate-950/70 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-medium italic text-slate-800 dark:text-slate-200">
                      &ldquo;{currentWord.example}&rdquo;
                    </p>
                    {currentWord.examplePhonetic && (
                      <p className="text-[11px] font-mono text-indigo-600 mt-1">
                        {currentWord.examplePhonetic}
                      </p>
                    )}
                    <p
                      className={`text-xs mt-1 font-normal ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      &rarr; {currentWord.exampleMeaning}
                    </p>
                  </div>

                  {/* Mnemonic / Collocations */}
                  {currentWord.mnemonicTip && (
                    <div className="mt-3 flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800/60">
                      <span className="font-bold shrink-0">💡 Mẹo:</span>
                      <span>{currentWord.mnemonicTip}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons (Clicking inside will not flip card) */}
                <div
                  className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 gap-2 flex-wrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speak(currentWord.word, currentWord.language)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Nghe lại</span>
                    </button>

                    <button
                      onClick={() => onOpenPronounce(currentWord)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      }`}
                      title="Luyện đọc bằng giọng nói của bạn"
                    >
                      <Mic className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Luyện đọc</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setIsFlipped(false)}
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Lật lại mặt trước</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row Under Card */}
          <div className="mt-8 flex items-center gap-3 justify-center w-full">
            <button
              onClick={drawSingleCard}
              disabled={isShuffling}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-extrabold text-sm shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-sky-700 transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>Rút thẻ ngẫu nhiên tiếp theo 🎲</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: DAILY 5-CARD MYSTERY PACK */}
      {drawMode === 'pack5' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎴</span>
              <h2 className="text-lg sm:text-xl font-bold">
                Bộ 5 thẻ bí ẩn hôm nay (Click từng thẻ để lật)
              </h2>
            </div>

            <button
              onClick={draw5Pack}
              disabled={isShuffling}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs transition-all disabled:opacity-50"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>Rút 5 thẻ mới khác</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {packCards.map((word, idx) => {
              const flipped = !!packFlippedState[word.id];
              return (
                <div
                  key={word.id}
                  className="[perspective:1000px] cursor-pointer min-h-[300px]"
                  onClick={() => {
                    setPackFlippedState((prev) => ({
                      ...prev,
                      [word.id]: !prev[word.id],
                    }));
                  }}
                >
                  <div
                    className={`w-full h-full min-h-[300px] rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] relative ${
                      flipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* Mystery Front */}
                    <div
                      className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between [backface-visibility:hidden] border-2 shadow-md ${
                        isDarkMode
                          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-indigo-500/20'
                          : 'bg-gradient-to-br from-white to-indigo-50/30 border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800">
                          {word.level}
                        </span>
                        <span className="text-[11px] font-bold text-indigo-600">Thẻ #{idx + 1}</span>
                      </div>

                      <div className="text-center py-6">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md mb-2">
                          ?
                        </div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Thẻ bí ẩn #{idx + 1}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">Bấm để lật mở</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(word.word, word.language);
                        }}
                        className={`w-full py-1.5 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1 ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <Volume2 className="w-3 h-3 text-indigo-600" />
                        <span>Nghe âm thanh</span>
                      </button>
                    </div>

                    {/* Revealed Back */}
                    <div
                      className={`absolute inset-0 rounded-2xl p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] border shadow-md ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-800 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800">
                            {word.level}
                          </span>
                          <span className="text-[10px] text-slate-400">{word.partOfSpeech}</span>
                        </div>

                        <h4 className="text-xl font-black text-indigo-600">{word.word}</h4>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">{word.phonetic}</p>
                        {word.sinoVietnamese && (
                          <p className="text-[10px] font-bold text-rose-500">
                            Hán-Việt: {word.sinoVietnamese}
                          </p>
                        )}
                        <p className="text-xs font-bold mt-2 text-slate-800 dark:text-slate-100">
                          {word.vietnameseMeaning}
                        </p>
                        <p className="text-[11px] italic mt-2 text-slate-500 line-clamp-2">
                          &ldquo;{word.example}&rdquo;
                        </p>
                      </div>

                      <div
                        className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => speak(word.word, word.language)}
                          className="p-1.5 rounded-lg bg-indigo-50/60 text-indigo-700 dark:bg-slate-800 dark:text-indigo-400"
                          title="Phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenPronounce(word)}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-slate-800 dark:text-emerald-400"
                          title="Luyện đọc"
                        >
                          <Mic className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMarkMastered(word)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
                          title="Đánh dấu đã thuộc"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TODAY'S DRAWN HISTORY DRAWER */}
      {showHistory && (
        <div
          className={`mt-10 p-6 rounded-3xl border transition-colors animate-fadeIn ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-base sm:text-lg">
                Các từ đã lật mở hôm nay ({drawnTodayWords.length} từ)
              </h3>
            </div>

            <button
              onClick={handleResetDailyDraw}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900 transition-colors`}
              title="Xóa danh sách đã rút hôm nay để xáo lại từ đầu"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Xáo lại từ đầu</span>
            </button>
          </div>

          {drawnTodayWords.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">
              Bạn chưa rút thẻ nào hôm nay. Hãy bấm &quot;Rút thẻ ngẫu nhiên&quot; để bắt đầu!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1 no-scrollbar">
              {drawnTodayWords.map((w) => (
                <div
                  key={w.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-indigo-600 truncate">{w.word}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 font-bold shrink-0">
                        {w.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{w.vietnameseMeaning}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => speak(w.word, w.language)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentWord(w);
                        setDrawMode('single');
                        setIsFlipped(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-600"
                      title="Mở lại thẻ này"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
