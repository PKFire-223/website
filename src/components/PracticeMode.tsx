import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Headphones,
  Zap,
  Timer,
  Lightbulb,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabWord, UserProfileProgress } from '../types';
import { speak } from '../utils/speech';
import { updateWordSrs } from '../utils/srs';

interface PracticeModeProps {
  words: VocabWord[];
  profile: UserProfileProgress;
  onUpdateProfile: (updated: UserProfileProgress) => void;
  isDarkMode?: boolean;
}

type ExerciseType = 'multiple-choice' | 'audio-quiz' | 'dictation' | 'speed' | 'matching';

export const PracticeMode: React.FC<PracticeModeProps> = ({
  words,
  profile,
  onUpdateProfile,
  isDarkMode = false,
}) => {
  const [exerciseType, setExerciseType] = useState<ExerciseType>('multiple-choice');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Dictation state
  const [dictationInput, setDictationInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Speed Challenge state
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSpeedRunning, setIsSpeedRunning] = useState(false);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Matching game state
  const [matchingCards, setMatchingCards] = useState<{ id: string; text: string; type: 'word' | 'meaning'; pairId: string }[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{ id: string; type: 'word' | 'meaning'; pairId: string } | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Current question word
  const currentWord = words[currentIndex % Math.max(1, words.length)];

  // Options for multiple-choice & audio-quiz
  const questionOptions = React.useMemo(() => {
    if (!currentWord || words.length === 0) return [];
    const wrongOptions = words
      .filter((w) => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((w) => ({
        id: w.id,
        text: exerciseType === 'audio-quiz' ? w.word : w.vietnameseMeaning,
        isCorrect: false,
      }));

    const correctOption = {
      id: currentWord.id,
      text: exerciseType === 'audio-quiz' ? currentWord.word : currentWord.vietnameseMeaning,
      isCorrect: true,
    };

    return [...wrongOptions, correctOption].sort(() => 0.5 - Math.random());
  }, [currentWord, exerciseType, words]);

  // Mode reset
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSpeedRunning(false);
    setTimeLeft(60);
    setCombo(0);
    setDictationInput('');
    setShowHint(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsCompleted(false);

    if (exerciseType === 'matching') {
      const sample = [...words].sort(() => 0.5 - Math.random()).slice(0, 4);
      const cards: { id: string; text: string; type: 'word' | 'meaning'; pairId: string }[] = [];
      sample.forEach((w) => {
        cards.push({ id: `word-${w.id}`, text: w.word, type: 'word', pairId: w.id });
        cards.push({ id: `mean-${w.id}`, text: w.vietnameseMeaning, type: 'meaning', pairId: w.id });
      });
      setMatchingCards(cards.sort(() => 0.5 - Math.random()));
      setMatchedPairs([]);
      setSelectedMatch(null);
    }
  }, [exerciseType, words]);

  // Speed Challenge Timer
  useEffect(() => {
    if (exerciseType === 'speed' && isSpeedRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsSpeedRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exerciseType, isSpeedRunning]);

  // Automatically speak audio in audio-quiz or dictation when question changes
  useEffect(() => {
    if ((exerciseType === 'audio-quiz' || exerciseType === 'dictation') && currentWord && !isCompleted) {
      speak(currentWord.word, currentWord.language, 1.0);
    }
  }, [currentIndex, exerciseType]);

  if (!currentWord && words.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
          Không có từ vựng để ôn tập trong danh mục này.
        </p>
      </div>
    );
  }

  // --- Handlers for Multiple Choice & Audio Quiz ---
  const handleSelectOption = (optionId: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === currentWord.id;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      const cur = profile.wordsProgress[currentWord.id];
      const updated = updateWordSrs(cur, currentWord.id, 4);
      onUpdateProfile({
        ...profile,
        todayLearnedCount: profile.todayLearnedCount + 1,
        wordsProgress: { ...profile.wordsProgress, [currentWord.id]: updated },
      });
    } else {
      const cur = profile.wordsProgress[currentWord.id];
      const updated = updateWordSrs(cur, currentWord.id, 1);
      onUpdateProfile({
        ...profile,
        wordsProgress: { ...profile.wordsProgress, [currentWord.id]: updated },
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < Math.min(words.length, 10) - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  // --- Handlers for Dictation (Nghe & Gõ Từ) ---
  const handleCheckDictation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!dictationInput.trim() || isAnswerChecked) return;

    setIsAnswerChecked(true);
    const cleanedInput = dictationInput.trim().toLowerCase();
    const targetWord = currentWord.word.trim().toLowerCase();
    const isCorrect = cleanedInput === targetWord;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      const cur = profile.wordsProgress[currentWord.id];
      const updated = updateWordSrs(cur, currentWord.id, 4);
      onUpdateProfile({
        ...profile,
        todayLearnedCount: profile.todayLearnedCount + 1,
        wordsProgress: { ...profile.wordsProgress, [currentWord.id]: updated },
      });
    }
  };

  const handleNextDictation = () => {
    if (currentIndex < Math.min(words.length, 10) - 1) {
      setCurrentIndex((prev) => prev + 1);
      setDictationInput('');
      setIsAnswerChecked(false);
      setShowHint(false);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  // --- Handlers for Speed Challenge ---
  const startSpeedGame = () => {
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setCurrentIndex(0);
    setIsCompleted(false);
    setIsSpeedRunning(true);
  };

  const handleSpeedAnswer = (optionId: string) => {
    if (!isSpeedRunning) return;
    const isCorrect = optionId === currentWord.id;

    if (isCorrect) {
      const points = 1 + Math.floor(combo / 3);
      setScore((prev) => {
        const nextScore = prev + points;
        if (nextScore > highScore) setHighScore(nextScore);
        return nextScore;
      });
      setCombo((c) => c + 1);
    } else {
      setCombo(0);
    }

    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  // --- Handlers for Matching Game ---
  const handleCardClick = (card: { id: string; text: string; type: 'word' | 'meaning'; pairId: string }) => {
    if (matchedPairs.includes(card.pairId)) return;

    if (!selectedMatch) {
      setSelectedMatch(card);
    } else {
      if (selectedMatch.id === card.id) {
        setSelectedMatch(null);
      } else if (selectedMatch.type === card.type) {
        setSelectedMatch(card);
      } else {
        if (selectedMatch.pairId === card.pairId) {
          const newMatched = [...matchedPairs, card.pairId];
          setMatchedPairs(newMatched);
          setSelectedMatch(null);

          if (newMatched.length === 4) {
            setIsCompleted(true);
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          }
        } else {
          setSelectedMatch(card);
        }
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCompleted(false);
    setDictationInput('');
    setShowHint(false);

    if (exerciseType === 'matching') {
      const sample = [...words].sort(() => 0.5 - Math.random()).slice(0, 4);
      const cards: { id: string; text: string; type: 'word' | 'meaning'; pairId: string }[] = [];
      sample.forEach((w) => {
        cards.push({ id: `word-${w.id}`, text: w.word, type: 'word', pairId: w.id });
        cards.push({ id: `mean-${w.id}`, text: w.vietnameseMeaning, type: 'meaning', pairId: w.id });
      });
      setMatchingCards(cards.sort(() => 0.5 - Math.random()));
      setMatchedPairs([]);
      setSelectedMatch(null);
    } else if (exerciseType === 'speed') {
      startSpeedGame();
    }
  };

  const totalQuestions = Math.min(words.length, 10);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Exercise Mode Selector (5 modes) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
        {[
          { id: 'multiple-choice', label: 'Trắc nghiệm 4', icon: CheckCircle2 },
          { id: 'audio-quiz', label: 'Nghe đoán từ', icon: Headphones },
          { id: 'dictation', label: 'Nghe & gõ từ', icon: Lightbulb },
          { id: 'speed', label: 'Tốc độ 60s', icon: Zap },
          { id: 'matching', label: 'Ghép cặp', icon: Sparkles },
        ].map((mode) => {
          const isSelected = exerciseType === mode.id;
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setExerciseType(mode.id as ExerciseType)}
              className={`p-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-1 ring-indigo-500'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {isCompleted ? (
        /* Result Screen */
        <div
          className={`p-8 rounded-3xl border text-center shadow-xl space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black">Hoàn Thành Thử Thách!</h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Bạn đã ôn luyện xuất sắc các từ vựng tiêu chuẩn quốc tế.
            </p>
          </div>

          {exerciseType !== 'matching' && (
            <div
              className={`py-4 px-6 rounded-2xl border inline-block ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Kết quả đạt được:
              </div>
              <div className="text-4xl font-black text-emerald-600 mt-1">
                {exerciseType === 'speed' ? `${score} điểm` : `${score} / ${totalQuestions}`}
              </div>
              {exerciseType !== 'speed' && (
                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                  ({Math.round((score / totalQuestions) * 100)}% chính xác)
                </div>
              )}
            </div>
          )}

          <div>
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại lượt mới</span>
            </button>
          </div>
        </div>
      ) : exerciseType === 'speed' ? (
        /* Speed Blitz 60s Mode */
        <div className="space-y-6">
          {!isSpeedRunning ? (
            <div
              className={`p-8 rounded-3xl border text-center space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 font-black flex items-center justify-center mx-auto text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-black">Thử Thách Tốc Độ 60 Giây</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Kiểm tra phản xạ từ vựng cực nhanh! Trả lời đúng liên tục để nhân đôi điểm số combo.
                Kỷ lục hiện tại: <strong>{highScore} điểm</strong>.
              </p>
              <button
                onClick={startSpeedGame}
                className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                Bắt Đầu Đếm Ngược 60s
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Header: Timer & Combo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  <Timer className="w-4 h-4" />
                  <span className="font-mono text-lg">{timeLeft}s</span>
                </div>

                <div className="flex items-center gap-3">
                  {combo > 1 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs animate-bounce">
                      Combo x{combo}!
                    </span>
                  )}
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                    Điểm: <strong className="text-emerald-600 text-base">{score}</strong>
                  </span>
                </div>
              </div>

              {/* Speed Question Card */}
              <div
                className={`p-6 rounded-3xl border text-center shadow-md ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-xs font-mono text-indigo-600 font-bold mb-1">{currentWord.phonetic}</div>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                  {currentWord.word}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questionOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSpeedAnswer(opt.id)}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 font-semibold text-xs sm:text-sm transition-all text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : exerciseType === 'dictation' ? (
        /* Listening Dictation Mode */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className={`font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Câu {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="font-bold text-emerald-600">Đúng: {score}</span>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-md text-center space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 mb-2">
              <button
                onClick={() => speak(currentWord.word, currentWord.language, 1.0)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-7 h-7" />
                <span className="text-xs font-bold">Bấm nghe lại</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Từ loại: <strong>{currentWord.partOfSpeech}</strong> &bull; Nghĩa: <em>&quot;{currentWord.vietnameseMeaning}&quot;</em>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCheckDictation} className="max-w-md mx-auto space-y-3 pt-2">
              <input
                type="text"
                autoFocus
                placeholder="Gõ từ bạn vừa nghe được vào đây..."
                value={dictationInput}
                disabled={isAnswerChecked}
                onChange={(e) => setDictationInput(e.target.value)}
                className={`w-full p-4 rounded-2xl border text-center text-lg font-bold outline-none transition-all ${
                  isAnswerChecked
                    ? dictationInput.trim().toLowerCase() === currentWord.word.trim().toLowerCase()
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-indigo-400'
                }`}
              />

              {showHint && !isAnswerChecked && (
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                  Gợi ý: Bắt đầu bằng chữ &quot;<strong>{currentWord.word[0].toUpperCase()}</strong>&quot; ({currentWord.word.length} chữ cái)
                </div>
              )}

              <div className="flex items-center justify-center gap-2 pt-2">
                {!isAnswerChecked ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                      Gợi ý
                    </button>
                    <button
                      type="submit"
                      disabled={!dictationInput.trim()}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                    >
                      Kiểm tra chính tả
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextDictation}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {isAnswerChecked && (
              <div className="pt-2 text-xs">
                {dictationInput.trim().toLowerCase() === currentWord.word.trim().toLowerCase() ? (
                  <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Chính xác 100%!
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold">
                    Đáp án đúng là: <strong>{currentWord.word}</strong> ({currentWord.phonetic})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ) : exerciseType === 'matching' ? (
        /* Matching Game */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600 font-semibold'}>
              Nhấn chọn 1 thẻ từ và 1 thẻ nghĩa tiếng Việt tương ứng:
            </span>
            <span className="font-mono font-bold text-indigo-700">
              Đã ghép: {matchedPairs.length} / 4 cặp
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {matchingCards.map((card) => {
              const isMatched = matchedPairs.includes(card.pairId);
              const isSelected = selectedMatch?.id === card.id;

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleCardClick(card)}
                  className={`min-h-[90px] p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center font-bold text-sm cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 line-through'
                      : isSelected
                      ? 'bg-indigo-50/60 border-indigo-500 text-indigo-800 ring-2 ring-indigo-500 shadow-md'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/20 shadow-sm'
                  }`}
                >
                  <span className={card.type === 'word' ? 'text-lg font-black' : 'text-xs font-semibold'}>
                    {card.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Multiple Choice & Audio Quiz */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className={`font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Câu {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="font-bold text-emerald-600">Điểm: {score}</span>
          </div>

          {/* Progress Bar */}
          <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div
            className={`p-6 rounded-3xl border shadow-md text-center space-y-3 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {exerciseType === 'audio-quiz' ? (
              <div className="space-y-3 py-4">
                <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Nhấn loa để nghe và chọn từ chính xác:
                </span>
                <div>
                  <button
                    onClick={() => speak(currentWord.word, currentWord.language, 1.0)}
                    className="p-4 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-transform active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Volume2 className="w-6 h-6" />
                    <span className="text-xs font-bold">Nghe phát âm</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {currentWord.partOfSpeech}
                </span>
                <h4 className="text-3xl font-black mt-2 text-slate-900 dark:text-white">
                  {currentWord.word}
                </h4>
                <div className="text-xs font-mono text-slate-400 mt-1">{currentWord.phonetic}</div>
              </div>
            )}
          </div>

          {/* 4 Choices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questionOptions.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let buttonStyle = isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 shadow-sm';

              if (isAnswerChecked) {
                if (opt.id === currentWord.id) {
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500';
                } else if (isSelected) {
                  buttonStyle = 'bg-rose-50 border-rose-500 text-rose-800 line-through';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-indigo-50/60 border-indigo-500 text-indigo-800 ring-2 ring-indigo-500 shadow-md';
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${buttonStyle}`}
                >
                  <span>{opt.text}</span>
                  {isAnswerChecked && opt.id === currentWord.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                  {isAnswerChecked && isSelected && opt.id !== currentWord.id && (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex justify-end pt-2">
            {!isAnswerChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheckAnswer}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-40 transition-all cursor-pointer"
              >
                Kiểm tra kết quả
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
