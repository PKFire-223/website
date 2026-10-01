import React, { useState } from 'react';
import { Volume2, Mic, Bookmark, Check, BookOpen, Sparkles, Lightbulb, ChevronDown, ChevronUp, Search } from 'lucide-react';
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
}) => {
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter words by selected level and search
  const filteredWords = words
    .filter((w) => w.level === currentLevel)
    .filter((w) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        w.word.toLowerCase().includes(q) ||
        w.vietnameseMeaning.toLowerCase().includes(q) ||
        (w.sinoVietnamese && w.sinoVietnamese.toLowerCase().includes(q)) ||
        w.phonetic.toLowerCase().includes(q)
      );
    });

  // Group by Unit
  const unitsMap = filteredWords.reduce((acc, word) => {
    if (!acc[word.unit]) {
      acc[word.unit] = [];
    }
    acc[word.unit].push(word);
    return acc;
  }, {} as Record<string, VocabWord[]>);

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
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                CHUYÊN GIA NGÔN NGỮ
              </span>
              <span
                className={`text-xs font-semibold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Kho từ vựng chuyên sâu &gt; 5.000 từ chuẩn quốc tế (Oxford / HSK)
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
            {filteredWords.length} từ ở cấp này
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
                className={`p-4 rounded-2xl border text-left transition-all ${
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
                      isSelected ? 'text-indigo-700' : isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {lvl.id}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-800'
                        : isDarkMode
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {lvlWords.length} từ
                  </span>
                </div>
                <div
                  className={`text-xs font-bold mt-1.5 line-clamp-1 ${
                    isSelected ? 'text-indigo-950 font-extrabold' : isDarkMode ? 'text-slate-200' : 'text-slate-800'
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
                <div className="mt-2.5 w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
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

                return (
                  <div
                    key={word.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all group ${
                      isDarkMode
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
                            className={`p-1.5 rounded-lg transition-colors ${
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

                      {/* Main Word & Phonetic */}
                      <div className="flex items-baseline justify-between gap-3 mt-1 flex-wrap">
                        <div
                          className={`text-2xl font-black transition-colors ${
                            isDarkMode
                              ? 'text-white group-hover:text-indigo-400'
                              : 'text-slate-900 group-hover:text-indigo-700'
                          }`}
                        >
                          {word.word}
                        </div>

                        {/* Phonetics & Standards */}
                        {word.language === 'en' ? (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {word.phoneticUk && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speak(word.word, 'en', 1.0, undefined, 'uk');
                                }}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 hover:bg-indigo-100 cursor-pointer"
                                title="Phát âm chuẩn Anh - Anh (UK - Oxford)"
                              >
                                <span className="text-[10px]">🇬🇧</span>
                                <span>{word.phoneticUk}</span>
                              </button>
                            )}
                            {word.phoneticUs && word.phoneticUs !== word.phoneticUk && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speak(word.word, 'en', 1.0, undefined, 'us');
                                }}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-sky-50/80 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/80 hover:bg-sky-100 cursor-pointer"
                                title="Phát âm chuẩn Anh - Mỹ (US)"
                              >
                                <span className="text-[10px]">🇺🇸</span>
                                <span>{word.phoneticUs}</span>
                              </button>
                            )}
                            {!word.phoneticUk && !word.phoneticUs && (
                              <div className="text-sm font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                                {word.phonetic}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            {word.sinoVietnamese && (
                              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                                Hán-Việt: {word.sinoVietnamese}
                              </span>
                            )}
                            <div className="text-sm font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                              {word.phonetic}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Vietnamese Meaning */}
                      <p
                        className={`mt-2 text-sm font-bold ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {word.vietnameseMeaning}
                      </p>

                      {/* Pronounce & Listen Toolbar */}
                      <div className="mt-3.5 flex items-center gap-2 flex-wrap">
                        {word.language === 'en' ? (
                          <>
                            <button
                              onClick={() => speak(word.word, 'en', 1.0, undefined, 'uk')}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
                              title="Nghe phát âm chuẩn giọng Anh (UK Oxford)"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>🇬🇧 UK</span>
                            </button>
                            <button
                              onClick={() => speak(word.word, 'en', 1.0, undefined, 'us')}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-600 text-white hover:bg-sky-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
                              title="Nghe phát âm chuẩn giọng Mỹ (US)"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>🇺🇸 US</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => speak(word.word, word.language, 1.0)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
                            title="Phát âm chuẩn tiếng Phổ thông (普通话)"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe đọc</span>
                          </button>
                        )}

                        <button
                          onClick={() => speak(word.word, word.language, 0.75)}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                            isDarkMode
                              ? 'bg-slate-800 text-slate-300 hover:text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                          title="Phát âm chậm rõ từng âm (0.75x)"
                        >
                          0.75x
                        </button>

                        <button
                          onClick={() => onOpenPronounce(word)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ml-auto cursor-pointer ${
                            isDarkMode
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              : 'bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 border border-slate-200 text-slate-700'
                          }`}
                          title="Luyện đọc bằng Micro với AI chấm điểm"
                        >
                          <Mic className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Luyện đọc lại</span>
                        </button>
                      </div>

                      {/* Example sentence */}
                      <div
                        className={`mt-3.5 p-3 rounded-xl border text-xs ${
                          isDarkMode
                            ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                            : 'bg-slate-50 border-slate-200/90 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[10px] uppercase tracking-wider text-indigo-700">
                            Ví dụ thực tế:
                          </span>
                          <button
                            onClick={() => speak(word.example, word.language, 0.9)}
                            className="p-1 rounded hover:text-indigo-600 transition-colors"
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
                              <span className="font-mono text-indigo-800">
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
                        className={`inline-flex items-center gap-1 text-[11px] font-bold transition-colors ${
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
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          isMastered
                            ? 'bg-emerald-100 text-emerald-800'
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
    </div>
  );
};
