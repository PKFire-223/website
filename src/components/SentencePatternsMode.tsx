import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Filter,
  PlayCircle,
  Shuffle,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { SENTENCE_PATTERNS_DATABASE, SentencePattern, PatternExample } from '../data/sentencePatternsData';
import { Language } from '../types';
import { speak, EnglishAccent, getPreferredAccent } from '../utils/speech';

interface SentencePatternsModeProps {
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
  isDarkMode: boolean;
}

export const SentencePatternsMode: React.FC<SentencePatternsModeProps> = ({
  currentLang,
  isDarkMode,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [enAccent, setEnAccent] = useState<EnglishAccent>(getPreferredAccent());
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('linguavocab_bookmarked_patterns');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Practice Quiz State
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Filter patterns by language
  const languagePatterns = useMemo(() => {
    return SENTENCE_PATTERNS_DATABASE.filter((p) => p.language === currentLang);
  }, [currentLang]);

  // Available levels for current language
  const availableLevels = useMemo(() => {
    if (currentLang === 'en') {
      return ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'];
    }
    return ['ALL', 'HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'];
  }, [currentLang]);

  // Available categories
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    languagePatterns.forEach((p) => cats.add(p.category));
    return ['ALL', ...Array.from(cats)];
  }, [languagePatterns]);

  // Filtered patterns
  const filteredPatterns = useMemo(() => {
    return languagePatterns.filter((pattern) => {
      // Level filter
      if (selectedLevel !== 'ALL' && pattern.level !== selectedLevel) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'ALL' && pattern.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = pattern.title.toLowerCase().includes(q);
        const matchFormula = pattern.formula.toLowerCase().includes(q);
        const matchExplanation = pattern.explanation.toLowerCase().includes(q);
        const matchExamples = pattern.examples.some(
          (ex) =>
            ex.text.toLowerCase().includes(q) ||
            ex.translation.toLowerCase().includes(q) ||
            (ex.pinyin && ex.pinyin.toLowerCase().includes(q))
        );
        return matchTitle || matchFormula || matchExplanation || matchExamples;
      }
      return true;
    });
  }, [languagePatterns, selectedLevel, selectedCategory, searchQuery]);

  // Handle bookmark toggle
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('linguavocab_bookmarked_patterns', JSON.stringify(next));
      return next;
    });
  };

  // Play audio TTS
  const handlePlayAudio = (text: string) => {
    setSpeakingText(text);
    speak(
      text,
      currentLang,
      speechRate,
      () => setSpeakingText(null),
      currentLang === 'en' ? enAccent : undefined
    );
  };

  // Copy sentence to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  // Generate quiz questions from patterns
  const quizQuestions = useMemo(() => {
    if (!languagePatterns.length) return [];
    // Shuffle and pick 10
    const shuffled = [...languagePatterns].sort(() => 0.5 - Math.random()).slice(0, 10);
    return shuffled.map((pat) => {
      const ex = pat.examples[0] || {
        text: pat.formula,
        translation: pat.title,
        situation: 'Thực tế',
      };

      // Create distractors from other patterns
      const otherFormulas = languagePatterns
        .filter((p) => p.id !== pat.id)
        .map((p) => p.formula)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [pat.formula, ...otherFormulas].sort(() => 0.5 - Math.random());

      return {
        pattern: pat,
        example: ex,
        question: `Mẫu câu nào phù hợp nhất để diễn đạt ý: "${pat.title}" (${ex.situation})?`,
        correctAnswer: pat.formula,
        options,
        explanation: pat.explanation,
      };
    });
  }, [languagePatterns, isQuizMode]);

  const handleSelectQuizOption = (option: string) => {
    if (selectedQuizOption !== null) return;
    setSelectedQuizOption(option);
    if (option === quizQuestions[quizIndex].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm relative overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-indigo-50/80 via-sky-50/50 to-white border-indigo-100'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kho mẫu câu chuẩn quốc tế & giao tiếp thực tế</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentLang === 'en' ? (
                <>
                  Mẫu Câu Tiếng Anh Chuẩn{' '}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Oxford & CEFR (A1 - C1)
                  </span>
                </>
              ) : (
                <>
                  Mẫu Câu Tiếng Trung Chuẩn{' '}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Hán Ngữ HSK (HSK1 - HSK6)
                  </span>
                </>
              )}
            </h1>
            <p
              className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Học theo cấu trúc ngữ pháp then chốt kèm phiên âm chuẩn (IPA / Pinyin thanh điệu), ngữ
              cảnh thực tiễn và phát âm giọng bản xứ với tốc độ tùy biến linh hoạt.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setIsQuizMode(!isQuizMode);
                handleResetQuiz();
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-sm cursor-pointer ${
                isQuizMode
                  ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  : 'bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isQuizMode ? 'Xem danh sách mẫu câu' : 'Luyện phản xạ mẫu câu (Quiz)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUIZ MODE MODAL / SUBVIEW */}
      {isQuizMode ? (
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {!isQuizFinished && quizQuestions.length > 0 ? (
            <div className="space-y-6">
              {/* Quiz Header */}
              <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    Câu hỏi {quizIndex + 1} / {quizQuestions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Cấp bậc: {quizQuestions[quizIndex].pattern.level}
                  </span>
                </div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Điểm số: {quizScore} / {quizIndex + (selectedQuizOption !== null ? 1 : 0)}
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold">
                  {quizQuestions[quizIndex].question}
                </h3>
                <div
                  className={`p-4 rounded-2xl border text-sm font-medium ${
                    isDarkMode
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <p className="font-semibold text-xs text-indigo-500 mb-1">Ví dụ thực tế:</p>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-base text-slate-900 dark:text-white">
                        {quizQuestions[quizIndex].example.text}
                      </p>
                      {quizQuestions[quizIndex].example.pinyin && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                          {quizQuestions[quizIndex].example.pinyin}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        &rarr; {quizQuestions[quizIndex].example.translation}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(quizQuestions[quizIndex].example.text)}
                      className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer transition-all"
                      title="Phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[quizIndex].options.map((option, idx) => {
                  const isSelected = selectedQuizOption === option;
                  const isCorrect = option === quizQuestions[quizIndex].correctAnswer;
                  let btnStyle = isDarkMode
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                  if (selectedQuizOption !== null) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20';
                    } else if (isSelected) {
                      btnStyle =
                        'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20';
                    } else {
                      btnStyle = isDarkMode
                        ? 'bg-slate-900/40 text-slate-500 border-slate-800'
                        : 'bg-slate-100 text-slate-400 border-slate-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedQuizOption !== null}
                      onClick={() => handleSelectQuizOption(option)}
                      className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span className="font-mono text-xs sm:text-sm">{option}</span>
                      {selectedQuizOption !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {selectedQuizOption !== null && (
                <div
                  className={`p-4 rounded-2xl border animate-fade-in space-y-3 ${
                    selectedQuizOption === quizQuestions[quizIndex].correctAnswer
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider">
                    {selectedQuizOption === quizQuestions[quizIndex].correctAnswer
                      ? '🎉 Chính xác!'
                      : '❌ Chưa chính xác'}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {quizQuestions[quizIndex].explanation}
                  </p>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm hover:bg-indigo-700 cursor-pointer shadow-md"
                    >
                      {quizIndex + 1 < quizQuestions.length ? 'Câu hỏi tiếp theo &rarr;' : 'Xem kết quả tổng kết'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Result Screen */
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl font-black">
                🏆
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black">Hoàn thành bài luyện phản xạ!</h3>
                <p className="text-base text-slate-500">
                  Bạn đã trả lời đúng{' '}
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xl">
                    {quizScore} / {quizQuestions.length}
                  </span>{' '}
                  mẫu câu chuẩn.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Luyện lại bộ câu hỏi khác</span>
                </button>
                <button
                  onClick={() => setIsQuizMode(false)}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-sm border cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Trở về danh sách mẫu câu
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* PATTERNS LIST EXPLORER */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border shadow-xs space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Search Input & Audio Options */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm theo công thức, ý nghĩa, từ vựng hoặc ví dụ..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm outline-none transition-all ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600 focus:bg-white'
                  }`}
                />
              </div>

              {/* Audio Controls */}
              <div className="flex items-center gap-2 shrink-0">
                {currentLang === 'en' && (
                  <div
                    className={`flex items-center p-1 rounded-xl border text-xs font-semibold ${
                      isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => setEnAccent('uk')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        enAccent === 'uk'
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      🇬🇧 UK
                    </button>
                    <button
                      onClick={() => setEnAccent('us')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        enAccent === 'us'
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      🇺🇸 US
                    </button>
                  </div>
                )}

                {/* Speed toggle */}
                <div
                  className={`flex items-center p-1 rounded-xl border text-xs font-semibold ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  {[0.75, 1.0, 1.25].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        speechRate === rate
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
              <span className="text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Cấp bậc:</span>
              </span>
              {availableLevels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                    selectedLevel === lvl
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isDarkMode
                      ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {lvl === 'ALL' ? 'Tất cả cấp bậc' : lvl}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
              <span className="text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chủ điểm:</span>
              </span>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-bold'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'ALL' ? 'Mọi chủ điểm' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Tìm thấy <strong className="text-indigo-600 dark:text-indigo-400">{filteredPatterns.length}</strong>{' '}
              mẫu câu chuẩn quốc tế
            </span>
            <span>
              Đã lưu: <strong>{bookmarkedIds.length}</strong> mẫu câu yêu thích
            </span>
          </div>

          {/* Patterns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPatterns.map((pattern) => {
              const isBookmarked = bookmarkedIds.includes(pattern.id);

              return (
                <div
                  key={pattern.id}
                  className={`p-6 rounded-3xl border shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-md ${
                    isDarkMode
                      ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20">
                          {pattern.level}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                            isDarkMode
                              ? 'bg-slate-950 border-slate-800 text-slate-400'
                              : 'bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                        >
                          {pattern.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">#{pattern.tag}</span>
                      </div>

                      <button
                        onClick={() => toggleBookmark(pattern.id)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                            : isDarkMode
                            ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-800'
                        }`}
                        title={isBookmarked ? 'Bỏ lưu' : 'Lưu vào danh sách yêu thích'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {pattern.title}
                    </h3>

                    {/* Formula Pill */}
                    <div
                      className={`p-3 rounded-2xl border font-mono text-xs sm:text-sm font-bold tracking-tight text-indigo-600 dark:text-indigo-400 select-all ${
                        isDarkMode
                          ? 'bg-indigo-950/30 border-indigo-900/50'
                          : 'bg-indigo-50/80 border-indigo-100'
                      }`}
                    >
                      {pattern.formula}
                    </div>

                    {/* Explanation */}
                    <p
                      className={`text-xs leading-relaxed ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {pattern.explanation}
                    </p>
                  </div>

                  {/* Examples Section */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Ví dụ ứng dụng thực tiễn ({pattern.examples.length}):
                    </p>
                    <div className="space-y-2">
                      {pattern.examples.map((ex, idx) => {
                        const isSpeaking = speakingText === ex.text;
                        const isCopied = copiedText === ex.text;

                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-2xl border transition-all ${
                              isDarkMode
                                ? 'bg-slate-950/50 border-slate-800/70 hover:bg-slate-950'
                                : 'bg-slate-50/70 border-slate-100 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                                  {ex.text}
                                </p>
                                {ex.pinyin && (
                                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                                    {ex.pinyin}
                                  </p>
                                )}
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  &rarr; {ex.translation}
                                </p>
                                <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                                  {ex.situation}
                                </span>
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center gap-1 shrink-0 pt-0.5">
                                <button
                                  onClick={() => handlePlayAudio(ex.text)}
                                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                    isSpeaking
                                      ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
                                      : isDarkMode
                                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                                  }`}
                                  title="Nghe phát âm chuẩn bản xứ"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleCopy(ex.text)}
                                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                    isCopied
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : isDarkMode
                                      ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                      : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                                  }`}
                                  title="Sao chép mẫu câu"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPatterns.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-2xl">
                🔍
              </div>
              <p className="text-base font-bold text-slate-600 dark:text-slate-400">
                Không tìm thấy mẫu câu nào khớp với bộ lọc hoặc từ khóa tìm kiếm.
              </p>
              <button
                onClick={() => {
                  setSelectedLevel('ALL');
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer shadow-sm"
              >
                Đặt lại tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
