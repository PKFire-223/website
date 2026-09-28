import React, { useState, useMemo } from 'react';
import { Search, Bookmark, Volume2, Mic, Filter, CheckCircle2 } from 'lucide-react';
import { VocabWord, UserProfileProgress } from '../types';
import { speak } from '../utils/speech';

interface VocabularyNotebookProps {
  words: VocabWord[];
  profile: UserProfileProgress;
  onUpdateProfile: (updated: UserProfileProgress) => void;
  onOpenPronounce: (word: VocabWord) => void;
  isDarkMode?: boolean;
}

export const VocabularyNotebook: React.FC<VocabularyNotebookProps> = ({
  words,
  profile,
  onUpdateProfile,
  onOpenPronounce,
  isDarkMode = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'bookmarked' | 'mastered' | 'learning'>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [displayLimit, setDisplayLimit] = useState(36);

  // Extract unique levels
  const uniqueLevels = useMemo(() => {
    return Array.from(new Set(words.map((w) => w.level)));
  }, [words]);

  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const progress = profile.wordsProgress[w.id];

      // Status check
      if (statusFilter === 'bookmarked' && !progress?.isBookmarked) return false;
      if (statusFilter === 'mastered' && progress?.status !== 'mastered') return false;
      if (statusFilter === 'learning' && progress?.status !== 'learning') return false;

      // Level check
      if (levelFilter !== 'all' && w.level !== levelFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = w.word.toLowerCase().includes(q);
        const matchesPhonetic = w.phonetic.toLowerCase().includes(q);
        const matchesMeaning = w.vietnameseMeaning.toLowerCase().includes(q);
        const matchesSino = w.sinoVietnamese?.toLowerCase().includes(q);
        if (!matchesWord && !matchesPhonetic && !matchesMeaning && !matchesSino) {
          return false;
        }
      }

      return true;
    });
  }, [words, profile, statusFilter, levelFilter, searchQuery]);

  const visibleWords = useMemo(() => {
    return filteredWords.slice(0, displayLimit);
  }, [filteredWords, displayLimit]);

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Sổ Tay Từ Vựng & Tra Cứu Tiêu Chuẩn
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Tra cứu toàn bộ {words.length.toLocaleString()} từ vựng chuẩn quốc tế, theo dõi tiến độ ghi nhớ cá nhân.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
            }`}
          >
            Hiển thị: <strong>{filteredWords.length}</strong> từ
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-3xl border shadow-sm space-y-3 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div
            className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus-within:border-orange-400 focus-within:bg-white'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Tra cứu từ vựng, phiên âm IPA, nghĩa tiếng Việt, chữ Hán..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium bg-transparent outline-none placeholder-slate-400"
            />
          </div>

          {/* Level Filter Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-2xl border text-xs font-bold outline-none cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <option value="all">Tất cả cấp bậc</option>
              {uniqueLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  Cấp độ {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-orange-500 text-white shadow-xs'
                : isDarkMode
                ? 'bg-slate-800 text-slate-400 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả từ ({words.length})
          </button>

          <button
            onClick={() => setStatusFilter('bookmarked')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              statusFilter === 'bookmarked'
                ? 'bg-orange-500 text-white shadow-xs'
                : isDarkMode
                ? 'bg-slate-800 text-slate-400 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Đã đánh dấu sao</span>
          </button>

          <button
            onClick={() => setStatusFilter('mastered')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              statusFilter === 'mastered'
                ? 'bg-orange-500 text-white shadow-xs'
                : isDarkMode
                ? 'bg-slate-800 text-slate-400 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Đã thuộc lòng</span>
          </button>

          <button
            onClick={() => setStatusFilter('learning')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'learning'
                ? 'bg-orange-500 text-white shadow-xs'
                : isDarkMode
                ? 'bg-slate-800 text-slate-400 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Đang học
          </button>
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {visibleWords.map((word) => {
          const progress = profile.wordsProgress[word.id];
          const isBookmarked = progress?.isBookmarked || false;
          const isMastered = progress?.status === 'mastered';

          return (
            <div
              key={word.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isDarkMode
                          ? 'bg-slate-800 text-slate-400 border-slate-700'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {word.level}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        isDarkMode
                          ? 'bg-slate-800 text-slate-400 border-slate-700'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {word.partOfSpeech}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(word.id)}
                    className={`p-1 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'text-amber-500 hover:text-amber-600'
                        : isDarkMode
                        ? 'text-slate-500 hover:text-slate-300'
                        : 'text-slate-400 hover:text-amber-500'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="flex items-baseline justify-between gap-2 mt-1">
                  <div className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {word.word}
                  </div>
                  <div className="text-xs font-mono font-bold text-orange-600">
                    {word.phonetic}
                  </div>
                </div>

                {word.sinoVietnamese && (
                  <div className="text-[11px] font-bold text-rose-600 mt-0.5">
                    Hán-Việt: {word.sinoVietnamese}
                  </div>
                )}

                <div className={`text-xs font-bold mt-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {word.vietnameseMeaning}
                </div>

                <div className={`text-[11px] italic mt-2 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  &ldquo;{word.example}&rdquo;
                </div>
              </div>

              {/* Bottom Quick Audio Buttons */}
              <div
                className={`pt-3 mt-3 border-t flex items-center justify-between ${
                  isDarkMode ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speak(word.word, word.language, 1.0)}
                    className="p-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-2xs"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenPronounce(word)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                    title="Luyện đọc với micro"
                  >
                    <Mic className="w-3.5 h-3.5 text-orange-500" />
                  </button>
                </div>

                {isMastered ? (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Thuộc lòng
                  </span>
                ) : (
                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Chưa thuộc
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {displayLimit < filteredWords.length && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setDisplayLimit((prev) => prev + 36)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-orange-50 hover:text-orange-600 shadow-2xs'
            }`}
          >
            <span>Tải thêm 36 từ vựng tiếp theo ({filteredWords.length - displayLimit} từ còn lại)</span>
          </button>
        </div>
      )}
    </div>
  );
};
