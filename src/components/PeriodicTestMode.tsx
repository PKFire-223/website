import React, { useState, useEffect } from 'react';
import { Award, Clock, AlertTriangle, CheckCircle2, XCircle, RotateCcw, Volume2, ShieldCheck, ChevronRight, BarChart2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabWord, UserProfileProgress, PeriodicTestRecord, LevelType } from '../types';
import { speak } from '../utils/speech';
import { updateWordSrs } from '../utils/srs';

interface PeriodicTestModeProps {
  words: VocabWord[];
  profile: UserProfileProgress;
  currentLevel: LevelType;
  onUpdateProfile: (updated: UserProfileProgress) => void;
  isDarkMode?: boolean;
}

export const PeriodicTestMode: React.FC<PeriodicTestModeProps> = ({
  words,
  profile,
  currentLevel,
  onUpdateProfile,
  isDarkMode = false,
}) => {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testWords, setTestWords] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [testResult, setTestResult] = useState<PeriodicTestRecord | null>(null);

  // Filter words belonging to current level or general pool
  const eligibleWords = React.useMemo(() => {
    const matched = words.filter((w) => w.level === currentLevel);
    return matched.length >= 4 ? matched : words;
  }, [words, currentLevel]);

  // Start test
  const handleStartTest = () => {
    const shuffled = [...eligibleWords].sort(() => 0.5 - Math.random()).slice(0, 10);
    setTestWords(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedOption(null);
    setTimeRemaining(300);
    setTestResult(null);
    setIsTestStarted(true);
  };

  // Timer countdown
  useEffect(() => {
    if (!isTestStarted || testResult) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestStarted, testResult]);

  const currentWord = testWords[currentIndex];

  // Options for current question
  const questionOptions = React.useMemo(() => {
    if (!currentWord) return [];
    const wrong = eligibleWords
      .filter((w) => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((w) => ({
        id: w.id,
        text: w.vietnameseMeaning,
        isCorrect: false,
      }));

    const correct = {
      id: currentWord.id,
      text: currentWord.vietnameseMeaning,
      isCorrect: true,
    };

    return [...wrong, correct].sort(() => 0.5 - Math.random());
  }, [currentWord, eligibleWords]);

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < testWords.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(userAnswers[nextIdx] || null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSelectedOption(userAnswers[prevIdx] || null);
    }
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    const wrongIds: string[] = [];

    testWords.forEach((w, idx) => {
      const chosen = userAnswers[idx];
      if (chosen === w.id) {
        correctCount += 1;
      } else {
        wrongIds.push(w.id);
      }
    });

    const percentage = Math.round((correctCount / testWords.length) * 100);
    const passed = percentage >= 70;

    const record: PeriodicTestRecord = {
      id: `test-${Date.now()}`,
      date: Date.now(),
      language: testWords[0]?.language || 'en',
      level: currentLevel,
      score: correctCount,
      total: testWords.length,
      percentage,
      timeSpentSeconds: 300 - timeRemaining,
      passed,
      wrongWordIds: wrongIds,
    };

    setTestResult(record);

    // Save to profile history
    onUpdateProfile({
      ...profile,
      testHistory: [record, ...profile.testHistory],
    });

    if (passed) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Intro or Active Test or Result */}
      {!isTestStarted ? (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-100 text-orange-700 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kiểm Tra Định Kỳ Tiêu Chuẩn</span>
              </div>
              <h2 className="text-2xl font-black">
                Bài Đánh Giá Năng Lực Cấp {currentLevel}
              </h2>
              <p className={`text-xs sm:text-sm max-w-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Gồm 10 câu hỏi trắc nghiệm kiểm tra độ nhớ từ vựng, khả năng nhận diện nghĩa và phiên âm theo chuẩn quốc tế. Thời gian làm bài tối đa 5 phút.
              </p>
            </div>

            <div className="shrink-0 text-center space-y-2">
              <button
                onClick={handleStartTest}
                className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-md shadow-orange-500/20 active:scale-95"
              >
                Bắt đầu làm bài thi
              </button>
              <div className={`text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                10 câu • 5 phút • Đạt từ 70%
              </div>
            </div>
          </div>

          {/* Test History List */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <BarChart2 className="w-4 h-4 text-orange-500" />
                <span>Lịch Sử Các Lần Kiểm Tra</span>
              </h3>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {profile.testHistory.length} bài đã hoàn thành
              </span>
            </div>

            {profile.testHistory.length === 0 ? (
              <div className={`text-center py-8 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Bạn chưa thực hiện bài kiểm tra định kỳ nào. Hãy bắt đầu bài thi đầu tiên!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {profile.testHistory.slice(0, 5).map((record) => (
                  <div key={record.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          record.passed
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {record.percentage}%
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          Kiểm tra cấp độ {record.level}
                        </div>
                        <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {new Date(record.date).toLocaleDateString('vi-VN')} &bull; {record.score}/{record.total} câu đúng
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          record.passed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {record.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : testResult ? (
        /* Result Screen */
        <div
          className={`p-8 rounded-3xl border shadow-xl text-center space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm ${
              testResult.passed
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-amber-100 text-amber-600'
            }`}
          >
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black">
              {testResult.passed ? 'Chúc Mừng Bạn Đã Vượt Qua!' : 'Cần Tiếp Tục Rèn Luyện Thêm!'}
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {testResult.passed
                ? `Bạn đã xuất sắc làm chủ từ vựng cấp bậc ${testResult.level}.`
                : `Điểm số đạt ${testResult.percentage}%. Cần đạt từ 70% để vượt qua bài kiểm tra.`}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Số câu đúng</div>
              <div className="text-2xl font-black text-emerald-600 mt-0.5">
                {testResult.score} / {testResult.total}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tỷ lệ chính xác</div>
              <div className="text-2xl font-black text-orange-600 mt-0.5">
                {testResult.percentage}%
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Thời gian làm</div>
              <div className="text-2xl font-black text-blue-600 mt-0.5">
                {testResult.timeSpentSeconds}s
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsTestStarted(false);
                setTestResult(null);
              }}
              className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
            >
              Quay lại danh sách kiểm tra
            </button>
          </div>
        </div>
      ) : (
        /* Active Test Form */
        <div className="space-y-6">
          {/* Top Timer & Question Navigation */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-600">
                Câu {currentIndex + 1} / {testWords.length}
              </span>
            </div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                timeRemaining < 60
                  ? 'bg-rose-100 text-rose-700 animate-pulse'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-300'
                  : 'bg-orange-50 text-orange-700 border border-orange-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-sm"
            >
              Nộp bài thi
            </button>
          </div>

          {/* Question Box */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-md text-center space-y-3 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Chọn nghĩa đúng cho từ vựng sau:
            </span>
            <div className="text-3xl sm:text-4xl font-black">{currentWord?.word}</div>
            <div className="text-sm font-mono font-bold text-orange-600">
              {currentWord?.phonetic}
            </div>
            {currentWord?.sinoVietnamese && (
              <div className="text-xs font-bold text-rose-600">
                Hán-Việt: {currentWord.sinoVietnamese}
              </div>
            )}
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questionOptions.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 text-orange-800 ring-2 ring-orange-400 shadow-md'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-orange-300 hover:bg-orange-50/20 shadow-sm'
                  }`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className={`px-5 py-2.5 rounded-xl border text-xs font-bold disabled:opacity-40 transition-all ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              Câu trước
            </button>

            <button
              disabled={currentIndex === testWords.length - 1}
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold text-xs shadow-sm"
            >
              Câu sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
