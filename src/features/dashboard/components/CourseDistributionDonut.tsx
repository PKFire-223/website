import { useState } from 'react';
import { PieChart, BookOpen, Layers } from 'lucide-react';
import { Course } from '../../../types';
import { useTheme } from '../../../context/ThemeContext';

interface CourseDistributionDonutProps {
  courses: Course[];
  onSelectCourse?: (courseId: string) => void;
}

export function CourseDistributionDonut({ courses, onSelectCourse }: CourseDistributionDonutProps) {
  const { isDark } = useTheme();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Palette for course slices
  const sliceColors = [
    '#6366f1', // Indigo
    '#0ea5e9', // Sky
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#8b5cf6', // Purple
    '#14b8a6', // Teal
    '#f43f5e'  // Rose
  ];

  const totalCredits = courses.reduce((acc, c) => acc + (c.credits || 3), 0);
  const avgProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length) 
    : 0;

  // Compute donut segments
  const size = 200;
  const center = size / 2;
  const radius = 78;
  const strokeWidth = 24;

  let accumulatedAngle = 0;
  const segments = courses.map((course, idx) => {
    const credits = course.credits || 3;
    const share = totalCredits > 0 ? credits / totalCredits : 1 / (courses.length || 1);
    const startAngle = accumulatedAngle;
    const angle = share * 360;
    accumulatedAngle += angle;

    return {
      course,
      credits,
      share,
      startAngle,
      angle,
      color: sliceColors[idx % sliceColors.length]
    };
  });

  // Helper to convert polar to cartesian
  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians)
    };
  };

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    // Avoid full 360 degree arc glitch in SVG
    const clampedEnd = endAngle - startAngle >= 359.99 ? startAngle + 359.99 : endAngle;
    const start = polarToCartesian(cx, cy, r, clampedEnd);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = clampedEnd - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  const activeSegment = selectedIdx !== null ? segments[selectedIdx] : null;

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-colors flex flex-col justify-between ${
      isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <PieChart className="w-4 h-4 text-indigo-500" />
          <span>Phân Bổ Tín Chỉ & Tiến Độ Môn Học</span>
        </h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-slate-100 text-slate-700'
        }`}>
          {totalCredits} Tín chỉ
        </span>
      </div>

      {/* Donut Chart Visual & Center Stat */}
      <div className="relative flex items-center justify-center my-3">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-44 h-44 sm:w-48 sm:h-48 overflow-visible select-none"
        >
          {segments.map((seg, idx) => {
            const isSelected = selectedIdx === idx;
            const currentRadius = isSelected ? radius + 3 : radius;
            const currentStroke = isSelected ? strokeWidth + 4 : strokeWidth;

            return (
              <path
                key={seg.course.id}
                d={describeArc(center, center, currentRadius, seg.startAngle, seg.startAngle + seg.angle - 1.5)}
                fill="none"
                stroke={seg.color}
                strokeWidth={currentStroke}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300 hover:opacity-90"
                onMouseEnter={() => setSelectedIdx(idx)}
                onMouseLeave={() => setSelectedIdx(null)}
                onClick={() => onSelectCourse && onSelectCourse(seg.course.id)}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute text-center pointer-events-none px-2 max-w-[120px]">
          {activeSegment ? (
            <div>
              <div className="text-[10px] font-bold uppercase truncate" style={{ color: activeSegment.color }}>
                {activeSegment.course.code}
              </div>
              <div className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeSegment.course.progress}%
              </div>
              <div className={`text-[10px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {activeSegment.credits} tín chỉ
              </div>
            </div>
          ) : (
            <div>
              <div className={`text-[10px] font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                Trung bình
              </div>
              <div className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {avgProgress}%
              </div>
              <div className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {courses.length} môn học
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slices Legend List (responsive) */}
      <div className="space-y-1.5 mt-2">
        {segments.slice(0, 4).map((seg, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <div
              key={seg.course.id}
              onMouseEnter={() => setSelectedIdx(idx)}
              onMouseLeave={() => setSelectedIdx(null)}
              onClick={() => onSelectCourse && onSelectCourse(seg.course.id)}
              className={`p-2 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors ${
                isSelected
                  ? isDark ? 'bg-neutral-800' : 'bg-slate-100'
                  : 'hover:bg-slate-50 dark:hover:bg-neutral-800/40'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className={`font-medium truncate ${isDark ? 'text-neutral-200' : 'text-slate-700'}`}>
                  {seg.course.code} - {seg.course.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-[11px]">
                <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>
                  {seg.credits} TC
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {seg.course.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
