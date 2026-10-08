import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Flame,
  Mic,
  CheckCircle,
  Award,
  Search,
  Sparkles,
  Sun,
  Moon,
  Database,
  Shuffle,
  FileText,
  GraduationCap,
  MessagesSquare,
  Volume2,
  Quote,
  Bookmark,
  Camera,
  Bot,
  Target,
  Gauge,
} from 'lucide-react';
import { Language, UserProfileProgress } from '../types';
import {
  getPreferredAccent,
  setPreferredAccent,
  EnglishAccent,
  getPreferredSpeed,
  setPreferredSpeed,
} from '../utils/speech';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  profile: UserProfileProgress;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  totalWordsCount: number;
  currentLangWordsCount?: number;
  onOpenBookmarks?: () => void;
  bookmarkedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  profile,
  isDarkMode,
  onToggleDarkMode,
  totalWordsCount,
  currentLangWordsCount,
  onOpenBookmarks,
  bookmarkedCount = 0,
}) => {
  const [currentAccent, setCurrentAccent] = useState<EnglishAccent>(getPreferredAccent());
  const [currentSpeed, setCurrentSpeed] = useState<number>(getPreferredSpeed());

  useEffect(() => {
    const handleSpeedEvent = (e: Event) => {
      const customEvt = e as CustomEvent<number>;
      if (typeof customEvt.detail === 'number') {
        setCurrentSpeed(customEvt.detail);
      }
    };
    window.addEventListener('speech_speed_change', handleSpeedEvent);
    return () => window.removeEventListener('speech_speed_change', handleSpeedEvent);
  }, []);

  const handleAccentChange = (accent: EnglishAccent) => {
    setCurrentAccent(accent);
    setPreferredAccent(accent);
  };

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
    setPreferredSpeed(speed);
  };

  const cycleSpeed = () => {
    const speeds = [0.7, 0.85, 1.0];
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    handleSpeedChange(nextSpeed);
  };

  const tabs = [
    { id: 'explore', label: 'Cấp bậc từ vựng', icon: BookOpen },
    { id: 'patterns', label: 'Mẫu câu chuẩn', icon: Quote },
    { id: 'toeic-ielts', label: 'Luyện thi TOEIC / IELTS', icon: Target },
    { id: 'ai-translate', label: 'Dịch ảnh AI (Chuyên gia)', icon: Camera },
    { id: 'ai-roleplay', label: 'AI Nhập vai (Mic & Chat)', icon: Bot },
    { id: 'dialogue', label: 'Hội thoại giao tiếp', icon: MessagesSquare },
    { id: 'theory', label: 'Lý thuyết & Cách học', icon: GraduationCap },
    { id: 'random-draw', label: 'Lật thẻ Random', icon: Shuffle },
    { id: 'cloze', label: 'Điền từ đoạn văn', icon: FileText },
    { id: 'flashcard', label: 'Lật thẻ (SRS)', icon: Sparkles },
    { id: 'pronunciation', label: 'Nghe & Đọc lại', icon: Mic },
    { id: 'practice', label: 'Bài tập ôn luyện', icon: CheckCircle },
    { id: 'test', label: 'Kiểm tra định kỳ', icon: Award },
    { id: 'dictionary', label: 'Sổ từ & Tra cứu', icon: Search },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        isDarkMode
          ? 'bg-slate-900/95 backdrop-blur-md border-slate-800 text-white shadow-xl shadow-black/20'
          : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-indigo-500 flex items-center justify-center shadow-sm shadow-indigo-600/20 text-white font-black text-xl">
              🌐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight">
                  Lingua<span className="text-indigo-600 dark:text-indigo-400">Vocab</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  STANDARD
                </span>
              </div>
              <p
                className={`text-[11px] font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {currentLang === 'en' ? 'Chuẩn Oxford & CEFR' : 'Chuẩn HSK Quốc Tế'}
              </p>
            </div>
          </div>

          {/* Center Language Switcher */}
          <div
            className={`flex items-center p-1 rounded-xl border ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800'
                : 'bg-slate-100/90 border-slate-200'
            }`}
          >
            <button
              onClick={() => onLanguageChange('en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentLang === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇬🇧</span>
              <span className="hidden sm:inline">Tiếng Anh</span>
              <span className="text-[10px] opacity-90">(Oxford)</span>
            </button>

            <button
              onClick={() => onLanguageChange('zh')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentLang === 'zh'
                  ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-xs'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇨🇳</span>
              <span className="hidden sm:inline">Tiếng Trung</span>
              <span className="text-[10px] opacity-90">(HSK)</span>
            </button>
          </div>

          {/* Accent Switcher (UK Oxford vs US American) */}
          {currentLang === 'en' && (
            <div
              className={`hidden md:flex items-center p-1 rounded-xl border text-[11px] font-bold ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/90 border-slate-200'
              }`}
              title="Chọn chuẩn giọng phát âm quốc tế: Anh - Anh (Oxford) hoặc Anh - Mỹ (US)"
            >
              <button
                onClick={() => handleAccentChange('uk')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentAccent === 'uk'
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>🇬🇧</span>
                <span>Giọng Anh (UK)</span>
              </button>
              <button
                onClick={() => handleAccentChange('us')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentAccent === 'us'
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>🇺🇸</span>
                <span>Giọng Mỹ (US)</span>
              </button>
            </div>
          )}

          {/* Universal Audio Speed Controller (Applied to Both English & Chinese) */}
          <div
            className={`hidden xl:flex items-center p-1 rounded-xl border text-[11px] font-medium ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/90 border-slate-200'
            }`}
            title="Tốc độ giọng đọc phát âm: 0.85x chuẩn học tập (khuyên dùng để nghe rõ âm và thanh điệu), 0.7x đọc chậm, 1.0x tự nhiên"
          >
            <div className="flex items-center gap-1 px-2 text-slate-500 dark:text-slate-400 font-bold">
              <Gauge className="w-3.5 h-3.5 text-indigo-500" />
              <span>Tốc độ:</span>
            </div>
            {[
              { val: 0.7, label: '0.7x', desc: 'Chậm', icon: '🐢' },
              { val: 0.85, label: '0.85x', desc: 'Chuẩn học', icon: '🎯' },
              { val: 1.0, label: '1.0x', desc: 'Bản xứ', icon: '⚡' },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => handleSpeedChange(s.val)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  currentSpeed === s.val
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title={`Tốc độ đọc: ${s.label} (${s.desc})`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile/Tablet Compact Speed Switch Button */}
          <button
            onClick={cycleSpeed}
            className={`flex xl:hidden items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-indigo-400 hover:bg-slate-900'
                : 'bg-white border-slate-200 text-indigo-600 hover:bg-slate-50 shadow-2xs'
            }`}
            title="Nhấp để chuyển nhanh tốc độ đọc (0.7x Chậm / 0.85x Chuẩn học / 1.0x Tự nhiên)"
          >
            <Gauge className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              {currentSpeed === 0.7 ? '🐢 0.7x' : currentSpeed === 0.85 ? '🎯 0.85x' : '⚡ 1.0x'}
            </span>
          </button>

          {/* Right Stats & Controls */}
          <div className="flex items-center gap-2.5">
            {/* Massive Database Count Pill */}
            <div
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                isDarkMode
                  ? 'bg-blue-950/60 border-blue-800/80 text-blue-400'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
              title={`Kho từ vựng: ${currentLang === 'en' ? `${(currentLangWordsCount || 10000).toLocaleString()} từ Tiếng Anh (Oxford/CEFR)` : `${(currentLangWordsCount || 10000).toLocaleString()} từ Tiếng Trung (HSK)`} (Tổng ${totalWordsCount.toLocaleString()} từ hai ngôn ngữ)`}
            >
              <Database className="w-3.5 h-3.5 text-blue-500" />
              <span>
                {currentLang === 'en'
                  ? `🇬🇧 ${(currentLangWordsCount || 10000).toLocaleString()} từ EN`
                  : `🇨🇳 ${(currentLangWordsCount || 10000).toLocaleString()} từ ZH`}
              </span>
              <span className="opacity-50">&bull;</span>
              <span className="text-[11px] font-normal opacity-90">Tổng {totalWordsCount.toLocaleString()} từ</span>
            </div>

            {/* Bookmarked Words Quick Access Button */}
            <button
              onClick={onOpenBookmarks}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs ${
                isDarkMode
                  ? 'bg-amber-950/40 border-amber-800/80 text-amber-400 hover:bg-amber-900/50'
                  : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100/90'
              }`}
              title="Xem danh sách các từ vựng đã đánh dấu lưu lại (bấm để xem & nhảy đến từ)"
            >
              <Bookmark className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="hidden sm:inline">Từ đã lưu</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-black">
                {bookmarkedCount}
              </span>
            </button>

            {/* Streak */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-amber-400'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
              title="Chuỗi ngày học liên tục"
            >
              <Flame className="w-4 h-4 text-indigo-600 fill-amber-500 animate-pulse" />
              <span>{profile.streak} ngày</span>
            </div>

            {/* Daily Goal */}
            <div
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
              title="Mục tiêu từ mới hôm nay"
            >
              <span className={isDarkMode ? 'text-slate-400' : 'text-emerald-700'}>Mục tiêu:</span>
              <span className="font-bold text-emerald-600">
                {profile.todayLearnedCount}/{profile.dailyGoal}
              </span>
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton isDarkMode={isDarkMode} />

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDarkMode ? 'Chuyển sang giao diện Sáng (Khuyên dùng)' : 'Chuyển sang giao diện Tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Feature Tabs Row */}
        <div
          className={`flex items-center gap-1 overflow-x-auto py-2 border-t no-scrollbar ${
            isDarkMode ? 'border-slate-800' : 'border-slate-100'
          }`}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
