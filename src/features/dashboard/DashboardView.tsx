import { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  Award, 
  Target, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  TrendingUp, 
  CalendarDays, 
  MapPin, 
  StickyNote,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { Course, Task, Goal, ErrorReport, ActiveTab, TimetableEntry, Note } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { StudyActivityChart, DayActivityData } from './components/StudyActivityChart';
import { CourseDistributionDonut } from './components/CourseDistributionDonut';
import { AiPerformanceRadar, RadarScores } from './components/AiPerformanceRadar';
import { AiLiveSimulationControl, SimulationConfig } from './components/AiLiveSimulationControl';

interface DashboardViewProps {
  courses: Course[];
  tasks: Task[];
  goals: Goal[];
  errors?: ErrorReport[];
  notes?: Note[];
  onNavigate: (tab: ActiveTab) => void;
  onToggleTask: (id: string, currentStatus: Task['status']) => void;
}

// Initial default 7-day study telemetry
const defaultWeeklyActivity: DayActivityData[] = [
  { day: 'T2', hours: 3.5, tasksDone: 4, efficiency: 84, projectedHours: 4.0 },
  { day: 'T3', hours: 4.2, tasksDone: 6, efficiency: 89, projectedHours: 4.5 },
  { day: 'T4', hours: 2.8, tasksDone: 3, efficiency: 78, projectedHours: 3.2 },
  { day: 'T5', hours: 5.0, tasksDone: 7, efficiency: 92, projectedHours: 5.2 },
  { day: 'T6', hours: 3.8, tasksDone: 5, efficiency: 86, projectedHours: 4.1 },
  { day: 'T7', hours: 6.2, tasksDone: 8, efficiency: 95, projectedHours: 6.5 },
  { day: 'CN', hours: 4.0, tasksDone: 5, efficiency: 88, projectedHours: 4.2 },
];

const defaultRadarScores: RadarScores = {
  velocity: 72,
  adherence: 84,
  consistency: 86,
  problemSolving: 79,
  focusIndex: 85
};

export function DashboardView({
  courses,
  tasks,
  goals,
  errors = [],
  notes = [],
  onNavigate,
  onToggleTask
}: DashboardViewProps) {
  const { isDark } = useTheme();

  // Simulation & Dynamic AI state
  const [isLiveSimulation, setIsLiveSimulation] = useState(false);
  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig>({
    dailyHours: 3.8,
    focusLevel: 85,
    taskVelocity: 1.15,
    scenario: 'custom'
  });
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'forecast'>('7d');
  const [weeklyData, setWeeklyData] = useState<DayActivityData[]>(defaultWeeklyActivity);
  const [currentRadar] = useState<RadarScores>(defaultRadarScores);
  const [simulatedRadar, setSimulatedRadar] = useState<RadarScores>(defaultRadarScores);
  const [isSimulated, setIsSimulated] = useState(false);
  const [isSubmittingAi, setIsSubmittingAi] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [courseDeltas, setCourseDeltas] = useState<Record<string, number>>({});

  // Real-time live pulse timer reference
  const liveIntervalRef = useRef<any>(null);

  // Active / pending tasks calculation
  const pendingTasks = tasks.filter(t => t.status !== 'done');
  const completedTasks = tasks.filter(t => t.status === 'done');
  const inProgressCourses = courses.filter(c => c.status === 'in_progress');

  // Load timetable preview safely
  const scheduledItems: TimetableEntry[] = (() => {
    try {
      const saved = localStorage.getItem('planora_timetable');
      if (saved) {
        const items: TimetableEntry[] = JSON.parse(saved);
        return items.filter(i => Boolean(i.day && i.session));
      }
    } catch {
      // ignore
    }
    return [];
  })();

  const dayLabels: Record<string, string> = {
    mon: 'Thứ 2',
    tue: 'Thứ 3',
    wed: 'Thứ 4',
    thu: 'Thứ 5',
    fri: 'Thứ 6',
    sat: 'Thứ 7',
    sun: 'CN'
  };

  // Live simulation tick effect: updates numbers continuously every 2.5 seconds
  useEffect(() => {
    if (isLiveSimulation) {
      liveIntervalRef.current = setInterval(() => {
        setWeeklyData(prev => prev.map((item, idx) => {
          // Slight realistic fluctuations (random walk)
          const jitter = (Math.random() - 0.48) * 0.3;
          const newHours = Math.max(1.5, Math.min(8.5, Number((item.hours + jitter).toFixed(1))));
          const newEff = Math.min(99, Math.max(65, Math.round(item.efficiency + (Math.random() - 0.48) * 3)));
          const newTasks = Math.max(1, Math.round(newHours * 1.35 * simulationConfig.taskVelocity));
          return {
            ...item,
            hours: newHours,
            efficiency: newEff,
            tasksDone: newTasks,
            projectedHours: Number((newHours * (1 + 0.1 * (idx % 2 === 0 ? 1 : -1))).toFixed(1))
          };
        }));

        setSimulatedRadar(prev => ({
          velocity: Math.min(99, Math.max(50, Math.round(prev.velocity + (Math.random() - 0.48) * 2))),
          adherence: Math.min(99, Math.max(50, Math.round(prev.adherence + (Math.random() - 0.48) * 2))),
          consistency: Math.min(99, Math.max(50, Math.round(prev.consistency + (Math.random() - 0.48) * 2))),
          problemSolving: Math.min(99, Math.max(50, Math.round(prev.problemSolving + (Math.random() - 0.48) * 2))),
          focusIndex: Math.min(99, Math.max(50, Math.round(prev.focusIndex + (Math.random() - 0.48) * 2)))
        }));
      }, 2400);
    } else {
      if (liveIntervalRef.current) {
        clearInterval(liveIntervalRef.current);
      }
    }

    return () => {
      if (liveIntervalRef.current) {
        clearInterval(liveIntervalRef.current);
      }
    };
  }, [isLiveSimulation, simulationConfig.taskVelocity]);

  // Apply new simulation config via API or client calculation
  const handleApplyConfig = async (newConfig: SimulationConfig, promptText?: string) => {
    setSimulationConfig(newConfig);
    setIsSubmittingAi(true);

    try {
      const response = await fetch('/api/ai/dashboard-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          scenario: newConfig.scenario,
          currentConfig: newConfig,
          courses
        })
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.success && resData.data) {
          const { weeklyActivity, radarScores, courseAdjustments, aiSummary: summary, recommendations } = resData.data;
          if (weeklyActivity && weeklyActivity.length > 0) {
            setWeeklyData(weeklyActivity);
          }
          if (radarScores) {
            setSimulatedRadar(radarScores);
          }
          if (summary) {
            setAiSummary(summary);
          }
          if (recommendations) {
            setAiRecommendations(recommendations);
          }
          if (courseAdjustments) {
            const deltas: Record<string, number> = {};
            courseAdjustments.forEach((ca: any) => {
              deltas[ca.courseId] = ca.delta || 0;
            });
            setCourseDeltas(deltas);
          }
          setIsSimulated(true);
          return;
        }
      }
    } catch {
      // Fallback client simulation if offline
    } finally {
      setIsSubmittingAi(false);
    }

    // Client-side fallback computation
    const mult = newConfig.scenario === 'sprint' ? 1.4 : newConfig.scenario === 'balance' ? 0.9 : 1.2;
    setWeeklyData(prev => prev.map(item => ({
      ...item,
      hours: Number((item.hours * mult).toFixed(1)),
      efficiency: Math.min(99, Math.round(item.efficiency * (newConfig.focusLevel / 85))),
      projectedHours: Number((item.hours * mult * 1.1).toFixed(1))
    })));

    setSimulatedRadar({
      velocity: Math.min(98, Math.round(newConfig.taskVelocity * 68)),
      adherence: Math.min(98, Math.round(newConfig.focusLevel * 0.95)),
      consistency: newConfig.scenario === 'balance' ? 95 : 88,
      problemSolving: Math.min(98, Math.round(newConfig.taskVelocity * 60 + newConfig.dailyHours * 4)),
      focusIndex: newConfig.focusLevel
    });

    const fallbackDeltas: Record<string, number> = {};
    courses.forEach(c => {
      fallbackDeltas[c.id] = Math.round(newConfig.taskVelocity * 8);
    });
    setCourseDeltas(fallbackDeltas);

    setAiSummary(
      promptText
        ? `Mô phỏng tùy biến AI: Đã điều chỉnh toàn bộ biểu đồ với mục tiêu "${promptText}". Hệ thống dự báo bạn sẽ tối ưu hóa 28% thời lượng tự học.`
        : `Kịch bản ${newConfig.scenario.toUpperCase()}: Giờ học trung bình ${newConfig.dailyHours}h/ngày, hiệu suất tập trung ${newConfig.focusLevel}%. Các chỉ số đã cập nhật tương thích.`
    );
    setAiRecommendations([
      'Duy trì khối lượng học tập theo đúng biểu đồ phân bổ ngày trong tuần.',
      'Sử dụng Planora AI để tóm tắt các tài liệu chuyên ngành trước khi làm bài.',
      'Đánh dấu hoàn thành ngay trên danh sách nhiệm vụ để hệ thống ghi nhận streak.'
    ]);
    setIsSimulated(true);
  };

  const handleResetSimulation = () => {
    setIsLiveSimulation(false);
    setIsSimulated(false);
    setWeeklyData(defaultWeeklyActivity);
    setSimulatedRadar(defaultRadarScores);
    setCourseDeltas({});
    setAiSummary('');
    setAiRecommendations([]);
    setSimulationConfig({
      dailyHours: 3.8,
      focusLevel: 85,
      taskVelocity: 1.15,
      scenario: 'custom'
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <div className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 border transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border-neutral-800 text-white'
          : 'bg-gradient-to-r from-indigo-50/70 via-white to-sky-50/60 border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-2xl relative z-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3.5 ${
            isDark 
              ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300' 
              : 'bg-indigo-100/80 border border-indigo-200 text-indigo-800'
          }`}>
            <Award className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Chuỗi học tập liên tục: 14 ngày • Hiệu suất tuần đạt 89%</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">
            Chào mừng đến với Planora! Hôm nay bạn có {pendingTasks.length} nhiệm vụ cần xử lý.
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
            Không gian quản lý kế hoạch & học tập toàn diện. Tích hợp biểu đồ trực quan, mô phỏng số liệu thời gian thực và phân tích lộ trình thông minh từ Planora AI.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5 relative z-10">
          <button
            type="button"
            onClick={() => onNavigate('tasks')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
          >
            Xem Danh Sách Nhiệm Vụ
          </button>
          <button
            type="button"
            onClick={() => onNavigate('timetable')}
            className={`px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark
                ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5 text-indigo-500" />
            <span>Thời Khóa Biểu</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('ai')}
            className={`px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark
                ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Hỏi Trợ Lý AI</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive AI Real-time Simulator & Dynamic Tuner */}
      <AiLiveSimulationControl
        config={simulationConfig}
        isLive={isLiveSimulation}
        onToggleLive={() => setIsLiveSimulation(!isLiveSimulation)}
        onApplyConfig={handleApplyConfig}
        onReset={handleResetSimulation}
        isSubmitting={isSubmittingAi}
        aiSummary={aiSummary}
        recommendations={aiRecommendations}
      />

      {/* 3. KPI Metrics Grid with Dynamic AI Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigate('courses')}
          className={`p-4 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5 ${
            isDark
              ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              : 'bg-white border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              Khoá Học Đang Học
            </span>
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {inProgressCourses.length}
          </div>
          <div className={`text-[11px] mt-1 flex items-center justify-between ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            <span>Tổng {courses.length} môn</span>
            {isSimulated && (
              <span className="text-emerald-500 font-semibold text-[10px]">
                +{Object.values(courseDeltas)[0] || 12}% tiến độ
              </span>
            )}
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigate('tasks')}
          className={`p-4 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5 ${
            isDark
              ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              : 'bg-white border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              Việc Cần Hoàn Thành
            </span>
            <CheckSquare className="w-4 h-4 text-amber-500" />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {pendingTasks.length}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>Đã làm xong {completedTasks.length} nhiệm vụ</span>
          </div>
        </div>

        {/* Metric 3: Dynamic Live Study Hours */}
        <div 
          className={`p-4 rounded-xl border transition-all ${
            isDark
              ? 'bg-neutral-900/60 border-neutral-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              Giờ Học Hôm Nay
            </span>
            <Zap className="w-4 h-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {weeklyData[weeklyData.length - 1]?.hours || simulationConfig.dailyHours}h
            </div>
            {isLiveSimulation && (
              <span className="text-[10px] text-emerald-500 font-bold animate-pulse">
                • Realtime
              </span>
            )}
          </div>
          <div className={`text-[11px] mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            Mục tiêu: {simulationConfig.dailyHours}h/ngày
          </div>
        </div>

        {/* Metric 4: AI Focus Score */}
        <div 
          className={`p-4 rounded-xl border transition-all ${
            isDark
              ? 'bg-neutral-900/60 border-neutral-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              Chỉ Số Tập Trung AI
            </span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-bold text-emerald-600 dark:text-emerald-400`}>
            {simulatedRadar.focusIndex}%
          </div>
          <div className={`text-[11px] mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            Tốc độ: {simulationConfig.taskVelocity}x chuẩn
          </div>
        </div>
      </div>

      {/* 4. Primary Graphical Charts Row (Activity Trend + Radar Performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Activity Trend Chart (Area + Bar + Forecast) */}
        <div className="lg:col-span-2">
          <StudyActivityChart
            data={weeklyData}
            isLive={isLiveSimulation}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>

        {/* Right 1 Col: AI Performance Radar (5-Axis Polygon) */}
        <div className="lg:col-span-1">
          <AiPerformanceRadar
            currentScores={currentRadar}
            simulatedScores={simulatedRadar}
            isSimulated={isSimulated || isLiveSimulation}
          />
        </div>
      </div>

      {/* 5. Secondary Row: Course Distribution Donut + Dynamic Course Progress Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart */}
        <div className="lg:col-span-1">
          <CourseDistributionDonut
            courses={courses}
            onSelectCourse={() => onNavigate('courses')}
          />
        </div>

        {/* Dynamic Course Progress Cards with Projected Boost */}
        <div className="lg:col-span-2">
          <div className={`p-4 sm:p-5 rounded-2xl border h-full flex flex-col justify-between transition-colors ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>Tiến Độ Khoá Học & Dự Báo Hoàn Thành AI</span>
                  </h3>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    {isSimulated 
                      ? '⚡ Đã áp dụng tính toán tương thích theo mục tiêu mô phỏng' 
                      : 'Số liệu thực tế theo số bài tập và học phần đã nghiệm thu'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer font-medium shrink-0"
                >
                  <span>Tất cả môn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {courses.slice(0, 3).map(course => {
                  const delta = courseDeltas[course.id] || 0;
                  const effectiveProgress = Math.min(100, course.progress + delta);

                  return (
                    <div 
                      key={course.id}
                      className={`p-3.5 rounded-xl border transition-colors ${
                        isDark 
                          ? 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700' 
                          : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="min-w-0">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded mr-2 ${
                            isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-white text-slate-700 border border-slate-200'
                          }`}>
                            {course.code}
                          </span>
                          <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {course.title}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5 shrink-0">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {effectiveProgress}%
                          </span>
                          {delta > 0 && (
                            <span className="text-[10px] font-bold text-emerald-500">
                              (+{delta}%)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Dual Layer Progress Bar */}
                      <div className={`w-full h-2 rounded-full overflow-hidden mb-2 relative ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}>
                        {/* Current base progress */}
                        <div 
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                        {/* Simulated delta boost */}
                        {delta > 0 && (
                          <div 
                            className="h-full bg-emerald-400 rounded-full opacity-70 transition-all duration-700"
                            style={{ 
                              position: 'absolute', 
                              left: `${course.progress}%`, 
                              width: `${Math.min(100 - course.progress, delta)}%`,
                              top: 0 
                            }}
                          />
                        )}
                      </div>

                      <div className={`flex items-center justify-between text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                        <span>GV: {course.instructor}</span>
                        <span>{course.completedLessons}/{course.totalLessons} bài hoàn tất</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {isSimulated && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dự báo hoàn tất sớm hơn dự kiến 5 ngày</span>
                </span>
                <span className="font-semibold">Mục tiêu: Đạt loại Giỏi (A)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. Tasks, Timetable, Goals & Notes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Checklist of Pending Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <CheckSquare className="w-4 h-4 text-amber-500" />
                <span>Nhiệm Vụ Cần Làm Gần Nhất</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('tasks')}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Mở toàn bộ ({pendingTasks.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {pendingTasks.slice(0, 4).map(task => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700' 
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.status === 'done'}
                      onChange={() => onToggleTask(task.id, task.status)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer shrink-0"
                    />
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${
                        task.status === 'done' 
                          ? 'line-through text-slate-400 dark:text-neutral-500' 
                          : isDark ? 'text-neutral-200' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 dark:text-neutral-400 flex-wrap">
                        {task.courseName && (
                          <span className="font-medium text-slate-500 dark:text-neutral-400 truncate max-w-[140px]">{task.courseName}</span>
                        )}
                        <span className="inline-flex items-center gap-1 leading-none shrink-0">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>Hạn: {task.dueDate}</span>
                        </span>
                        {task.isAiGenerated && (
                          <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                            AI
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    task.priority === 'urgent'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
                      : task.priority === 'high'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                      : 'bg-slate-200 text-slate-700 dark:bg-neutral-800 dark:text-neutral-400'
                  }`}>
                    {task.priority === 'urgent' ? 'Khẩn cấp' : task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Timetable Preview & Active Goals */}
        <div className="space-y-6">
          {/* Weekly Timetable Preview Widget */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <CalendarDays className="w-4 h-4 text-indigo-500" />
                <span>Thời Khóa Biểu Tuần Này</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('timetable')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Xem TKB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {scheduledItems.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('timetable')}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700' 
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 dark:text-neutral-400">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-indigo-500" />
                          <span>{item.time}</span>
                        </span>
                        {item.room && (
                          <span className="flex items-center gap-1 font-semibold truncate text-indigo-600 dark:text-indigo-400">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{item.room.replace(/^(phòng|phong)\s*:?\s*/i, '')}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shrink-0">
                      {item.day ? dayLabels[item.day] : ''} • {item.session === 'morning' ? 'Sáng' : 'Chiều'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('timetable')}
              className={`w-full mt-3 py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                isDark 
                  ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-200' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              }`}
            >
              <span>Mở bảng thời khóa biểu đầy đủ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Goals */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Target className="w-4 h-4 text-emerald-500" />
                <span>Mục Tiêu Tự Học</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('goals')}
                className={`text-xs hover:underline cursor-pointer ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Chi tiết
              </button>
            </div>

            <div className="space-y-4">
              {goals.slice(0, 3).map(goal => {
                const percent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
                return (
                  <div key={goal.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className={`font-medium truncate pr-2 ${isDark ? 'text-neutral-200' : 'text-slate-700'}`}>
                        {goal.title}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        {percent}%
                      </span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}>
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className={`text-[10px] text-right ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                      {goal.currentValue} / {goal.targetValue} {goal.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
