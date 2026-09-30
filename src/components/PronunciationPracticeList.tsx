import React, { useState, useMemo } from 'react';
import { Mic, Volume2, Award, Sparkles, CheckCircle2, ChevronRight, Play, Search, ArrowDown } from 'lucide-react';
import { VocabWord, LevelType, Language, UserProfileProgress } from '../types';
import { speak } from '../utils/speech';

interface PronunciationPracticeListProps {
  words: VocabWord[];
  currentLang: Language;
  currentLevel: LevelType;
  profile: UserProfileProgress;
  onOpenPronounce: (word: VocabWord) => void;
  isDarkMode?: boolean;
}

export const PronunciationPracticeList: React.FC<PronunciationPracticeListProps> = ({
  words,
  currentLang,
  currentLevel,
  profile,
  onOpenPronounce,
  isDarkMode = false,
}) => {
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(30);

  const levelWords = useMemo(() => {
    return words.filter((w) => w.level === currentLevel);
  }, [words, currentLevel]);

  const filteredWords = useMemo(() => {
    if (!searchQuery.trim()) return levelWords;
    const q = searchQuery.toLowerCase().trim();
    return levelWords.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.vietnameseMeaning.toLowerCase().includes(q) ||
        (w.sinoVietnamese && w.sinoVietnamese.toLowerCase().includes(q))
    );
  }, [levelWords, searchQuery]);

  const displayedWords = useMemo(() => {
    return filteredWords.slice(0, displayCount);
  }, [filteredWords, displayCount]);

  const handlePlay = (word: VocabWord, speed: number = 1.0) => {
    setPlayingWordId(word.id);
    speak(word.word, word.language, speed, () => {
      setPlayingWordId(null);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Intro Box */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-gradient-to-r from-indigo-50/70 via-sky-50/40 to-white border-indigo-200 text-slate-900'
        }`}
      >
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-800 text-xs font-bold">
            <Mic className="w-3.5 h-3.5" />
            <span>Phòng Luyện Phát Âm Trực Tuyến</span>
          </div>
          <h2 className="text-2xl font-black">
            Luyện Nghe Chuẩn & Nhắc Lại Bằng Giọng Nói
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Nghe phát âm chuẩn quốc tế từ từ điển Oxford/HSK, sau đó bật Micro để đọc lại. Hệ thống nhận diện giọng nói AI sẽ chấm điểm độ chính xác (0 - 100%) và phản hồi tức thì.
          </p>
        </div>

        <div
          className={`shrink-0 p-4 rounded-2xl border text-center shadow-xs ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className={`text-[11px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Cấp độ luyện tập
          </div>
          <div className="text-2xl font-black text-indigo-700 mt-0.5">
            {currentLevel}
          </div>
          <div className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {levelWords.length} từ vựng
          </div>
        </div>
      </div>

      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border w-full sm:w-80 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
          }`}
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Tìm nhanh từ cần luyện đọc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-transparent outline-none placeholder-slate-400"
          />
        </div>

        <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Hiển thị {displayedWords.length}/{filteredWords.length} từ
        </div>
      </div>

      {/* Word Cards for Pronunciation Practice */}
      <div className="space-y-3">
        {displayedWords.map((word) => {
          const progress = profile.wordsProgress[word.id];
          const bestScore = progress?.bestSpeechScore;
          const isPlaying = playingWordId === word.id;

          return (
            <div
              key={word.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              {/* Word info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {word.word}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50/60 px-2 py-0.5 rounded border border-indigo-200">
                    {word.phonetic}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {word.partOfSpeech}
                  </span>
                  {word.sinoVietnamese && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      Hán-Việt: {word.sinoVietnamese}
                    </span>
                  )}
                </div>

                <div className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {word.vietnameseMeaning}
                </div>

                <div className={`text-xs italic ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  &ldquo;{word.example}&rdquo;
                </div>
              </div>

              {/* Action Buttons & Score */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {bestScore !== undefined && bestScore > 0 ? (
                  <div
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                      bestScore >= 80
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : bestScore >= 50
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{bestScore}%</span>
                  </div>
                ) : (
                  <span className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Chưa đọc thử
                  </span>
                )}

                {/* Fast/Slow Listen */}
                <button
                  onClick={() => handlePlay(word, 1.0)}
                  disabled={isPlaying}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs"
                  title="Nghe phát âm chuẩn (1.0x)"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handlePlay(word, 0.75)}
                  disabled={isPlaying}
                  className={`px-2 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                  }`}
                  title="Nghe chậm (0.75x)"
                >
                  0.75x
                </button>

                {/* Open Micro Recording */}
                <button
                  onClick={() => onOpenPronounce(word)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-indigo-50/60 hover:bg-indigo-100 text-indigo-800 border border-indigo-200'
                  }`}
                >
                  <Mic className="w-4 h-4 text-indigo-700" />
                  <span>Luyện đọc lại</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {displayCount < filteredWords.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setDisplayCount((prev) => prev + 30)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 shadow-2xs'
            }`}
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Tải thêm 30 từ vựng tiếp theo ({filteredWords.length - displayCount} từ còn lại)</span>
          </button>
        </div>
      )}
    </div>
  );
};
