import React, { useState, useMemo, useEffect } from 'react';
import { Volume2, Mic, Bookmark, Check, BookOpen, Sparkles, Lightbulb, ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight, Filter, Award } from 'lucide-react';
import { VocabWord, LevelType, Language, UserProfileProgress } from '../types';
import { speak } from '../utils/speech';
import { updateWordSrs } from '../utils/srs';

interface VocabularyExplorerProps {
  words: VocabWord[];
  currentLang: Language;
  currentLevel: LevelType;
  onLevelChange: (level: LevelType) => void;
  profile: UserProfileProgress;
  onUpdateProfile: (updated: UserProfileProgress) => void;
  onOpenPronounce: (word: VocabWord) => void;
  isDarkMode?: boolean;
  targetJumpWord?: VocabWord | null;
}

export const VocabularyExplorer: React.FC<VocabularyExplorerProps> = ({
  words,
  currentLang,
  currentLevel,
  onLevelChange,
  profile,
  onUpdateProfile,
  onOpenPronounce,
  isDarkMode = false,
  targetJumpWord,
}) => {
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const WORDS_PER_PAGE = 40;

  // Jump to specific word when targetJumpWord is passed
  useEffect(() => {
    if (!targetJumpWord) return;

    if (targetJumpWord.level !== currentLevel) {
      onLevelChange(targetJumpWord.level);
    }

    setSearchQuery('');
    setSelectedUnit('ALL');

    // Find page of word
    const lvlWords = words.filter((w) => w.level === targetJumpWord.level);
    const wordIdx = lvlWords.findIndex((w) => w.id === targetJumpWord.id);
    if (wordIdx !== -1) {
      const page = Math.floor(wordIdx / WORDS_PER_PAGE) + 1;
      setCurrentPage(page);
    }

    setHighlightedId(targetJumpWord.id);
    setExpandedWordId(targetJumpWord.id);

    // Scroll into view smoothly
    setTimeout(() => {
      const el = document.getElementById(`word-${targetJumpWord.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 250);

    // Clear pulse highlight after 4 seconds
    const timer = setTimeout(() => {
      setHighlightedId(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [targetJumpWord]);

  // Reset pagination and unit filter when level changes
  useEffect(() => {
    setSelectedUnit('ALL');
    setCurrentPage(1);
    setExpandedWordId(null);
  }, [currentLevel, currentLang]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const englishLevels: { id: LevelType; label: string; desc: string; badge: string }[] = [
    { id: 'A1', label: 'Cấp A1 (Beginner)', desc: 'Từ vựng giao tiếp thiết yếu hằng ngày', badge: 'Oxford 3000' },
    { id: 'A2', label: 'Cấp A2 (Elementary)', desc: 'Du lịch, sức khỏe, công việc & cảm xúc', badge: 'Oxford 3000' },
    { id: 'B1', label: 'Cấp B1 (Intermediate)', desc: 'Công nghệ, xã hội & truyền thông số', badge: 'Oxford 3000' },
    { id: 'B2', label: 'Cấp B2 (Upper-Inter)', desc: 'Tư duy phản biện, logic & đổi mới', badge: 'Oxford 5000' },
    { id: 'C1', label: 'Cấp C1 (Advanced)', desc: 'Học thuật chuyên sâu & diễn ngôn tinh tế', badge: 'Oxford 5000' },
  ];

  const chineseLevels: { id: LevelType; label: string; desc: string; badge: string }[] = [
    { id: 'HSK1', label: 'HSK 1 (Sơ Cấp 1)', desc: 'Từ ngữ và mẫu câu căn bản nhất', badge: 'HSK 3.0' },
    { id: 'HSK2', label: 'HSK 2 (Sơ Cấp 2)', desc: 'Đời sống, kế hoạch, thể thao & mua sắm', badge: 'HSK 3.0' },
    { id: 'HSK3', label: 'HSK 3 (Trung Cấp)', desc: 'Giao lưu xã hội, giải quyết vấn đề', badge: 'HSK 3.0' },
    { id: 'HSK4', label: 'HSK 4 (Trung Cao Cấp)', desc: 'Sự nghiệp, tuyển dụng & triết lý', badge: 'HSK 3.0' },
    { id: 'HSK5', label: 'HSK 5 (Cao Cấp)', desc: 'Chiến lược, thành ngữ & văn phong chuyên sâu', badge: 'HSK 3.0' },
    { id: 'HSK6', label: 'HSK 6 (Thành Thạo)', desc: 'Thành ngữ cổ điển, văn học & học thuật đỉnh cao', badge: 'HSK 3.0' },
  ];

  const levels = currentLang === 'en' ? englishLevels : chineseLevels;

  // Words for current level
  const currentLevelWords = useMemo(() => {
    return words.filter((w) => w.level === currentLevel);
  }, [words, currentLevel]);

  // Distinct units in current level
  const availableUnits = useMemo(() => {
    const set = new Set<string>();
    currentLevelWords.forEach((w) => set.add(w.unit));
    return Array.from(set);
  }, [currentLevelWords]);

  // Filter words by search and unit
  const filteredWords = useMemo(() => {
    let result = currentLevelWords;

    if (selectedUnit !== 'ALL') {
      result = result.filter((w) => w.unit === selectedUnit);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.vietnameseMeaning.toLowerCase().includes(q) ||
          (w.sinoVietnamese && w.sinoVietnamese.toLowerCase().includes(q)) ||
          w.phonetic.toLowerCase().includes(q)
      );
    }

    return result;
  }, [currentLevelWords, selectedUnit, searchQuery]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredWords.length / WORDS_PER_PAGE));

  // Paged slice of words for lightning-fast rendering
  const paginatedWords = useMemo(() => {
    const startIndex = (currentPage - 1) * WORDS_PER_PAGE;
    return filteredWords.slice(startIndex, startIndex + WORDS_PER_PAGE);
  }, [filteredWords, currentPage]);

  // Group paginated words by Unit
  const unitsMap = useMemo(() => {
    return paginatedWords.reduce((acc, word) => {
      if (!acc[word.unit]) {
        acc[word.unit] = [];
      }
      acc[word.unit].push(word);
      return acc;
    }, {} as Record<string, VocabWord[]>);
  }, [paginatedWords]);

  // Progress for current level
  const levelMasteredCount = useMemo(() => {
    return currentLevelWords.filter(
      (w) => profile.wordsProgress[w.id]?.status === 'mastered'
    ).length;
  }, [currentLevelWords, profile.wordsProgress]);

  // Progress for current unit (if unit selected)
  const unitProgress = useMemo(() => {
    if (selectedUnit === 'ALL') return null;
    const uWords = currentLevelWords.filter((w) => w.unit === selectedUnit);
    const mastered = uWords.filter(
      (w) => profile.wordsProgress[w.id]?.status === 'mastered'
    ).length;
    return {
      total: uWords.length,
      mastered,
      percent: uWords.length > 0 ? Math.round((mastered / uWords.length) * 100) : 0,
    };
  }, [selectedUnit, currentLevelWords, profile.wordsProgress]);

  // Navigate units
  const handlePrevUnit = () => {
    if (selectedUnit === 'ALL') return;
    const currentIndex = availableUnits.indexOf(selectedUnit);
    if (currentIndex > 0) {
      setSelectedUnit(availableUnits[currentIndex - 1]);
      setCurrentPage(1);
    }
  };

  const handleNextUnit = () => {
    if (selectedUnit === 'ALL') return;
    const currentIndex = availableUnits.indexOf(selectedUnit);
    if (currentIndex < availableUnits.length - 1) {
      setSelectedUnit(availableUnits[currentIndex + 1]);
      setCurrentPage(1);
    }
  };

  const toggleBookmark = (wordId: string) => {
    const currentProgress = profile.wordsProgress[wordId] || {
      wordId,
      status: 'learning',
      repetitions: 0,
      easeFactor: 2.5,
      intervalDays: 1,
      nextReviewDate: Date.now() + 24 * 60 * 60 * 1000,
      correctCount: 0,
      incorrectCount: 0,
      lastReviewed: Date.now(),
      isBookmarked: false,
    };

    onUpdateProfile({
      ...profile,
      wordsProgress: {
        ...profile.wordsProgress,
        [wordId]: {
          ...currentProgress,
          isBookmarked: !currentProgress.isBookmarked,
        },
      },
    });
  };

  const handleMarkLearned = (wordId: string) => {
    const currentProgress = profile.wordsProgress[wordId];
    const updated = updateWordSrs(currentProgress, wordId, 4);

    onUpdateProfile({
      ...profile,
      todayLearnedCount: profile.todayLearnedCount + 1,
      wordsProgress: {
        ...profile.wordsProgress,
        [wordId]: updated,
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Banner: Bright and professional */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-gradient-to-r from-indigo-50/70 via-sky-50/40 to-white border-slate-200 shadow-sm text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                CHUYÊN GIA NGÔN NGỮ
              </span>
              <span
                className={`text-xs font-semibold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Kho từ vựng chuyên sâu &gt; 10.000 từ chuẩn quốc tế ({currentLang === 'en' ? 'Oxford / CEFR' : 'HSK 3.0'}) &bull; Tổng &gt; 20.000 từ
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {currentLang === 'en'
                ? 'Lộ Trình Học Từ Vựng Tiếng Anh Chuẩn Oxford & CEFR'
                : 'Lộ Trình Học Từ Vựng Tiếng Trung Chuẩn HSK 3.0'}
            </h1>
            <p
              className={`text-xs sm:text-sm mt-1 max-w-2xl ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Học từng bước từ cơ bản đến nâng cao. Mỗi từ đều có phiên âm chuẩn (IPA / Pinyin thanh điệu),
              âm thanh đọc chuẩn giọng bản xứ, câu ví dụ thực tế và mẹo ghi nhớ sâu.
            </p>
          </div>

          {/* Quick Search in Explorer */}
          <div className="w-full md:w-72">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-800 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100'
              }`}
            >
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm từ, nghĩa, phiên âm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-transparent outline-none placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            className={`text-lg font-black ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Chọn Cấp Bậc Học (Từ Dễ Lên Khó)
          </h2>
          <span
            className={`text-xs font-semibold ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {currentLevelWords.length.toLocaleString()} từ ở cấp này &bull; Đã thuộc {levelMasteredCount}/{currentLevelWords.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {levels.map((lvl) => {
            const isSelected = currentLevel === lvl.id;
            const lvlWords = words.filter((w) => w.level === lvl.id);
            const masteredCount = lvlWords.filter(
              (w) => profile.wordsProgress[w.id]?.status === 'mastered'
            ).length;

            return (
              <button
                key={lvl.id}
                onClick={() => onLevelChange(lvl.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-gradient-to-b from-orange-500/20 to-amber-500/10 border-orange-500 shadow-lg ring-2 ring-orange-500'
                      : 'bg-gradient-to-b from-indigo-50 to-sky-50/40 border-indigo-400 shadow-md ring-2 ring-indigo-500 text-slate-900'
                    : isDarkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 text-slate-700 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-black ${
                      isSelected ? 'text-indigo-700 dark:text-orange-400' : isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {lvl.id}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-orange-950 dark:text-orange-300'
                        : isDarkMode
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {lvlWords.length.toLocaleString()} từ
                  </span>
                </div>
                <div
                  className={`text-xs font-bold mt-1.5 line-clamp-1 ${
                    isSelected ? 'text-indigo-950 dark:text-white font-extrabold' : isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {lvl.label}
                </div>
                <div
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {lvl.desc}
                </div>
                {/* Progress bar */}
                <div className="mt-2.5 w-full bg-slate-200/70 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-orange-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${lvlWords.length > 0 ? (masteredCount / lvlWords.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unit Filter & Smart Navigation Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-all ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {/* Left: Unit Selector Dropdown */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bài học:</span>
          </div>

          <select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold outline-none cursor-pointer transition-all ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-600'
            }`}
          >
            <option value="ALL">Tất cả bài học ({availableUnits.length} Units - {currentLevelWords.length.toLocaleString()} từ)</option>
            {availableUnits.map((u) => {
              const uCount = currentLevelWords.filter((w) => w.unit === u).length;
              return (
                <option key={u} value={u}>
                  {u} ({uCount} từ)
                </option>
              );
            })}
          </select>

          {/* Unit Next/Prev buttons if specific unit selected */}
          {selectedUnit !== 'ALL' && (
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevUnit}
                disabled={availableUnits.indexOf(selectedUnit) === 0}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-xs"
                title="Bài trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextUnit}
                disabled={availableUnits.indexOf(selectedUnit) === availableUnits.length - 1}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-xs"
                title="Bài tiếp theo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Unit mastery stats */}
          {unitProgress && (
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Tiến độ bài: {unitProgress.mastered}/{unitProgress.total} từ ({unitProgress.percent}%)</span>
            </div>
          )}
        </div>

        {/* Right: Quick Pagination Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs text-slate-500">
            Hiển thị {paginatedWords.length}/{filteredWords.length} từ &bull; Trang {currentPage}/{totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Units & Word List */}
      <div className="space-y-8">
        {Object.entries(unitsMap).map(([unitTitle, unitWords]) => (
          <div
            key={unitTitle}
            className={`rounded-3xl border overflow-hidden transition-all ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800/90 shadow-xl'
                : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            {/* Unit Header */}
            <div
              className={`px-6 py-4 border-b flex items-center justify-between ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800/80 text-white'
                  : 'bg-slate-50/80 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600 shadow-sm shadow-indigo-500/50" />
                <h3 className="text-base font-extrabold">{unitTitle}</h3>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isDarkMode
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-white border border-slate-200 text-slate-600 shadow-2xs'
                }`}
              >
                {unitWords.length} từ chuẩn
              </span>
            </div>

            {/* Words Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {unitWords.map((word) => {
                const progress = profile.wordsProgress[word.id];
                const isExpanded = expandedWordId === word.id;
                const isBookmarked = progress?.isBookmarked || false;
                const isMastered = progress?.status === 'mastered';
                const isHighlighted = highlightedId === word.id;

                return (
                  <div
                    key={word.id}
                    id={`word-${word.id}`}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 group ${
                      isHighlighted
                        ? 'ring-4 ring-amber-400 dark:ring-amber-500 scale-[1.02] shadow-2xl border-amber-400 dark:border-amber-500 bg-amber-50/90 dark:bg-amber-950/50'
                        : isDarkMode
                        ? 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                        : 'bg-white border-slate-200/90 hover:border-indigo-400 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Top bar of card */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                              isDarkMode
                                ? 'bg-slate-800 text-slate-400 border-slate-700'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {word.partOfSpeech}
                          </span>
                          {word.sinoVietnamese && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              Hán-Việt: {word.sinoVietnamese}
                            </span>
                          )}
                          {isMastered && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Thuộc lòng
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleBookmark(word.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isBookmarked
                                ? 'text-amber-500 hover:text-amber-600'
                                : isDarkMode
                                ? 'text-slate-500 hover:text-slate-300'
                                : 'text-slate-400 hover:text-amber-500'
                            }`}
                            title={isBookmarked ? 'Bỏ lưu' : 'Lưu từ vào sổ từ'}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Main Word Header */}
                      <div className="flex items-start justify-between gap-3 mt-1">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`text-xl sm:text-2xl font-black tracking-tight ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {word.word}
                            </span>
                          </div>

                          {/* International Phonetic Representation */}
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-xs sm:text-sm font-mono font-medium text-emerald-600 dark:text-emerald-400">
                              {word.phonetic}
                            </span>
                            {word.phoneticUk && word.phoneticUs && (
                              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                                <span>🇬🇧 {word.phoneticUk}</span>
                                <span>&bull;</span>
                                <span>🇺🇸 {word.phoneticUs}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Audio & Mic Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => speak(word.word, word.language)}
                            className="p-2.5 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer shadow-xs"
                            title="Nghe phát âm chuẩn quốc tế"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onOpenPronounce(word)}
                            className="p-2.5 rounded-xl bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:bg-sky-600 hover:text-white transition-all cursor-pointer shadow-xs"
                            title="Luyện nói & chấm điểm AI Speech Recognition"
                          >
                            <Mic className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Meaning */}
                      <div className="mt-2.5">
                        <p
                          className={`text-sm font-semibold ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {word.vietnameseMeaning}
                        </p>
                      </div>

                      {/* Example Sentence */}
                      <div
                        className={`mt-3 p-3 rounded-xl border text-xs transition-colors ${
                          isDarkMode
                            ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                            : 'bg-slate-50/80 border-slate-200/70 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            Câu ví dụ thực tế
                          </span>
                          <button
                            onClick={() => speak(word.example, word.language)}
                            className="p-1 hover:bg-indigo-100 dark:hover:bg-slate-800 rounded transition-colors cursor-pointer"
                            title="Nghe câu ví dụ"
                          >
                            <Volume2 className="w-3 h-3 text-slate-400 hover:text-indigo-600" />
                          </button>
                        </div>
                        <p className="font-medium italic leading-relaxed">&ldquo;{word.example}&rdquo;</p>
                        {word.examplePhonetic && (
                          <p className="text-[11px] font-mono text-amber-600 mt-1">
                            {word.examplePhonetic}
                          </p>
                        )}
                        <p
                          className={`mt-1 font-semibold ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {word.exampleMeaning}
                        </p>
                      </div>

                      {/* Expandable Mnemonic & Collocations */}
                      {isExpanded && (
                        <div
                          className={`mt-3 p-3 rounded-xl border text-xs space-y-2 ${
                            isDarkMode
                              ? 'bg-slate-900 border-slate-800 text-slate-300'
                              : 'bg-amber-50/60 border-amber-200/80 text-amber-950'
                          }`}
                        >
                          {word.mnemonicTip && (
                            <div className="flex items-start gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span className="text-[11px]">
                                <strong>Mẹo nhớ:</strong> {word.mnemonicTip}
                              </span>
                            </div>
                          )}

                          {word.collocations && word.collocations.length > 0 && (
                            <div className="text-[11px]">
                              <strong>Cụm từ liên quan:</strong>{' '}
                              <span className="font-mono text-indigo-800 dark:text-indigo-300">
                                {word.collocations.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom expand toggle & Learned Button */}
                    <div
                      className={`mt-3.5 pt-3 border-t flex items-center justify-between ${
                        isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedWordId(isExpanded ? null : word.id)}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold transition-colors cursor-pointer ${
                          isDarkMode
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <span>{isExpanded ? 'Thu gọn chi tiết' : 'Xem mẹo nhớ & cụm từ'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleMarkLearned(word.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isMastered
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : isDarkMode
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200'
                        }`}
                      >
                        {isMastered ? '✓ Đã thuộc' : 'Đánh dấu đã học'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Pagination Bar */}
      {totalPages > 1 && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage <= 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang trước</span>
          </button>

          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Trang {currentPage} / {totalPages} ({filteredWords.length.toLocaleString()} từ)
            </span>
          </div>

          <button
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Trang sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
