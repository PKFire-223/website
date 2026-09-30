import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
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

type ExerciseType = 'multiple-choice' | 'audio-quiz' | 'matching';

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

  // Matching game state
  const [matchingCards, setMatchingCards] = useState<{ id: string; text: string; type: 'word' | 'meaning'; pairId: string }[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{ id: string; type: 'word' | 'meaning'; pairId: string } | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Setup options for current question
  const currentWord = words[currentIndex];

  const questionOptions = React.useMemo(() => {
    if (!currentWord) return [];
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

  // Initialize matching game
  useEffect(() => {
    if (exerciseType === 'matching') {
      const sample = [...words].sort(() => 0.5 - Math.random()).slice(0, 4);
      const cards: { id: string; text: string; type: 'word' | 'meaning'; pairId: string }[] = [];

      sample.forEach((w) => {
        cards.push({ id: `word-${w.id}`, text: w.word, type: 'word', pairId: w.id });
        cards.push({ id: `mean-${w.id}`, text: w.vietnameseMeaning, type: 'meaning', pairId: w.id });
      });

      setMatchingCards(cards.sort(() => 0.5 - Math.random()));
      setSelectedMatch(null);
      setMatchedPairs([]);
      setIsCompleted(false);
    } else {
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setScore(0);
      setIsCompleted(false);
    }
  }, [exerciseType, words]);

  if (!currentWord && exerciseType !== 'matching') {
    return (
      <div className="text-center py-20 px-4">
        <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
          Không có từ vựng để ôn tập trong danh mục này.
        </p>
      </div>
    );
  }

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
      // Update SRS
      const currentProgress = profile.wordsProgress[currentWord.id];
      const updated = updateWordSrs(currentProgress, currentWord.id, 4);
      onUpdateProfile({
        ...profile,
        todayLearnedCount: profile.todayLearnedCount + 1,
        wordsProgress: {
          ...profile.wordsProgress,
          [currentWord.id]: updated,
        },
      });
    } else {
      // Wrong answer SRS penalty
      const currentProgress = profile.wordsProgress[currentWord.id];
      const updated = updateWordSrs(currentProgress, currentWord.id, 1);
      onUpdateProfile({
        ...profile,
        wordsProgress: {
          ...profile.wordsProgress,
          [currentWord.id]: updated,
        },
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

  // Card click for matching game
  const handleCardClick = (card: { id: string; text: string; type: 'word' | 'meaning'; pairId: string }) => {
    if (matchedPairs.includes(card.pairId)) return;

    if (!selectedMatch) {
      setSelectedMatch(card);
    } else if (selectedMatch.id === card.id) {
      setSelectedMatch(null);
    } else {
      if (selectedMatch.type !== card.type && selectedMatch.pairId === card.pairId) {
        // Matched!
        const newMatched = [...matchedPairs, card.pairId];
        setMatchedPairs(newMatched);
        setSelectedMatch(null);

        if (newMatched.length === 4) {
          setIsCompleted(true);
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        // Wrong match
        setSelectedMatch(card);
      }
    }
  };

  const restartQuiz = () => {
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
  };

  const totalQuestions = Math.min(words.length, 10);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Exercise Mode Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
        <button
          onClick={() => setExerciseType('multiple-choice')}
          className={`px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
            exerciseType === 'multiple-choice'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-1 ring-indigo-500'
              : isDarkMode
              ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}
        >
          Trắc Nghiệm 4 Đáp Án
        </button>

        <button
          onClick={() => setExerciseType('audio-quiz')}
          className={`px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
            exerciseType === 'audio-quiz'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-1 ring-indigo-500'
              : isDarkMode
              ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}
        >
          Luyện Nghe Đoán Từ
        </button>

        <button
          onClick={() => setExerciseType('matching')}
          className={`col-span-2 sm:col-span-1 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
            exerciseType === 'matching'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-1 ring-indigo-500'
              : isDarkMode
              ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}
        >
          Ghép Cặp Từ - Nghĩa
        </button>
      </div>

      {isCompleted ? (
        /* Result Completion Screen */
        <div
          className={`p-8 rounded-3xl border text-center shadow-xl space-y-6 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black">Hoàn Thành Bài Ôn Luyện!</h3>
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
                {score} / {totalQuestions}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                ({Math.round((score / totalQuestions) * 100)}% chính xác)
              </div>
            </div>
          )}

          <div>
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ôn tập lại lượt mới</span>
            </button>
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
                  className={`min-h-[90px] p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center font-bold text-sm ${
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
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs">
            <span className={`font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Câu {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="font-bold text-emerald-600">
              Điểm: {score}
            </span>
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
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
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
                    className="p-4 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-transform active:scale-95 inline-flex items-center gap-2"
                  >
                    <Volume2 className="w-6 h-6" />
                    <span className="text-xs font-bold">Nghe phát âm</span>
                  </button>
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Gợi ý nghĩa: <span className="font-bold text-indigo-700">{currentWord.vietnameseMeaning}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Từ này có nghĩa tiếng Việt là gì?
                </span>
                <div className={`text-3xl sm:text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentWord.word}
                </div>
                <div className="text-sm font-mono font-bold text-indigo-700">
                  {currentWord.phonetic}
                </div>
              </div>
            )}
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questionOptions.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let buttonStyle = isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/20 shadow-sm';

              if (isAnswerChecked) {
                if (opt.isCorrect) {
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  buttonStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500 font-bold';
                } else {
                  buttonStyle = 'opacity-40 border-slate-200';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-indigo-50/60 border-indigo-500 text-indigo-800 ring-2 ring-indigo-500 shadow-md';
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                >
                  <span>{opt.text}</span>
                  {isAnswerChecked && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerChecked && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Check or Next */}
          <div className="pt-2">
            {!isAnswerChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheckAnswer}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20"
              >
                Kiểm tra đáp án
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
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
