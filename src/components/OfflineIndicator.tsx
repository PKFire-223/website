import React, { useState } from 'react';
import { WifiOff, CheckCircle2, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [dismissed, setDismissed] = useState(false);

  // If online, reset dismissed state so it shows up next time offline occurs
  if (isOnline) {
    if (dismissed) setDismissed(false);
    return null;
  }

  if (dismissed) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 max-w-sm rounded-2xl bg-slate-900/95 text-white p-3.5 shadow-2xl backdrop-blur-md border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
          <WifiOff className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
            <span>Chế độ ngoại tuyến (Offline Mode)</span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            Dữ liệu từ vựng đã được lưu đệm trong máy. Bạn vẫn có thể tra cứu, học từ và làm bài tập mượt mà!
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Bộ nhớ đệm Service Worker đang hoạt động</span>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
