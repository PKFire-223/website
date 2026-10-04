import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  isDarkMode?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ isDarkMode = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running as an installed standalone PWA, hide the button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      await install();
    } finally {
      setIsInstalling(false);
    }
  };

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        title="Cài đặt ứng dụng LinguaVocab để học ngoại tuyến và mở nhanh"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm ${
          isDarkMode
            ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 text-indigo-200 border-indigo-700/60 hover:border-indigo-500'
            : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-100/60'
        }`}
      >
        <Download className="w-3.5 h-3.5 text-indigo-500 animate-bounce" />
        <span className="hidden sm:inline">Cài App</span>
        <span className="sm:hidden">Cài</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          title="Cài đặt lên màn hình chính iPhone / iPad"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm ${
            isDarkMode
              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Download className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden sm:inline">Cài đặt iOS</span>
          <span className="sm:hidden">Cài</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
              className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border transition-all ${
                isDarkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                    LV
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Cài đặt LinguaVocab</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Dành cho iPhone & iPad</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3.5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block font-semibold">Bước 1: Nhấn nút Chia sẻ</strong>
                    <span className="text-slate-500 dark:text-slate-400">
                      Nhấn vào biểu tượng Chia sẻ (Share) ở thanh công cụ Safari phía dưới.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block font-semibold">Bước 2: Thêm vào MH chính</strong>
                    <span className="text-slate-500 dark:text-slate-400">
                      Cuộn danh sách xuống và chọn <strong>"Thêm vào MH chính" (Add to Home Screen)</strong>.
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md shadow-indigo-600/30"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
