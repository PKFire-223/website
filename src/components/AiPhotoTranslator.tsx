import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Image as ImageIcon,
  Languages,
  HelpCircle,
  FileText,
  Briefcase,
  GraduationCap,
  Utensils,
  Landmark,
} from 'lucide-react';
import { Language } from '../types';
import { speak } from '../utils/speech';

interface AiPhotoTranslatorProps {
  currentLang: Language;
  isDarkMode?: boolean;
}

const CONTEXT_OPTIONS = [
  { id: 'daily', label: 'Giao tiếp hằng ngày', icon: Languages, desc: 'Khẩu ngữ tự nhiên, từ lóng đời sống' },
  { id: 'business', label: 'Thương mại & Hợp đồng', icon: Briefcase, desc: 'Văn phong trang trọng, chuẩn xác đàm phán' },
  { id: 'academic', label: 'Học thuật & Đề thi', icon: GraduationCap, desc: 'Thuật ngữ chính xác chuẩn Oxford / HSK' },
  { id: 'cuisine', label: 'Ẩm thực & Thực đơn', icon: Utensils, desc: 'Món ăn, nguyên liệu, hương vị đặc sản' },
  { id: 'culture', label: 'Văn hóa & Lịch sử', icon: Landmark, desc: 'Điển tích, thành ngữ, sắc thái truyền thống' },
];

const SAMPLE_TEXTS = {
  en: [
    {
      title: 'Biển báo quy định sân bay London',
      text: 'Please have your boarding pass and travel documents ready for inspection. Passengers with special assistance requirements should proceed to Gate 14.',
      context: 'Giao tiếp hằng ngày & Du lịch quốc tế',
    },
    {
      title: 'Thỏa thuận bảo mật doanh nghiệp',
      text: 'The Receiving Party agrees to hold all Proprietary Information in strict confidence and not to disclose such Information to any unauthorized third party without prior written consent.',
      context: 'Thương mại & Hợp đồng',
    },
  ],
  zh: [
    {
      title: 'Thực đơn món ăn truyền thống Tứ Xuyên',
      text: '麻婆豆腐：色泽红亮，麻辣浓香，豆腐嫩滑，牛肉香酥。宫保鸡丁：红而不辣，辣而不燥，肉质滑脆。',
      context: 'Ẩm thực & Thực đơn',
    },
    {
      title: 'Trích đoạn luận ngữ triết học HSK6',
      text: '知之者不如好之者，好之者不如乐之者。学而不思则罔，思而不学则殆。唯有笃行不倦，方能登峰造极。',
      context: 'Văn hóa & Lịch sử',
    },
  ],
};

export const AiPhotoTranslator: React.FC<AiPhotoTranslatorProps> = ({
  currentLang,
  isDarkMode = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('image/jpeg');
  const [inputText, setInputText] = useState<string>('');
  const [selectedContext, setSelectedContext] = useState<string>('daily');
  const [customContext, setCustomContext] = useState<string>('');
  const [targetLang, setTargetLang] = useState<string>('vi');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translationResult, setTranslationResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageMime(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setTranslationResult(null);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim() && !selectedImage) {
      setErrorMessage('Vui lòng nhập văn bản hoặc tải ảnh lên để chuyên gia AI dịch thuật.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setTranslationResult(null);

    const activeContextObj = CONTEXT_OPTIONS.find((c) => c.id === selectedContext);
    const fullContext = customContext.trim()
      ? `${activeContextObj?.label}: ${customContext.trim()}`
      : activeContextObj?.label || 'Đời sống giao tiếp';

    try {
      const response = await fetch('/api/ai-translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText.trim(),
          imageBase64: selectedImage,
          mimeType: imageMime,
          sourceLang: currentLang === 'en' ? 'Tiếng Anh' : 'Tiếng Trung',
          targetLang: targetLang === 'vi' ? 'Tiếng Việt' : targetLang === 'en' ? 'Tiếng Anh' : 'Tiếng Trung',
          context: fullContext,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Lỗi kết nối máy chủ dịch thuật AI');
      }

      setTranslationResult(data.result);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Không thể thực hiện dịch thuật AI. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!translationResult) return;
    navigator.clipboard.writeText(translationResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const applySample = (sample: { text: string; context: string }) => {
    setInputText(sample.text);
    handleClearImage();
    setTranslationResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm relative overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800 text-white'
            : 'bg-gradient-to-r from-indigo-50/80 via-sky-50/50 to-white border-indigo-100 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chuyên Gia Dịch Thuật AI &bull; 20 Năm Kinh Nghiệm Chuyên Ngành</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dịch Thuật Qua Ảnh & Ngữ Cảnh Chuyên Nghiệp
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Trích xuất chữ từ ảnh chụp biển báo, thực đơn, trang sách hoặc tài liệu. Phân tích ngữ cảnh văn hóa,
              tách từ vựng đắt giá kèm Pinyin/IPA và cung cấp bản dịch chuẩn mực &ldquo;Tín - Đạt - Nhã&rdquo;.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold text-center">
              <span className="block text-xl font-black">20+</span>
              <span className="text-[10px] uppercase tracking-wider opacity-90">Năm kinh nghiệm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input (Photo + Text + Context) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Photo Upload Card */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold flex items-center gap-2">
                <Camera className="w-4 h-4 text-indigo-600" />
                <span>1. Tải ảnh hoặc Chụp ảnh tài liệu</span>
              </h3>
              {selectedImage && (
                <button
                  onClick={handleClearImage}
                  className="text-xs text-rose-500 hover:underline font-bold cursor-pointer"
                >
                  Xóa ảnh
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {selectedImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-indigo-200 dark:border-indigo-900 group">
                <img
                  src={selectedImage}
                  alt="Ảnh tài liệu cần dịch"
                  className="w-full max-h-60 object-contain bg-black/5 dark:bg-black/40"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/80 text-white text-xs font-bold hover:bg-slate-900 cursor-pointer shadow-md"
                >
                  Đổi ảnh khác
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all hover:border-indigo-500 ${
                  isDarkMode
                    ? 'border-slate-800 bg-slate-950/40 hover:bg-slate-950'
                    : 'border-slate-300 bg-slate-50/50 hover:bg-indigo-50/30'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Bấm vào đây để chọn ảnh hoặc chụp ảnh
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Hỗ trợ JPG, PNG, WEBP (Biển hiệu, menu, sách, đề thi, hợp đồng...)
                </p>
              </div>
            )}

            {/* Or Text Input */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span>Hoặc nhập văn bản trực tiếp:</span>
                <span className="text-[10px] text-slate-400">{inputText.length} ký tự</span>
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                placeholder={
                  currentLang === 'en'
                    ? 'Nhập câu tiếng Anh hoặc đoạn văn cần dịch...'
                    : 'Nhập câu tiếng Trung hoặc đoạn văn cần dịch...'
                }
                className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm outline-none transition-all resize-none ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600 focus:bg-white'
                }`}
              />
            </div>

            {/* Quick Sample Templates */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400">Thử nhanh mẫu thực tế:</span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_TEXTS[currentLang].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => applySample(sample)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50'
                    }`}
                  >
                    {sample.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Context Setup Card (20 Years Experience Setting) */}
          <div
            className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-sm font-extrabold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>2. Thiết lập ngữ cảnh dịch thuật (Chuẩn 20 năm kinh nghiệm)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CONTEXT_OPTIONS.map((c) => {
                const Icon = c.icon;
                const isSelected = selectedContext === c.id;

                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContext(c.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                        : isDarkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                    <div>
                      <span className="block text-xs font-bold leading-tight">{c.label}</span>
                      <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {c.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Ghi chú ngữ cảnh thêm (tùy chọn):
              </label>
              <input
                type="text"
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder="Ví dụ: Tài liệu gửi khách hàng VIP, dịch theo văn phong thân mật..."
                className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none transition-all ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'
                }`}
              />
            </div>

            {/* Translate Button */}
            <div className="pt-2">
              <button
                onClick={handleTranslate}
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-2xl bg-indigo-600 text-white font-extrabold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Chuyên gia AI đang phân tích & chuyển ngữ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Dịch thuật chuẩn Chuyên Gia 20 năm kinh nghiệm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Expert Output */}
        <div className="lg:col-span-6 space-y-6">
          <div
            className={`p-6 rounded-3xl border shadow-xs min-h-[520px] flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-sm font-extrabold">Kết Quả Phân Tích & Chuyển Ngữ Chuyên Gia</h3>
                </div>

                {translationResult && (
                  <button
                    onClick={handleCopyResult}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isDarkMode
                        ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Đã sao chép' : 'Sao chép'}</span>
                  </button>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Content Body */}
              {isLoading ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-3xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center animate-bounce">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Chuyên gia đang chuyển dịch...</p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Đang nhận diện ký tự, đối chiếu ngữ cảnh văn hóa và tra cứu từ vựng học thuật.
                    </p>
                  </div>
                </div>
              ) : translationResult ? (
                <div className="mt-5 prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
                  <div className="whitespace-pre-wrap font-sans">{translationResult}</div>
                </div>
              ) : (
                <div className="py-24 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 text-2xl">
                    📖
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Sẵn sàng tiếp nhận tài liệu
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Tải ảnh tài liệu hoặc nhập văn bản ở cột bên trái và bấm &ldquo;Dịch thuật chuẩn Chuyên Gia&rdquo; để nhận kết quả phân tích học thuật.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Tip */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Mô hình AI: Gemini 3.8 Flash Multimodal &bull; Ngữ cảnh chuyên ngành 20 năm</span>
              <span>Oxford & HSK Standard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
