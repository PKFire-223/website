import React, { useState, useEffect } from 'react';
import { Volume2, Rotate3d, ChevronLeft, ChevronRight, Check, X, Sparkles, BookOpen, Lightbulb, Mic } from 'lucide-react';
import { VocabWord, UserProfileProgress } from '../types';
import { speak } from '../utils/speech';
import { updateWordSrs } from '../utils/srs';

interface FlashcardModeProps {
  words: VocabWord[];
  profile: UserProfileProgress;
  onUpdateProfile: (updated: UserProfileProgress) => void;
  onOpenPronounce: (word: VocabWord) => void;
  isDarkMode?: boolean;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({
  words,
  profile,
  onUpdateProfile,
  onOpenPronounce,
  isDarkMode = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [slowAudio, setSlowAudio] = useState(false);

  const currentWord = words[currentIndex];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex, words]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (isFlipped) {
        if (e.key === '1') handleRate(1);
        if (e.key === '2') handleRate(2);
        if (e.key === '3') handleRate(3);
        if (e.key === '4') handleRate(4);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, words]);

  if (!currentWord) {
    return (
      <div className="text-center py-20 px-4">
        <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
          Không có từ vựng nào trong cấp bậc này. Vui lòng chọn cấp bậc khác.
        </p>
      </div>
    );
  }

  const handlePlayAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    speak(currentWord.word, currentWord.language, slowAudio ? 0.75 : 1.0);
  };

  const handlePlayExample = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    speak(currentWord.example, currentWord.language, 0.9);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(words.length - 1);
    }
  };

  const handleRate = (quality: 1 | 2 | 3 | 4) => {
    const currentProgress = profile.wordsProgress[currentWord.id];
    const updatedWordProgress = updateWordSrs(currentProgress, currentWord.id, quality);

    const updatedProfile: UserProfileProgress = {
      ...profile,
      todayLearnedCount: profile.todayLearnedCount + 1,
      wordsProgress: {
        ...profile.wordsProgress,
        [currentWord.id]: updatedWordProgress,
      },
    };

    onUpdateProfile(updatedProfile);
    handleNext();
  };

  const wordProgress = profile.wordsProgress[currentWord.id];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Top Controls & Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
              isDarkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-orange-50 text-orange-700 border-orange-200'
            }`}
          >
            {currentWord.level}
          </span>
          <span
            className={`text-xs font-semibold ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {currentWord.unit}
          </span>
        </div>

        <div
          className={`text-xs font-mono font-bold ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Thẻ {currentIndex + 1} / {words.length}
        </div>
      </div>

      {/* Progress Bar Line */}
      <div
        className={`w-full h-2 rounded-full overflow-hidden mb-6 ${
          isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
        }`}
      >
        <div
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative min-h-[380px] sm:min-h-[420px] cursor-pointer select-none rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between group shadow-xl ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
            : 'bg-white border-slate-200 hover:border-orange-400 hover:shadow-2xl'
        }`}
      >
        {/* Flip Hint */}
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 font-mono">
            {wordProgress?.status === 'mastered' ? (
              <span className="text-emerald-600 font-bold">● Đã thành thạo</span>
            ) : wordProgress?.status === 'learning' ? (
              <span className="text-amber-600 font-bold">● Đang học</span>
            ) : (
              <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>○ Từ mới</span>
            )}
          </span>

          <span
            className={`flex items-center gap-1 font-semibold transition-colors ${
              isDarkMode ? 'text-slate-400 group-hover:text-orange-400' : 'text-slate-500 group-hover:text-orange-600'
            }`}
          >
            <Rotate3d className="w-4 h-4" />
            <span>Nhấn hoặc gõ Phím Cách để lật</span>
          </span>
        </div>

        {/* Card Content: Front vs Back */}
        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="my-auto text-center space-y-4 py-8">
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                isDarkMode
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {currentWord.partOfSpeech}
            </div>

            <div
              className={`text-4xl sm:text-5xl font-black tracking-wide ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {currentWord.word}
            </div>

            <div className="text-xl sm:text-2xl font-mono font-bold text-orange-600">
              {currentWord.phonetic}
            </div>

            {currentWord.sinoVietnamese && (
              <div
                className={`text-sm font-bold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Hán-Việt:{' '}
                <span className="text-rose-600 font-extrabold">{currentWord.sinoVietnamese}</span>
              </div>
            )}

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handlePlayAudio}
                className="p-3.5 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-md active:scale-95"
                title="Phát âm chuẩn giọng bản xứ"
              >
                <Volume2 className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPronounce(currentWord);
                }}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${
                  isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 text-slate-800 border-slate-200 shadow-2xs'
                }`}
                title="Luyện đọc bằng giọng nói của bạn"
              >
                <Mic className="w-4 h-4 text-orange-500" />
                <span>Luyện đọc với Micro</span>
              </button>
            </div>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="my-auto space-y-4 py-4 text-left">
            <div>
              <span
                className={`text-xs uppercase tracking-wider font-bold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Nghĩa Tiếng Việt:
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-orange-600 mt-1">
                {currentWord.vietnameseMeaning}
              </h3>
            </div>

            {/* Example sentence */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                isDarkMode
                  ? 'bg-slate-950/80 border-slate-800 text-slate-200'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Câu ví dụ thực tế:
                </span>
                <button
                  onClick={handlePlayExample}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-orange-600'
                  }`}
                  title="Nghe câu ví dụ"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm sm:text-base font-semibold italic leading-relaxed">
                &ldquo;{currentWord.example}&rdquo;
              </p>

              {currentWord.examplePhonetic && (
                <p className="text-xs font-mono font-bold text-amber-600">
                  {currentWord.examplePhonetic}
                </p>
              )}

              <p
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {currentWord.exampleMeaning}
              </p>
            </div>

            {/* Collocations & Mnemonic Tip */}
            {currentWord.collocations && currentWord.collocations.length > 0 && (
              <div
                className={`text-xs ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span className="font-bold">Cụm từ hay gặp: </span>
                <span className="font-mono text-orange-600">{currentWord.collocations.join(' • ')}</span>
              </div>
            )}

            {currentWord.mnemonicTip && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                  isDarkMode
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Mẹo nhớ:</strong> {currentWord.mnemonicTip}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Footer Hint inside Card */}
        <div
          className={`pt-4 border-t flex items-center justify-between text-[11px] ${
            isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'
          }`}
        >
          <span>Thẻ SRS thông minh</span>
          <span>Dùng phím 1 - 4 để đánh giá độ nhớ</span>
        </div>
      </div>

      {/* SRS Rating Actions (Only show when flipped) */}
      {isFlipped ? (
        <div className="mt-6 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div
            className={`text-center text-xs font-bold ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Bạn ghi nhớ từ này như thế nào? (Hệ thống SM-2 sẽ lên lịch ôn)
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => handleRate(1)}
              className="py-3 px-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex flex-col items-center gap-1 transition-all shadow-xs"
            >
              <span>1. Chưa nhớ</span>
              <span className="text-[10px] font-normal opacity-80">Ôn lại ngay</span>
            </button>

            <button
              onClick={() => handleRate(2)}
              className="py-3 px-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-bold text-xs flex flex-col items-center gap-1 transition-all shadow-xs"
            >
              <span>2. Hơi khó</span>
              <span className="text-[10px] font-normal opacity-80">Sau 1 ngày</span>
            </button>

            <button
              onClick={() => handleRate(3)}
              className="py-3 px-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs flex flex-col items-center gap-1 transition-all shadow-xs"
            >
              <span>3. Khá tốt</span>
              <span className="text-[10px] font-normal opacity-80">Sau 3 ngày</span>
            </button>

            <button
              onClick={() => handleRate(4)}
              className="py-3 px-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs flex flex-col items-center gap-1 transition-all shadow-xs"
            >
              <span>4. Rất dễ</span>
              <span className="text-[10px] font-normal opacity-80">Sau 6 ngày</span>
            </button>
          </div>
        </div>
      ) : (
        /* Prev / Next Bottom Controls */
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1 transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Thẻ trước</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md shadow-orange-500/20"
          >
            <span>Thẻ tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
