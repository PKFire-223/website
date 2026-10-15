import { useState } from 'react';
import { Target, Zap, ShieldCheck, Compass, BrainCircuit } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export interface RadarScores {
  velocity: number;
  adherence: number;
  consistency: number;
  problemSolving: number;
  focusIndex: number;
}

interface AiPerformanceRadarProps {
  currentScores: RadarScores;
  simulatedScores: RadarScores;
  isSimulated: boolean;
}

export function AiPerformanceRadar({
  currentScores,
  simulatedScores,
  isSimulated
}: AiPerformanceRadarProps) {
  const { isDark } = useTheme();
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const axes = [
    { key: 'velocity', label: 'Tốc độ (Velocity)', icon: Zap, max: 100 },
    { key: 'adherence', label: 'Bám sát mục tiêu', icon: Target, max: 100 },
    { key: 'consistency', label: 'Tính kỷ luật', icon: ShieldCheck, max: 100 },
    { key: 'problemSolving', label: 'Giải bài tập khó', icon: BrainCircuit, max: 100 },
    { key: 'focusIndex', label: 'Chỉ số tập trung', icon: Compass, max: 100 }
  ];

  const size = 260;
  const center = size / 2;
  const radius = 86;
  const levels = [0.25, 0.5, 0.75, 1];

  // Helper to get coordinates
  const getCoordinates = (index: number, total: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Build polygon points string
  const currentPoints = axes.map((axis, i) => {
    const val = currentScores[axis.key as keyof RadarScores] || 60;
    const ratio = Math.max(0.1, Math.min(1, val / 100));
    const pt = getCoordinates(i, axes.length, ratio);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  const simulatedPoints = axes.map((axis, i) => {
    const val = simulatedScores[axis.key as keyof RadarScores] || 75;
    const ratio = Math.max(0.1, Math.min(1, val / 100));
    const pt = getCoordinates(i, axes.length, ratio);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-colors flex flex-col justify-between ${
      isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <BrainCircuit className="w-4 h-4 text-indigo-500" />
            <span>Radar Đánh Giá Năng Lực AI</span>
          </h3>
          <p className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            5 trục năng lực cốt lõi & độ tương thích kế hoạch
          </p>
        </div>
        {isSimulated && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            ĐÃ ÁP DỤNG AI
          </span>
        )}
      </div>

      {/* SVG Radar Chart */}
      <div className="relative flex items-center justify-center my-1 select-none">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-56 h-56 sm:w-64 sm:h-64 overflow-visible">
          {/* Level Web Lines */}
          {levels.map((lvl) => {
            const levelPoints = axes.map((_, i) => {
              const pt = getCoordinates(i, axes.length, lvl);
              return `${pt.x},${pt.y}`;
            }).join(' ');
            return (
              <polygon
                key={lvl}
                points={levelPoints}
                fill="none"
                stroke={isDark ? '#262626' : '#e2e8f0'}
                strokeWidth="1"
                strokeDasharray={lvl === 1 ? 'none' : '2 2'}
              />
            );
          })}

          {/* Radial Axis Lines */}
          {axes.map((_, i) => {
            const pt = getCoordinates(i, axes.length, 1);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={pt.x}
                y2={pt.y}
                stroke={isDark ? '#262626' : '#e2e8f0'}
                strokeWidth="1"
              />
            );
          })}

          {/* Current Polygon (Emerald/Indigo) */}
          <polygon
            points={currentPoints}
            fill="#6366f1"
            fillOpacity={isDark ? '0.25' : '0.2'}
            stroke="#6366f1"
            strokeWidth="2"
            className="transition-all duration-700 ease-out"
          />

          {/* Simulated / AI Projected Polygon (Sky/Cyan with dashed or glowing stroke) */}
          {isSimulated && (
            <polygon
              points={simulatedPoints}
              fill="#0ea5e9"
              fillOpacity={isDark ? '0.3' : '0.25'}
              stroke="#0ea5e9"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="transition-all duration-700 ease-out animate-pulse"
            />
          )}

          {/* Vertex Nodes & Hover interaction */}
          {axes.map((axis, i) => {
            const currVal = currentScores[axis.key as keyof RadarScores];
            const simVal = simulatedScores[axis.key as keyof RadarScores];
            const ptCurr = getCoordinates(i, axes.length, currVal / 100);
            const ptSim = getCoordinates(i, axes.length, simVal / 100);
            const ptLabel = getCoordinates(i, axes.length, 1.25);

            return (
              <g
                key={axis.key}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredMetric(axis.key)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                {/* Current node */}
                <circle
                  cx={ptCurr.x}
                  cy={ptCurr.y}
                  r="4"
                  fill="#6366f1"
                  stroke={isDark ? '#171717' : '#ffffff'}
                  strokeWidth="1.5"
                />

                {/* Simulated node */}
                {isSimulated && (
                  <circle
                    cx={ptSim.x}
                    cy={ptSim.y}
                    r="4.5"
                    fill="#0ea5e9"
                    stroke={isDark ? '#171717' : '#ffffff'}
                    strokeWidth="1.5"
                  />
                )}

                {/* Axis Label */}
                <text
                  x={ptLabel.x}
                  y={ptLabel.y + 4}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill={hoveredMetric === axis.key ? '#6366f1' : isDark ? '#a3a3a3' : '#64748b'}
                  className="transition-colors"
                >
                  {axis.label.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover detail card */}
        {hoveredMetric && (
          <div className={`absolute bottom-1 px-3 py-1.5 rounded-lg border text-xs shadow-md pointer-events-none ${
            isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <span className="font-bold">{axes.find(a => a.key === hoveredMetric)?.label}: </span>
            <span className="text-indigo-500 font-bold">{currentScores[hoveredMetric as keyof RadarScores]}đ</span>
            {isSimulated && (
              <span className="text-sky-500 font-bold ml-1.5">
                → {simulatedScores[hoveredMetric as keyof RadarScores]}đ (AI)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className={`pt-2.5 border-t flex items-center justify-center gap-5 text-[11px] ${
        isDark ? 'border-neutral-800 text-neutral-400' : 'border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
          <span>Điểm hiện tại</span>
        </div>
        {isSimulated && (
          <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block" />
            <span>Mô phỏng AI tương thích</span>
          </div>
        )}
      </div>
    </div>
  );
}
