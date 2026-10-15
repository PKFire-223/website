import { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  RotateCcw, 
  Send, 
  Sliders, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  Flame, 
  Coffee, 
  Brain, 
  Clock 
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export interface SimulationConfig {
  dailyHours: number;
  focusLevel: number;
  taskVelocity: number;
  scenario: 'sprint' | 'balance' | 'peak' | 'forecast' | 'custom';
}

interface AiLiveSimulationControlProps {
  config: SimulationConfig;
  isLive: boolean;
  onToggleLive: () => void;
  onApplyConfig: (newConfig: SimulationConfig, prompt?: string) => Promise<void>;
  onReset: () => void;
  isSubmitting: boolean;
  aiSummary?: string;
  recommendations?: string[];
}

export function AiLiveSimulationControl({
  config,
  isLive,
  onToggleLive,
  onApplyConfig,
  onReset,
  isSubmitting,
  aiSummary,
  recommendations = []
}: AiLiveSimulationControlProps) {
  const { isDark } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [showAdvancedSliders, setShowAdvancedSliders] = useState(false);

  // Local working copy for sliders
  const [localHours, setLocalHours] = useState(config.dailyHours);
  const [localFocus, setLocalFocus] = useState(config.focusLevel);
  const [localVelocity, setLocalVelocity] = useState(config.taskVelocity);

  const scenarios = [
    {
      id: 'sprint',
      label: 'Ôn Thi Nước Rút',
      icon: Flame,
      color: 'text-rose-500',
      bgColor: isDark ? 'bg-rose-500/10 border-rose-500/20' : 'bg-rose-50 border-rose-200',
      desc: '+45% giờ học, dồn lực giải quyết bài tập khẩn'
    },
    {
      id: 'balance',
      label: 'Cân Bằng & Bền Bỉ',
      icon: Coffee,
      color: 'text-emerald-500',
      bgColor: isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200',
      desc: 'Giữ đều 2.8h/ngày, kỷ luật 95%, chống kiệt sức'
    },
    {
      id: 'peak',
      label: 'Bứt Phá Deep Work',
      icon: Brain,
      color: 'text-indigo-500',
      bgColor: isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200',
      desc: 'Tối ưu độ tập trung 96%, hoàn thành bài tập điểm A'
    },
    {
      id: 'forecast',
      label: 'Dự Báo 14 Ngày',
      icon: TrendingUp,
      color: 'text-sky-500',
      bgColor: isDark ? 'bg-sky-500/10 border-sky-500/20' : 'bg-sky-50 border-sky-200',
      desc: 'Mô phỏng đường cong tiến độ và cảnh báo sớm'
    }
  ];

  const handleScenarioClick = (scId: string) => {
    let hours = localHours;
    let focus = localFocus;
    let vel = localVelocity;

    if (scId === 'sprint') {
      hours = 5.5;
      focus = 94;
      vel = 1.45;
    } else if (scId === 'balance') {
      hours = 2.8;
      focus = 88;
      vel = 1.05;
    } else if (scId === 'peak') {
      hours = 4.5;
      focus = 96;
      vel = 1.35;
    }

    setLocalHours(hours);
    setLocalFocus(focus);
    setLocalVelocity(vel);

    onApplyConfig({
      dailyHours: hours,
      focusLevel: focus,
      taskVelocity: vel,
      scenario: scId as any
    });
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isSubmitting) return;

    onApplyConfig({
      dailyHours: localHours,
      focusLevel: localFocus,
      taskVelocity: localVelocity,
      scenario: 'custom'
    }, prompt.trim());
    setPrompt('');
  };

  const handleSliderCommit = () => {
    onApplyConfig({
      dailyHours: localHours,
      focusLevel: localFocus,
      taskVelocity: localVelocity,
      scenario: 'custom'
    });
  };

  return (
    <div className={`p-4 sm:p-6 rounded-2xl border transition-all ${
      isDark 
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/30 border-indigo-500/30 text-white' 
        : 'bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/60 border-indigo-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Banner: Real-time Live Badge & AI Compatibility Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base tracking-tight">
                Bộ Điều Khiển & Mô Phỏng Số Liệu AI Thời Gian Thực
              </h3>
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  ĐANG PHÁT LIVE
                </span>
              ) : (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  Tĩnh
                </span>
              )}
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
              Kéo thanh trượt hoặc gõ yêu cầu bằng ngôn ngữ tự nhiên để AI tái lập và nhảy số liệu biểu đồ tức thì.
            </p>
          </div>
        </div>

        {/* Live Simulation On/Off & Reset */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
          <button
            type="button"
            onClick={onToggleLive}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isLive
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-500/30'
                : isDark
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${isLive ? 'animate-bounce' : ''}`} />
            <span>{isLive ? 'Dừng Live Stream' : '⚡ Bật Live AI Stream'}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            title="Khôi phục số liệu gốc"
            className={`p-2 rounded-xl text-xs border transition-colors cursor-pointer ${
              isDark
                ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-600'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Scenarios Buttons */}
      <div className="mt-4">
        <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
          Kịch bản tối ưu hóa bằng 1-Click:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isSelected = config.scenario === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleScenarioClick(sc.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? isDark 
                      ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500 text-white' 
                      : 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-400 text-indigo-950'
                    : sc.bgColor
                } hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${sc.color}`} />
                  <span className="font-bold text-xs truncate">{sc.label}</span>
                </div>
                <p className={`text-[11px] leading-tight line-clamp-2 ${
                  isDark ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                  {sc.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Natural Language AI Prompt Tuner */}
      <form onSubmit={handlePromptSubmit} className="mt-4">
        <label className={`text-xs font-semibold block mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
          💬 Hoặc nhập yêu cầu mô phỏng tự do cho AI:
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="VD: Tăng tốc độ làm bài lên 25%, học thêm 2 tiếng mỗi tối môn Web..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                isDark 
                  ? 'bg-neutral-950/80 border-neutral-700 focus:border-indigo-500 text-white placeholder-neutral-500' 
                  : 'bg-white border-slate-300 focus:border-indigo-600 text-slate-900 placeholder-slate-400 shadow-2xs'
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={!prompt.trim() || isSubmitting}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              !prompt.trim() || isSubmitting
                ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-neutral-800 text-slate-500'
                : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            {isSubmitting ? (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Áp Dụng AI</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAdvancedSliders(!showAdvancedSliders)}
            className={`p-2.5 rounded-xl border text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              showAdvancedSliders
                ? 'bg-indigo-600 text-white border-indigo-600'
                : isDark
                ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
            }`}
            title="Điều chỉnh thông số thủ công"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Advanced Sliders Drawer */}
      {showAdvancedSliders && (
        <div className={`mt-4 p-4 rounded-xl border space-y-3.5 text-xs animate-in fade-in duration-200 ${
          isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-white/80 border-slate-200'
        }`}>
          <div className="flex items-center justify-between font-semibold">
            <span>Tinh chỉnh tham số thời gian thực:</span>
            <button
              type="button"
              onClick={handleSliderCommit}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Cập nhật biểu đồ ngay
            </button>
          </div>

          {/* Slider 1: Daily Hours */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className={isDark ? 'text-neutral-300' : 'text-slate-600'}>Mục tiêu giờ học mỗi ngày:</span>
              <strong className="text-indigo-600 dark:text-indigo-400">{localHours} giờ/ngày</strong>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.5"
              value={localHours}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setLocalHours(val);
                onApplyConfig({
                  dailyHours: val,
                  focusLevel: localFocus,
                  taskVelocity: localVelocity,
                  scenario: 'custom'
                });
              }}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-neutral-500">
              <span>1h (Nhẹ nhàng)</span>
              <span>4h (Tiêu chuẩn)</span>
              <span>8h (Nước rút cực hạn)</span>
            </div>
          </div>

          {/* Slider 2: Focus Level */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className={isDark ? 'text-neutral-300' : 'text-slate-600'}>Chỉ số tập trung AI (Focus Index):</span>
              <strong className="text-emerald-600 dark:text-emerald-400">{localFocus}%</strong>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="2"
              value={localFocus}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setLocalFocus(val);
                onApplyConfig({
                  dailyHours: localHours,
                  focusLevel: val,
                  taskVelocity: localVelocity,
                  scenario: 'custom'
                });
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Slider 3: Task Velocity */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className={isDark ? 'text-neutral-300' : 'text-slate-600'}>Tốc độ giải quyết bài tập (Task Velocity):</span>
              <strong className="text-sky-600 dark:text-sky-400">{localVelocity}x</strong>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={localVelocity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setLocalVelocity(val);
                onApplyConfig({
                  dailyHours: localHours,
                  focusLevel: localFocus,
                  taskVelocity: val,
                  scenario: 'custom'
                });
              }}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* AI Qualitative Feedback & Recommendations Banner */}
      {aiSummary && (
        <div className={`mt-4 p-3.5 rounded-xl border text-xs transition-all ${
          isDark 
            ? 'bg-neutral-950/70 border-indigo-500/30 text-neutral-200' 
            : 'bg-white border-indigo-100 text-slate-800 shadow-2xs'
        }`}>
          <div className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phân Tích Tác Động Tương Thích Từ Planora AI:</span>
          </div>
          <p className="leading-relaxed text-[12px] mb-2.5">
            {aiSummary}
          </p>

          {recommendations.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-neutral-800">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-neutral-400">
                Khuyến nghị hành động tiếp theo:
              </div>
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
