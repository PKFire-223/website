import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, MicOff, CheckCircle2, RotateCcw, X, Sparkles, AlertCircle } from 'lucide-react';
import { VocabWord } from '../types';
import { speak, isSpeechRecognitionSupported, calculatePronunciationScore } from '../utils/speech';

interface PronunciationModalProps {
  word: VocabWord;
  onClose: () => void;
  onScoreSave?: (score: number) => void;
  isDarkMode?: boolean;
}

export const PronunciationModal: React.FC<PronunciationModalProps> = ({
  word,
  onClose,
  onScoreSave,
  isDarkMode = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [practiceMode, setPracticeMode] = useState<'word' | 'sentence'>('word');
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const targetText = practiceMode === 'word' ? word.word : word.example;

  const handlePlayAudio = (speed: number = playbackSpeed) => {
    setIsPlaying(true);
    speak(targetText, word.language, speed, () => {
      setIsPlaying(false);
    });
  };

  const startListening = () => {
    if (!isSpeechRecognitionSupported()) {
      setRecognitionError(
        'Trình duyệt hiện tại không hỗ trợ Web Speech API. Bạn vui lòng sử dụng Google Chrome hoặc Microsoft Edge để luyện nói micro.'
      );
      return;
    }

    setRecognitionError(null);
    setSpokenText('');
    setScore(null);
    setFeedback('');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = word.language === 'en' ? 'en-US' : 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setSpokenText(speechResult);

      // Evaluate pronunciation score
      const evaluatedScore = calculatePronunciationScore(speechResult, targetText);
      setScore(evaluatedScore);

      if (evaluatedScore >= 85) {
        setFeedback('Xuất sắc! Phát âm chuẩn xác ngữ điệu.');
      } else if (evaluatedScore >= 65) {
        setFeedback('Khá tốt! Chú ý thêm trọng âm và âm đuôi.');
      } else {
        setFeedback('Chưa thật chính xác. Hãy nghe lại phát âm mẫu và thử lại nhé!');
      }

      if (onScoreSave) {
        onScoreSave(evaluatedScore);
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === 'no-speech') {
        setRecognitionError('Không phát hiện thấy giọng nói. Vui lòng thử lại gần micro hơn.');
      } else if (event.error === 'not-allowed') {
        setRecognitionError('Quyền truy cập micro đã bị từ chối. Hãy cho phép micro trong cài đặt trình duyệt.');
      } else {
        setRecognitionError(`Lỗi micro: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h3 className="text-base font-black">Luyện Đọc Phát Âm Với Micro</h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Target Word Card */}
          <div
            className={`p-6 rounded-2xl border text-center space-y-2 ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              {word.partOfSpeech}
            </span>
            <div className="text-3xl sm:text-4xl font-black">{word.word}</div>
            <div className="text-sm font-mono font-bold text-indigo-700">{word.phonetic}</div>
            {word.sinoVietnamese && (
              <div className="text-xs font-bold text-rose-600">
                Hán-Việt: {word.sinoVietnamese}
              </div>
            )}
            <div className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {word.vietnameseMeaning}
            </div>
          </div>

          {/* Audio Reference Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handlePlayAudio(1.0)}
              disabled={isPlaying}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe mẫu (1.0x)</span>
            </button>

            <button
              onClick={() => handlePlayAudio(0.75)}
              disabled={isPlaying}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
                isDarkMode ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              0.75x chậm
            </button>
          </div>

          {/* Micro Recording Action */}
          <div className="text-center space-y-3 py-2">
            {!isListening ? (
              <button
                onClick={startListening}
                className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/20 transition-transform active:scale-95"
                title="Bấm để bắt đầu đọc"
              >
                <Mic className="w-8 h-8" />
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="w-20 h-20 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-500/30 animate-pulse transition-transform active:scale-95"
                title="Bấm để dừng"
              >
                <MicOff className="w-8 h-8" />
              </button>
            )}

            <div className={`text-xs font-bold ${isListening ? 'text-rose-600' : isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isListening ? 'Đang lắng nghe... Hãy đọc to và rõ ràng' : 'Nhấn nút Micro và đọc từ vựng'}
            </div>
          </div>

          {/* Error Message */}
          {recognitionError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{recognitionError}</span>
            </div>
          )}

          {/* Feedback & Score */}
          {score !== null && (
            <div
              className={`p-4 rounded-2xl border text-center space-y-1.5 animate-in fade-in duration-200 ${
                score >= 80
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : score >= 50
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider">
                Điểm phát âm của bạn:
              </div>
              <div className="text-3xl font-black">{score}%</div>
              <div className="text-xs font-semibold">{feedback}</div>
              {spokenText && (
                <div className="text-[11px] opacity-80 pt-1">
                  Máy ghi nhận bạn đã nói: &ldquo;{spokenText}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
