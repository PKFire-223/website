import React, { useState } from 'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Language } from '../types';
import { SITUATIONAL_DIALOGUES, SituationalTopic, DialogueLine } from '../data/dialogueData';
import { speak } from '../utils/speech';

interface SituationalDialogueProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode?: boolean;
}

export const SituationalDialogue: React.FC<SituationalDialogueProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode = false,
}) => {
  // Available topics for active language
  const availableTopics = SITUATIONAL_DIALOGUES.filter((d) => d.language === currentLang);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    availableTopics[0]?.id || (currentLang === 'en' ? 'en-airport' : 'zh-hotel')
  );

  const [showPinyin, setShowPinyin] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [playingLineIndex, setPlayingLineIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);

  // Active topic
  const currentTopic = availableTopics.find((t) => t.id === selectedTopicId) || availableTopics[0];

  // Play individual sentence
  const handlePlayLine = (text: string, index: number, speed: number = 1.0) => {
    setPlayingLineIndex(index);
    speak(text, currentLang, speed, () => {
      setPlayingLineIndex(null);
    });
  };

  // Play all lines sequentially
  const handlePlayAll = () => {
    if (!currentTopic) return;
    setIsPlayingAll(true);

    let idx = 0;
    const playNext = () => {
      if (idx >= currentTopic.dialogue.length) {
        setIsPlayingAll(false);
        setPlayingLineIndex(null);
        return;
      }
      setPlayingLineIndex(idx);
      const line = currentTopic.dialogue[idx];
      speak(line.text, currentLang, 1.0, () => {
        idx++;
        setTimeout(playNext, 600); // 600ms natural conversational pause
      });
    };

    playNext();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-sm border border-indigo-500/20">
                💬
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Giao Tiếp Tình Huống Thực Tế Bản Xứ
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Hội Thoại Đời Sống & Mẫu Câu Thực Chiến
            </h1>
            <p
              className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Học hội thoại phản xạ tự nhiên qua các tình huống sân bay, nhà hàng, mua sắm mặc cả, khách sạn và phỏng vấn công sở.
              Có tính năng nghe từng câu hoặc nghe toàn bài với ngắt nghỉ tự nhiên.
            </p>
          </div>

          {/* Language Switcher */}
          <div
            className={`p-1.5 rounded-2xl border flex items-center shrink-0 ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => {
                onLanguageChange('en');
                setSelectedTopicId('en-airport');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇬🇧 Tiếng Anh</span>
            </button>
            <button
              onClick={() => {
                onLanguageChange('zh');
                setSelectedTopicId('zh-hotel');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'zh'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇨🇳 Tiếng Trung</span>
            </button>
          </div>
        </div>
      </div>

      {/* Topic Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {availableTopics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                  : isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-1.5">{topic.icon}</div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-0.5">
                {topic.vietnameseTitle}
              </h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold font-mono line-clamp-1">
                {topic.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Conversation Main Player Card */}
      {currentTopic && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}
        >
          {/* Header of Active Conversation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{currentTopic.icon}</span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {currentTopic.vietnameseTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                {currentTopic.description}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handlePlayAll}
                disabled={isPlayingAll}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isPlayingAll ? 'Đang phát hội thoại...' : 'Nghe toàn bộ hội thoại'}</span>
              </button>

              {currentLang === 'zh' && (
                <button
                  onClick={() => setShowPinyin((p) => !p)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    showPinyin
                      ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900'
                      : 'text-slate-500 hover:bg-slate-50 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {showPinyin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Pinyin</span>
                </button>
              )}

              <button
                onClick={() => setShowTranslation((t) => !t)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  showTranslation
                    ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900'
                    : 'text-slate-500 hover:bg-slate-50 border-slate-200 dark:border-slate-800'
                }`}
              >
                {showTranslation ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Dịch nghĩa</span>
              </button>
            </div>
          </div>

          {/* Dialogue Chat Bubbles */}
          <div className="space-y-4 py-2">
            {currentTopic.dialogue.map((line, idx) => {
              const isPlaying = playingLineIndex === idx;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start justify-between gap-4 ${
                    isPlaying
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                      : isDarkMode
                      ? 'bg-slate-950/60 border-slate-800'
                      : isEven
                      ? 'bg-slate-50/80 border-slate-200/90'
                      : 'bg-white border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    {/* Speaker Avatar */}
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                      {line.avatar}
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {line.speaker}
                      </div>

                      {/* Hanzi / English Text */}
                      <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                        {line.text}
                      </div>

                      {/* Optional Pinyin */}
                      {currentLang === 'zh' && showPinyin && line.pinyin && (
                        <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                          {line.pinyin}
                        </div>
                      )}

                      {/* Vietnamese Translation */}
                      {showTranslation && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                          &rarr; {line.translation}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Audio Controls for this specific line */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handlePlayLine(line.text, idx, 1.0)}
                      disabled={isPlaying}
                      className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 transition-colors cursor-pointer"
                      title="Nghe chuẩn bản xứ (1.0x)"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handlePlayLine(line.text, idx, 0.75)}
                      disabled={isPlaying}
                      className="px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Nghe chậm (0.75x)"
                    >
                      0.75x
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Phrases & Takeaways Section */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Mẫu Câu & Cụm Từ Ăn Điểm Trong Tình Huống Này:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentTopic.keyPhrases.map((kp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"
                >
                  <div className="font-extrabold text-xs sm:text-sm text-indigo-600 dark:text-indigo-400">
                    {kp.phrase}
                  </div>
                  {kp.pinyin && (
                    <div className="text-[11px] font-mono text-slate-400">({kp.pinyin})</div>
                  )}
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {kp.meaning}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    Mẹo: {kp.usageTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
