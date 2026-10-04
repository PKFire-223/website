import React, { useState, useMemo } from 'react';
import { Bookmark, X, Search, Volume2, ArrowRight, ExternalLink, Trash2 } from 'lucide-react';
import { VocabWord, Language, UserProfileProgress } from '../types';
import { speak } from '../utils/speech';

interface BookmarkedWordsDrawerProps {
  words: VocabWord[];
  profile: UserProfileProgress;
  onToggleBookmark: (wordId: string) => void;
  onJumpToWord: (word: VocabWord) => void;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  currentLang: Language;
}

export const BookmarkedWordsDrawer: React.FC<BookmarkedWordsDrawerProps> = ({
  words,
  profile,
  onToggleBookmark,
  onJumpToWord,
  isOpen,
  onClose,
  isDarkMode = false,
  currentLang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Find all words marked as bookmarked for the current language
  const bookmarkedWords = useMemo(() => {
    return words.filter((w) => {
      const progress = profile.wordsProgress[w.id];
      return progress?.isBookmarked;
    });
  }, [words, profile.wordsProgress]);

  // Filter bookmarked words by search query
  const filteredBookmarked = useMemo(() => {
    if (!searchQuery.trim()) return bookmarkedWords;
    const q = searchQuery.toLowerCase().trim();
    return bookmarkedWords.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.vietnameseMeaning.toLowerCase().includes(q) ||
        (w.sinoVietnamese && w.sinoVietnamese.toLowerCase().includes(q)) ||
        w.phonetic.toLowerCase().includes(q)
    );
  }, [bookmarkedWords, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`relative w-full max-w-md h-full flex flex-col shadow-2xl border-l z-10 transition-transform duration-300 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Bookmark className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold flex items-center gap-2">
                <span>Từ vựng đã đánh dấu</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">
                  {bookmarkedWords.length}
                </span>
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {currentLang === 'en' ? '🇬🇧 Tiếng Anh (Oxford/CEFR)' : '🇨🇳 Tiếng Trung (HSK)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDarkMode
                ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Đóng bảng từ đánh dấu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search inside Bookmarks */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Tìm trong các từ đã đánh dấu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 text-[10px]"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Bookmarked Words List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredBookmarked.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl">
                🔖
              </div>
              <h3 className="text-sm font-bold">
                {bookmarkedWords.length === 0
                  ? 'Chưa có từ vựng nào được đánh dấu'
                  : 'Không tìm thấy từ khớp với từ khóa'}
              </h3>
              <p className={`text-xs max-w-xs mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {bookmarkedWords.length === 0
                  ? 'Bấm vào biểu tượng Bookmark trên bất kỳ thẻ từ vựng nào để lưu lại và truy cập nhanh tại đây.'
                  : 'Hãy thử tìm kiếm với từ ngữ hoặc phiên âm khác.'}
              </p>
            </div>
          ) : (
            filteredBookmarked.map((word) => (
              <div
                key={word.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 group hover:shadow-md ${
                  isDarkMode
                    ? 'bg-slate-950/60 border-slate-800/80 hover:border-indigo-500/50'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20">
                        {word.level}
                      </span>
                      <span className="text-[10px] text-slate-500">{word.partOfSpeech}</span>
                      {word.sinoVietnamese && (
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                          Hán-Việt: {word.sinoVietnamese}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleBookmark(word.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                      title="Bỏ đánh dấu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <h4 className="text-base font-extrabold tracking-tight">{word.word}</h4>
                      <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                        {word.phonetic}
                      </p>
                    </div>

                    <button
                      onClick={() => speak(word.word, word.language)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                      title="Phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className={`text-xs mt-1.5 line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {word.vietnameseMeaning}
                  </p>
                </div>

                {/* Jump to Word Button */}
                <button
                  onClick={() => onJumpToWord(word)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all cursor-pointer shadow-2xs"
                >
                  <span>Nhảy tới vị trí từ vựng này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedWords.length > 0 && (
          <div
            className={`p-4 border-t text-xs text-center ${
              isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}
          >
            Bấm vào từ vựng để chuyển tới bài học và làm nổi bật từ vựng tức thì.
          </div>
        )}
      </div>
    </div>
  );
};
