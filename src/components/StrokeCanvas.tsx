import React, { useRef, useState, useEffect } from 'react';
import {
  RotateCcw,
  Eraser,
  PenTool,
  Volume2,
  Sparkles,
  Eye,
  EyeOff,
  Grid,
  Check,
} from 'lucide-react';
import { speak } from '../utils/speech';

interface StrokeCanvasProps {
  initialChar?: string;
  isDarkMode?: boolean;
}

interface StrokePoint {
  x: number;
  y: number;
}

export const StrokeCanvas: React.FC<StrokeCanvasProps> = ({
  initialChar = '你',
  isDarkMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<StrokePoint[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<StrokePoint[]>([]);

  const [currentChar, setCurrentChar] = useState<string>(initialChar);
  const [showGhost, setShowGhost] = useState<boolean>(true);
  const [ghostOpacity, setGhostOpacity] = useState<number>(0.18);
  const [gridType, setGridType] = useState<'mi' | 'tian' | 'none'>('mi'); // 米字格, 田字格
  const [brushColor, setBrushColor] = useState<string>('#1e293b'); // default ink
  const [brushWidth, setBrushWidth] = useState<number>(8);

  const practiceChars = [
    { char: '一', pinyin: 'yī', hanviet: 'Nhất', strokes: 1 },
    { char: '人', pinyin: 'rén', hanviet: 'Nhân', strokes: 2 },
    { char: '十', pinyin: 'shí', hanviet: 'Thập', strokes: 2 },
    { char: '三', pinyin: 'sān', hanviet: 'Tam', strokes: 3 },
    { char: '大', pinyin: 'dà', hanviet: 'Đại', strokes: 3 },
    { char: '小', pinyin: 'xiǎo', hanviet: 'Tiểu', strokes: 3 },
    { char: '口', pinyin: 'kǒu', hanviet: 'Khẩu', strokes: 3 },
    { char: '中', pinyin: 'zhōng', hanviet: 'Trung', strokes: 4 },
    { char: '水', pinyin: 'shuǐ', hanviet: 'Thủy', strokes: 4 },
    { char: '你', pinyin: 'nǐ', hanviet: 'Nhĩ', strokes: 7 },
    { char: '好', pinyin: 'hǎo', hanviet: 'Hảo', strokes: 6 },
    { char: '爱', pinyin: 'ài', hanviet: 'Ái', strokes: 10 },
    { char: '学', pinyin: 'xué', hanviet: 'Học', strokes: 8 },
    { char: '国', pinyin: 'guó', hanviet: 'Quốc', strokes: 8 },
  ];

  // Draw canvas contents
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Draw Grid (米字格 or 田字格)
    if (gridType !== 'none') {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDarkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(239, 68, 68, 0.25)'; // traditional red grid or indigo
      ctx.setLineDash([4, 4]);

      // Center cross (田字格)
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Diagonals for 米字格
      if (gridType === 'mi') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, height);
        ctx.moveTo(width, 0);
        ctx.lineTo(0, height);
        ctx.stroke();
      }

      // Outer border (solid)
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = isDarkMode ? 'rgba(99, 102, 241, 0.4)' : 'rgba(239, 68, 68, 0.4)';
      ctx.strokeRect(0, 0, width, height);
      ctx.restore();
    }

    // Draw Ghost Reference Character
    if (showGhost && currentChar) {
      ctx.save();
      ctx.font = `bold ${width * 0.72}px "KaiTi", "STKaiti", "SimSun", "Noto Serif SC", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isDarkMode
        ? `rgba(255, 255, 255, ${ghostOpacity})`
        : `rgba(15, 23, 42, ${ghostOpacity})`;
      ctx.fillText(currentChar, width / 2, height / 2 + width * 0.04);
      ctx.restore();
    }

    // Draw user ink strokes
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const allStrokes = [...strokes, currentStroke];
    allStrokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = isDarkMode && brushColor === '#1e293b' ? '#f8fafc' : brushColor;
      ctx.lineWidth = brushWidth;
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
    ctx.restore();
  };

  useEffect(() => {
    redrawCanvas();
  }, [strokes, currentStroke, currentChar, showGhost, ghostOpacity, gridType, brushColor, brushWidth, isDarkMode]);

  // Coordinates helper
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  // Mouse handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    setCurrentStroke([coords]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    setCurrentStroke((prev) => [...prev, coords]);
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const currentCharData = practiceChars.find((c) => c.char === currentChar);

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Left: Canvas Area */}
        <div className="flex flex-col items-center mx-auto lg:mx-0 w-full sm:w-auto">
          {/* Canvas Box */}
          <div className="relative p-2 rounded-3xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-inner">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
              className="touch-none cursor-crosshair rounded-2xl block bg-white dark:bg-slate-900"
            />
          </div>

          {/* Under-canvas controls */}
          <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
              title="Hoàn tác nét vừa viết"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hoàn tác nét</span>
            </button>

            <button
              onClick={handleClear}
              disabled={strokes.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900 disabled:opacity-40 transition-colors"
              title="Xóa trắng bảng vẽ"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Xóa hết</span>
            </button>

            <button
              onClick={() => setShowGhost((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                showGhost
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {showGhost ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Chữ mẫu đồ nét</span>
            </button>
          </div>
        </div>

        {/* Right: Character Info, Options & Presets */}
        <div className="flex-1 space-y-6 w-full">
          {/* Current Character Header */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-serif font-black text-indigo-600 dark:text-indigo-400">
                {currentChar}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-100">
                    {currentCharData?.pinyin || ''}
                  </span>
                  <button
                    onClick={() => speak(currentChar, 'zh')}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Hán-Việt: <strong>{currentCharData?.hanviet || ''}</strong> &bull; {currentCharData?.strokes || 0} nét bút
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Đã viết {strokes.length} nét
              </span>
            </div>
          </div>

          {/* Quick Character Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
              Chọn Chữ Hán Mẫu Để Tập Viết:
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {practiceChars.map((item) => {
                const isSelected = currentChar === item.char;
                return (
                  <button
                    key={item.char}
                    onClick={() => {
                      setCurrentChar(item.char);
                      handleClear();
                    }}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-black shadow-xs ring-2 ring-indigo-300 dark:ring-indigo-700 border-indigo-600'
                        : isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-lg font-serif block">{item.char}</span>
                    <span className="text-[10px] block opacity-80 font-mono">{item.pinyin}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brush & Grid Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            {/* Grid selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                Khung lưới luyện chữ:
              </label>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'mi', label: '米字格 (Mễ)' },
                  { id: 'tian', label: '田字格 (Điền)' },
                  { id: 'none', label: 'Không lưới' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGridType(g.id as any)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                      gridType === g.id
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brush Width */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                Nét cọ viết: {brushWidth}px
              </label>
              <div className="flex items-center gap-2">
                {[
                  { width: 4, label: 'Thanh' },
                  { width: 8, label: 'Vừa' },
                  { width: 14, label: 'Đậm' },
                ].map((b) => (
                  <button
                    key={b.width}
                    onClick={() => setBrushWidth(b.width)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                      brushWidth === b.width
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
