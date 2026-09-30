import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Award,
  BookOpen,
  Filter,
  Check,
  Eye,
  HelpCircle,
  Volume2,
  Clock,
  Shuffle,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClozeQuestion, Language, UserProfileProgress } from '../types';
import { CLOZE_QUESTIONS } from '../data/clozeData';
import { speak } from '../utils/speech';

interface ClozeTestModeProps {
  currentLang: Language;
  profile: UserProfileProgress;
  onUpdateProfile: (updated: UserProfileProgress) => void;
  isDarkMode?: boolean;
}

export const ClozeTestMode: React.FC<ClozeTestModeProps> = ({
  currentLang,
  profile,
  onUpdateProfile,
  isDarkMode = false,
}) => {
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // Current test state: 'intro' | 'testing' | 'result'
  const [testState, setTestState] = useState<'intro' | 'testing' | 'result'>('intro');

  // Active 20 random questions
  const [testQuestions, setTestQuestions] = useState<ClozeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong'>('all');

  // Timer
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // Available questions filtered by language & category
  const filteredBank = useMemo(() => {
    return CLOZE_QUESTIONS.filter((q) => {
      if (q.language !== currentLang) return false;
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
      return true;
    });
  }, [currentLang, selectedCategory]);

  // Start new 20-question test
  const startNewTest = (categoryOverride?: string) => {
    const cat = categoryOverride !== undefined ? categoryOverride : selectedCategory;
    let pool = CLOZE_QUESTIONS.filter((q) => q.language === currentLang);
    if (cat !== 'all') {
      pool = pool.filter((q) => q.category === cat);
    }

    if (pool.length === 0) {
      pool = CLOZE_QUESTIONS.filter((q) => q.language === currentLang);
    }

    // Shuffle and pick 20 random questions
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, 20);

    setTestQuestions(chosen);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeElapsed(0);
    setTestState('testing');
    setReviewFilter('all');
  };

  // Timer tick during testing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (testState === 'testing') {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testState]);

  // Handle option select
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  // Submit test
  const handleSubmitTest = () => {
    setTestState('result');

    // Calculate score
    const correctCount = testQuestions.reduce((acc, q, idx) => {
      return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);

    const percentage = Math.round((correctCount / testQuestions.length) * 100);

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#0ea5e9', '#10b981', '#6366f1'],
        });
      } catch (e) {
        // ignore confetti errors
      }
    }
  };

  // Current question data
  const currentQ = testQuestions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;

  // Score stats
  const scoreStats = useMemo(() => {
    if (testState !== 'result') return { correct: 0, total: 20, percentage: 0 };
    const correct = testQuestions.reduce((acc, q, idx) => {
      return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);
    const total = testQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    return { correct, total, percentage };
  }, [testState, testQuestions, userAnswers]);

  // Format time (MM:SS)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // Categories metadata
  const categories = [
    { id: 'all', label: 'Tất cả chuyên đề', desc: 'Ngẫu nhiên toàn diện' },
    { id: 'tense', label: 'Chia thì & Thể động từ', desc: 'Hiện tại, Quá khứ, Hoàn thành, Bị động' },
    { id: 'meaning', label: 'Ngữ nghĩa trong ngữ cảnh', desc: 'Từ vựng logic & Collocations' },
    { id: 'word-form', label: 'Từ loại & Cấu tạo từ', desc: 'Noun, Verb, Adjective, Adverb' },
    { id: 'preposition', label: 'Giới từ & Cụm từ', desc: 'Cố định & Phrasal Verbs' },
    { id: 'conjunction', label: 'Liên từ & Mệnh đề', desc: 'Although, Despite, Because, Mệnh đề quan hệ' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. INTRO SCREEN: OVERVIEW & START BUTTON                                  */}
      {/* ========================================================================= */}
      {testState === 'intro' && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-sm border border-indigo-500/20">
                    ✍️
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Luyện thi ngữ pháp & ngữ nghĩa đoạn văn
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Ngân hàng &gt; 1.000 câu
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Điền Từ Thích Hợp Vào Chỗ Trống Đoạn Văn
                </h1>
                <p
                  className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Rèn luyện khả năng đọc hiểu, chia thì ngữ pháp (Tenses), nhận diện từ loại (Word Formations),
                  chọn từ theo ngữ cảnh ngữ nghĩa và chọn giới từ/liên từ chuẩn xác. Mỗi bài kiểm tra tự động tạo{' '}
                  <strong className="text-indigo-600 dark:text-indigo-400 font-bold">20 câu ngẫu nhiên với 4 đáp án</strong>{' '}
                  từ kho dữ liệu hơn 1.000 câu.
                </p>
              </div>

              {/* Quick stats pill */}
              <div
                className={`p-4 rounded-2xl border text-center shrink-0 ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-medium text-slate-500">Kho câu hỏi hiện có</div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {filteredBank.length.toLocaleString()} câu
                </div>
                <div className="text-[10px] text-slate-400 mt-1">20 câu / lượt thi</div>
              </div>
            </div>
          </div>

          {/* Category Selector Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold">
                Chọn Chuyên Đề Kiểm Tra (Hoặc Chọn Tất Cả)
              </h2>
              <span className="text-xs text-slate-500">
                {filteredBank.length} câu phù hợp trong kho
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {categories.map((cat) => {
                const count = CLOZE_QUESTIONS.filter(
                  (q) => q.language === currentLang && (cat.id === 'all' || q.category === cat.id)
                ).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/20 shadow-xs'
                        : isDarkMode
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {cat.label}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {count} câu
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {cat.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Big Start Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => startNewTest()}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-base shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Shuffle className="w-5 h-5" />
              <span>Tạo Bài Kiểm Tra 20 Câu Ngẫu Nhiên Ngay</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TESTING SCREEN: 20 QUESTIONS WITH 4 CHOICES                            */}
      {/* ========================================================================= */}
      {testState === 'testing' && currentQ && (
        <div className="space-y-6">
          {/* Top Progress & Navigation Bar */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Question Counter & Category Badge */}
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                Câu {currentIndex + 1}/20
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {currentQ.category === 'tense'
                  ? 'Chia thì'
                  : currentQ.category === 'meaning'
                  ? 'Theo ngữ nghĩa'
                  : currentQ.category === 'word-form'
                  ? 'Từ loại'
                  : currentQ.category === 'preposition'
                  ? 'Giới từ'
                  : 'Liên từ'}
              </span>
              <span className="text-xs text-slate-400">({currentQ.level})</span>
            </div>

            {/* Timer & Answered Count */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{formatTime(timeElapsed)}</span>
              </div>

              <div className="text-xs font-semibold text-slate-500">
                Đã làm: <strong className="text-indigo-600 font-bold">{answeredCount}</strong>/20
              </div>
            </div>
          </div>

          {/* Question Palette: 20 Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar justify-center sm:justify-start">
            {testQuestions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-300 dark:ring-indigo-700'
                      : isAnswered
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
                      : isDarkMode
                      ? 'bg-slate-800 text-slate-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Main Question Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            {/* Passage Prompt */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span>Chọn 1 trong 4 đáp án điền vào ô trống [ _____ ]:</span>
                <button
                  onClick={() => speak(currentQ.passage.replace('[ _____ ]', 'blank'), currentQ.language)}
                  className="flex items-center gap-1 text-indigo-600 hover:underline cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu</span>
                </button>
              </div>

              {/* Formatted Passage */}
              <div
                className={`p-5 rounded-2xl border text-base sm:text-lg font-medium leading-relaxed ${
                  isDarkMode
                    ? 'bg-slate-950/70 border-slate-800 text-slate-100'
                    : 'bg-slate-50/80 border-slate-200 text-slate-800'
                }`}
              >
                {currentQ.passage.split('[ _____ ]').map((part, pIdx, arr) => (
                  <React.Fragment key={pIdx}>
                    <span>{part}</span>
                    {pIdx < arr.length - 1 && (
                      <span className="inline-block mx-1.5 px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-bold border-2 border-dashed border-indigo-400 dark:border-indigo-600 text-sm align-middle">
                        {userAnswers[currentIndex] !== undefined
                          ? currentQ.options[userAnswers[currentIndex]]
                          : '[ ? ]'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                const letter = ['A', 'B', 'C', 'D'][optIdx];

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                        : isDarkMode
                        ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : isDarkMode
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {letter}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-semibold ${
                          isSelected
                            ? 'text-indigo-900 dark:text-indigo-200 font-bold'
                            : isDarkMode
                            ? 'text-slate-200'
                            : 'text-slate-800'
                        }`}
                      >
                        {opt}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 gap-2">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < testQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(testQuestions.length - 1, prev + 1))}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Nộp bài & Chấm điểm</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. RESULT & REVIEW SCREEN: SCORE, DETAILED EXPLANATIONS                    */}
      {/* ========================================================================= */}
      {testState === 'result' && (
        <div className="space-y-8">
          {/* Result Summary Box */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border text-center transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-200 dark:border-indigo-800">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Kết Quả Bài Kiểm Tra Điền Từ
            </h2>

            <div className="flex items-center justify-center gap-6 my-4">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-indigo-600 dark:text-indigo-400">
                  {scoreStats.correct}
                </span>
                <span className="text-xl text-slate-400 font-bold">/{scoreStats.total}</span>
                <p className="text-xs text-slate-500 mt-0.5">Số câu trả lời đúng</p>
              </div>

              <div className="h-10 w-px bg-slate-200 dark:bg-slate-800" />

              <div>
                <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400">
                  {scoreStats.percentage}%
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  {scoreStats.percentage >= 70 ? 'Đạt chuẩn xuất sắc' : 'Cần ôn luyện thêm'}
                </p>
              </div>

              <div className="h-10 w-px bg-slate-200 dark:bg-slate-800" />

              <div>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-700 dark:text-slate-300">
                  {formatTime(timeElapsed)}
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Thời gian hoàn thành</p>
              </div>
            </div>

            {/* Retake & Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={() => startNewTest()}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Tạo bài kiểm tra 20 câu ngẫu nhiên mới</span>
              </button>

              <button
                onClick={() => setTestState('intro')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Về trang chủ chuyên đề</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-bold">
                Chi Tiết Đáp Án & Giải Thích Ngữ Pháp (20 câu)
              </h3>

              {/* Review Filter */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    reviewFilter === 'all'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Tất cả 20 câu
                </button>
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    reviewFilter === 'wrong'
                      ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Chỉ câu làm sai ({scoreStats.total - scoreStats.correct})
                </button>
              </div>
            </div>

            {/* List of Questions with Explanation */}
            <div className="space-y-4">
              {testQuestions.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;

                if (reviewFilter === 'wrong' && isCorrect) {
                  return null;
                }

                return (
                  <div
                    key={q.id}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                      isCorrect
                        ? isDarkMode
                          ? 'bg-slate-900/60 border-emerald-900/40'
                          : 'bg-white border-emerald-200/80 shadow-2xs'
                        : isDarkMode
                        ? 'bg-slate-900/60 border-rose-900/40'
                        : 'bg-white border-rose-200/80 shadow-2xs'
                    }`}
                  >
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-500">Câu #{idx + 1}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                          {q.category}
                        </span>
                      </div>

                      {isCorrect ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Chưa chính xác
                        </span>
                      )}
                    </div>

                    {/* Passage */}
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      {q.passage.replace('[ _____ ]', `[ ${q.options[q.correctIndex]} ]`)}
                    </p>

                    {/* Choices Review */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isThisCorrect = optIdx === q.correctIndex;
                        const isThisUser = optIdx === userChoice;

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border text-center font-medium ${
                              isThisCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 font-bold'
                                : isThisUser
                                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 line-through'
                                : isDarkMode
                                ? 'bg-slate-950 border-slate-800 text-slate-400'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <span>{['A', 'B', 'C', 'D'][optIdx]}. {opt}</span>
                            {isThisCorrect && ' (Đúng)'}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    <div
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        isDarkMode
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-1.5 text-indigo-700 dark:text-indigo-400">
                        <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                        <div>
                          <strong className="font-bold">Giải thích: </strong>
                          <span>{q.explanation}</span>
                        </div>
                      </div>

                      <div className="text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-200/60 dark:border-slate-800">
                        &rarr; Dịch nghĩa: {q.translation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
