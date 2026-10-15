import { useState } from 'react';
import { TrendingUp, BarChart2, Activity, Sparkles } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export interface DayActivityData {
  day: string;
  hours: number;
  tasksDone: number;
  efficiency: number;
  projectedHours: number;
}

interface StudyActivityChartProps {
  data: DayActivityData[];
  isLive: boolean;
  timeRange: '7d' | '30d' | 'forecast';
  onTimeRangeChange: (range: '7d' | '30d' | 'forecast') => void;
}

export function StudyActivityChart({
  data,
  isLive,
  timeRange,
  onTimeRangeChange
}: StudyActivityChartProps) {
  const { isDark } = useTheme();
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 640;
  const height = 240;
  const padding = { top: 24, right: 24, bottom: 36, left: 36 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxHours = Math.max(6, ...data.map(d => Math.max(d.hours, d.projectedHours))) * 1.15;

  // Calculate coordinates
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * innerWidth;
    const yHours = padding.top + innerHeight - (d.hours / maxHours) * innerHeight;
    const yProjected = padding.top + innerHeight - (d.projectedHours / maxHours) * innerHeight;
    return { x, yHours, yProjected, ...d };
  });

  // Build SVG path for smooth bezier curve
  const buildSmoothPath = (pts: { x: number; yHours: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].yHours}`;

    let path = `M ${pts[0].x} ${pts[0].yHours}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      path += ` C ${cpX} ${p0.yHours}, ${cpX} ${p1.yHours}, ${p1.x} ${p1.yHours}`;
    }
    return path;
  };

  const linePath = buildSmoothPath(points);
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
    : '';

  const totalHours = data.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);
  const avgEfficiency = Math.round(data.reduce((acc, curr) => acc + curr.efficiency, 0) / (data.length || 1));
  const totalTasks = data.reduce((acc, curr) => acc + curr.tasksDone, 0);

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
      isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Header with Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-sm sm:text-base flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Activity className="w-4 h-4 text-indigo-500" />
              <span>Biểu Đồ Hoạt Động & Xu Hướng Học Tập</span>
            </h3>
            {isLive && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE AI
              </span>
            )}
          </div>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            Tổng: <strong className={isDark ? 'text-neutral-200' : 'text-slate-800'}>{totalHours} giờ</strong> • Hoàn tất: <strong className={isDark ? 'text-neutral-200' : 'text-slate-800'}>{totalTasks} task</strong> • Hiệu suất: <strong className="text-indigo-600 dark:text-indigo-400">{avgEfficiency}%</strong>
          </p>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Time range switcher */}
          <div className={`flex items-center p-0.5 rounded-lg border text-xs ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => onTimeRangeChange('7d')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                timeRange === '7d'
                  ? isDark ? 'bg-neutral-800 text-white shadow-2xs' : 'bg-white text-slate-900 shadow-2xs'
                  : isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 ngày
            </button>
            <button
              type="button"
              onClick={() => onTimeRangeChange('forecast')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                timeRange === 'forecast'
                  ? isDark ? 'bg-indigo-600 text-white shadow-2xs' : 'bg-indigo-600 text-white shadow-2xs'
                  : isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Dự báo AI</span>
            </button>
          </div>

          {/* Chart visual type switcher */}
          <div className={`flex items-center p-0.5 rounded-lg border text-xs ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => setChartType('area')}
              title="Biểu đồ đường & diện tích"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                chartType === 'area'
                  ? isDark ? 'bg-neutral-800 text-indigo-400' : 'bg-white text-indigo-600 shadow-2xs'
                  : isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setChartType('bar')}
              title="Biểu đồ cột so sánh"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                chartType === 'bar'
                  ? isDark ? 'bg-neutral-800 text-indigo-400' : 'bg-white text-indigo-600 shadow-2xs'
                  : isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive SVG Chart Container */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-64 overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="projectedBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + innerHeight * (1 - ratio);
            const val = (maxHours * ratio).toFixed(1);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + innerWidth}
                  y2={y}
                  stroke={isDark ? '#262626' : '#f1f5f9'}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill={isDark ? '#737373' : '#94a3b8'}
                >
                  {val}h
                </text>
              </g>
            );
          })}

          {/* Area Mode */}
          {chartType === 'area' && (
            <>
              {/* Projected curve (dashed cyan line) */}
              {timeRange === 'forecast' && (
                <path
                  d={buildSmoothPath(points.map(p => ({ x: p.x, yHours: p.yProjected })))}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  className="transition-all duration-500 opacity-80"
                />
              )}

              {/* Area fill */}
              <path
                d={areaPath}
                fill="url(#areaGradient)"
                className="transition-all duration-700 ease-out"
              />

              {/* Smooth Main Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />

              {/* Data points */}
              {points.map((pt, i) => (
                <g key={pt.day} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                  {/* Subtle pulsing outer ring on hover or live */}
                  {(hoveredIdx === i || isLive) && (
                    <circle
                      cx={pt.x}
                      cy={pt.yHours}
                      r="9"
                      fill="#6366f1"
                      opacity="0.2"
                      className="animate-ping"
                    />
                  )}
                  <circle
                    cx={pt.x}
                    cy={pt.yHours}
                    r={hoveredIdx === i ? 6 : 4}
                    fill={hoveredIdx === i ? '#818cf8' : '#6366f1'}
                    stroke={isDark ? '#171717' : '#ffffff'}
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                </g>
              ))}
            </>
          )}

          {/* Bar Mode */}
          {chartType === 'bar' && (
            <g>
              {points.map((pt, i) => {
                const barWidth = Math.min(32, innerWidth / (points.length * 2.2));
                const barHeight = Math.max(4, innerHeight - (pt.yHours - padding.top));
                const barX = pt.x - barWidth / 2;
                const isHovered = hoveredIdx === i;

                return (
                  <g key={pt.day} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                    <rect
                      x={barX}
                      y={pt.yHours}
                      width={barWidth}
                      height={barHeight}
                      rx="4"
                      fill="url(#barGradient)"
                      opacity={isHovered ? 1 : 0.85}
                      className="transition-all duration-300"
                    />
                    {/* Efficiency indicator dot above bar */}
                    <circle
                      cx={pt.x}
                      cy={pt.yHours - 8}
                      r="2.5"
                      fill="#10b981"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* X Axis Labels */}
          {points.map((pt) => (
            <text
              key={pt.day}
              x={pt.x}
              y={padding.top + innerHeight + 18}
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill={isDark ? '#a3a3a3' : '#64748b'}
            >
              {pt.day}
            </text>
          ))}

          {/* Interactive Hover crosshair and tooltip */}
          {hoveredIdx !== null && points[hoveredIdx] && (
            <g>
              <line
                x1={points[hoveredIdx].x}
                y1={padding.top}
                x2={points[hoveredIdx].x}
                y2={padding.top + innerHeight}
                stroke={isDark ? '#525252' : '#cbd5e1'}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </g>
          )}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div
            className={`absolute pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-2 rounded-xl text-xs border shadow-lg transition-all z-20 ${
              isDark
                ? 'bg-neutral-900 border-neutral-700 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${(points[hoveredIdx].yHours / height) * 100 - 4}%`
            }}
          >
            <div className="font-bold flex items-center justify-between gap-3 text-xs mb-1">
              <span>{points[hoveredIdx].day}</span>
              <span className="text-emerald-500 font-semibold">{points[hoveredIdx].efficiency}% hiệu suất</span>
            </div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex items-center justify-between gap-3">
                <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>Giờ học:</span>
                <span className="font-semibold text-indigo-500">{points[hoveredIdx].hours}h</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>Task xong:</span>
                <span className="font-semibold">{points[hoveredIdx].tasksDone} bài tập</span>
              </div>
              {timeRange === 'forecast' && (
                <div className="flex items-center justify-between gap-3 pt-0.5 border-t border-slate-200 dark:border-neutral-800 text-sky-500">
                  <span>Dự báo AI:</span>
                  <span className="font-semibold">{points[hoveredIdx].projectedHours}h</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend & Quick metrics footer */}
      <div className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2.5 text-xs ${
        isDark ? 'border-neutral-800 text-neutral-400' : 'border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
            <span>Giờ học thực tế</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Chỉ số hiệu quả</span>
          </div>
          {timeRange === 'forecast' && (
            <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
              <span className="w-2.5 h-1 border-t-2 border-sky-400 border-dashed inline-block" />
              <span>Dự báo AI mục tiêu</span>
            </div>
          )}
        </div>
        <span className="text-[11px] italic">
          💡 Rê chuột / chạm vào các điểm mốc để xem chi tiết
        </span>
      </div>
    </div>
  );
}
