import React from 'react';
import { BookOpen, Flame, Mic, CheckCircle, Award, Search, Sparkles, Sun, Moon, Database, Shuffle } from 'lucide-react';
import { Language, UserProfileProgress } from '../types';

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
}) => {
  const tabs = [
    { id: 'explore', label: 'Cấp bậc từ vựng', icon: BookOpen },
    { id: 'random-draw', label: 'Lật thẻ Random', icon: Shuffle },
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-xl">
              🌐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight">
                  Lingua<span className="text-orange-500">Vocab</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200">
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
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/30'
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
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-sm shadow-rose-500/30'
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

          {/* Right Stats & Controls */}
          <div className="flex items-center gap-2.5">
            {/* Massive Database Count Pill */}
            <div
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                isDarkMode
                  ? 'bg-blue-950/60 border-blue-800/80 text-blue-400'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
              title={`Kho từ vựng: ${currentLang === 'en' ? '5.120 từ Tiếng Anh' : '5.150 từ Tiếng Trung'} (Tổng ${totalWordsCount.toLocaleString()} từ hai ngôn ngữ)`}
            >
              <Database className="w-3.5 h-3.5 text-blue-500" />
              <span>
                {currentLang === 'en' ? '🇬🇧 5.120 từ EN' : '🇨🇳 5.150 từ ZH'}
              </span>
              <span className="opacity-50">&bull;</span>
              <span className="text-[11px] font-normal opacity-90">Tổng {totalWordsCount.toLocaleString()} từ</span>
            </div>

            {/* Streak */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-amber-400'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
              title="Chuỗi ngày học liên tục"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
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
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25 ring-1 ring-orange-400'
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
