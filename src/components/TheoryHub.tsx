import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Search,
  PenTool,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Lightbulb,
  FileText,
  Bookmark,
  ChevronRight,
  ArrowRight,
  List,
  Compass,
} from 'lucide-react';
import { Language } from '../types';
import {
  ENGLISH_IPA_SOUNDS,
  ENGLISH_TENSES,
  COMMON_IRREGULAR_VERBS,
  CHINESE_INITIALS,
  CHINESE_FINALS,
  CHINESE_STROKES,
  CHINESE_STROKE_ORDER_RULES,
  COMMON_CHINESE_RADICALS,
} from '../data/theoryData';
import { StrokeCanvas } from './StrokeCanvas';
import { speak, getPreferredAccent, setPreferredAccent, EnglishAccent } from '../utils/speech';

interface TheoryHubProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode?: boolean;
}

export const TheoryHub: React.FC<TheoryHubProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode = false,
}) => {
  // English sub-tabs
  const [enSubTab, setEnSubTab] = useState<'ipa' | 'tenses' | 'irregular' | 'suffixes' | 'methods'>('ipa');
  // Chinese sub-tabs
  const [zhSubTab, setZhSubTab] = useState<'pinyin' | 'tones' | 'strokes' | 'canvas' | 'radicals' | 'hanviet'>('pinyin');

  // Search filters
  const [irregularSearch, setIrregularSearch] = useState('');
  const [radicalSearch, setRadicalSearch] = useState('');
  const [ipaTypeFilter, setIpaTypeFilter] = useState<string>('all');
  const [currentAccent, setCurrentAccent] = useState<EnglishAccent>(getPreferredAccent());

  const handleAccentChange = (accent: EnglishAccent) => {
    setCurrentAccent(accent);
    setPreferredAccent(accent);
  };

  // Filtered irregular verbs
  const filteredIrregulars = COMMON_IRREGULAR_VERBS.filter((v) => {
    if (!irregularSearch.trim()) return true;
    const q = irregularSearch.toLowerCase().trim();
    return (
      v.v1.toLowerCase().includes(q) ||
      v.v2.toLowerCase().includes(q) ||
      v.v3.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q)
    );
  });

  // Filtered radicals
  const filteredRadicals = COMMON_CHINESE_RADICALS.filter((r) => {
    if (!radicalSearch.trim()) return true;
    const q = radicalSearch.toLowerCase().trim();
    return (
      r.radical.toLowerCase().includes(q) ||
      r.pinyin.toLowerCase().includes(q) ||
      r.sinoVietnamese.toLowerCase().includes(q) ||
      r.meaning.toLowerCase().includes(q)
    );
  });

  // Filtered IPA sounds
  const filteredIpaSounds = ENGLISH_IPA_SOUNDS.filter((s) => {
    if (ipaTypeFilter === 'all') return true;
    return s.type === ipaTypeFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      {/* Top Banner */}
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
                📚
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Cẩm Nang Lý Thuyết & Nền Tảng Ngôn Ngữ
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {currentLang === 'en'
                ? 'Học Ngữ Âm IPA, Ngữ Pháp 12 Thì & Động Từ Bất Quy Tắc'
                : 'Bảng Ngữ Âm Pinyin, 8 Nét Bút Thuận & Bộ Thủ Chữ Hán'}
            </h1>
            <p
              className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Hệ thống hóa toàn bộ kiến thức nền tảng từ sơ cấp đến nâng cao. Bấm vào bất kỳ âm mẫu hay từ vựng nào
              để nghe phát âm giọng bản xứ chuẩn xác!
            </p>
          </div>

          {/* Language Switcher Buttons inside Banner */}
          <div
            className={`p-1.5 rounded-2xl border flex items-center shrink-0 ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => onLanguageChange('en')}
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
              onClick={() => onLanguageChange('zh')}
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

      {/* ========================================================================= */}
      {/* SECTION 1: ENGLISH THEORY HUB                                             */}
      {/* ========================================================================= */}
      {currentLang === 'en' && (
        <div className="space-y-6">
          {/* Sub-tab navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'ipa', label: '44 Âm Quốc Tế (IPA)', icon: Volume2 },
              { id: 'tenses', label: '12 Thì Tiếng Anh', icon: BookOpen },
              { id: 'irregular', label: 'Động Từ Bất Quy Tắc', icon: List },
              { id: 'suffixes', label: 'Phát Âm Đuôi -s/-es & -ed', icon: Lightbulb },
              { id: 'methods', label: 'Bí Quyết Học Từ Vựng', icon: Sparkles },
            ].map((tab) => {
              const isSelected = enSubTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setEnSubTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: 44 IPA PHONETIC SOUNDS */}
          {enSubTab === 'ipa' && (
            <div className="space-y-6">
              {/* Accent & Type Filter Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                  <span className="text-xs font-bold text-slate-400 mr-1">Bộ lọc âm:</span>
                  {[
                    { id: 'all', label: 'Tất cả (44 âm)' },
                    { id: 'vowel-short', label: 'Nguyên âm ngắn (7)' },
                    { id: 'vowel-long', label: 'Nguyên âm dài (5)' },
                    { id: 'diphthong', label: 'Nguyên âm đôi (8)' },
                    { id: 'consonant-unvoiced', label: 'Phụ âm vô thanh' },
                    { id: 'consonant-voiced', label: 'Phụ âm hữu thanh' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setIpaTypeFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                        ipaTypeFilter === f.id
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold'
                          : isDarkMode
                          ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Accent Selection Pill */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 px-1.5">Giọng đọc:</span>
                  <button
                    onClick={() => handleAccentChange('uk')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentAccent === 'uk'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>Anh (UK)</span>
                  </button>
                  <button
                    onClick={() => handleAccentChange('us')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentAccent === 'us'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>Mỹ (US)</span>
                  </button>
                </div>
              </div>

              {/* IPA Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredIpaSounds.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                          /{item.symbol}/
                        </span>
                        <button
                          onClick={() => speak(item.audioSample, 'en', 1.0, undefined, currentAccent)}
                          className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 transition-colors cursor-pointer"
                          title={`Nghe âm chuẩn quốc tế (${currentAccent.toUpperCase()})`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {item.vietnameseGuide}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-[11px] font-bold text-slate-400 mb-1.5">Từ vựng mẫu:</div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.examples.map((ex, eIdx) => (
                          <button
                            key={eIdx}
                            onClick={() => speak(ex, 'en', 1.0, undefined, currentAccent)}
                            className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-medium hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                            title={`Bấm để nghe: ${ex} (${currentAccent.toUpperCase()})`}
                          >
                            {ex}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 12 ENGLISH TENSES */}
          {enSubTab === 'tenses' && (
            <div className="space-y-4">
              {ENGLISH_TENSES.map((tense, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border transition-all ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        {tense.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">({tense.englishName})</span>
                    </div>

                    <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                      {tense.usage}
                    </span>
                  </div>

                  {/* Formulas Box */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-emerald-600 block mb-1">(+) Khẳng định:</span>
                      <code className="font-mono text-slate-800 dark:text-slate-200">{tense.formula.affirmative}</code>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-rose-600 block mb-1">(-) Phủ định:</span>
                      <code className="font-mono text-slate-800 dark:text-slate-200">{tense.formula.negative}</code>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-indigo-600 block mb-1">(?) Nghi vấn:</span>
                      <code className="font-mono text-slate-800 dark:text-slate-200">{tense.formula.interrogative}</code>
                    </div>
                  </div>

                  {/* Signal Words & Examples */}
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-slate-500">Dấu hiệu nhận biết: </span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">
                        {tense.signalWords.join(', ')}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {tense.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="flex items-center gap-2">
                          <button
                            onClick={() => speak(ex.en, 'en')}
                            className="p-1 rounded hover:bg-slate-100 text-indigo-600 dark:hover:bg-slate-800"
                            title="Nghe câu"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-semibold italic text-slate-800 dark:text-slate-200">&ldquo;{ex.en}&rdquo;</span>
                          <span className="text-slate-400">&rarr; {ex.vi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: COMMON IRREGULAR VERBS */}
          {enSubTab === 'irregular' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border w-full sm:w-80 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                  }`}
                >
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Tìm động từ (V1, V2, V3, nghĩa)..."
                    value={irregularSearch}
                    onChange={(e) => setIrregularSearch(e.target.value)}
                    className="w-full text-xs bg-transparent outline-none placeholder-slate-400"
                  />
                </div>

                <div className="text-xs text-slate-500">
                  Hiển thị <strong>{filteredIrregulars.length}</strong> động từ bất quy tắc cốt lõi
                </div>
              </div>

              {/* Table */}
              <div
                className={`rounded-3xl border overflow-hidden transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead
                      className={`border-b text-xs uppercase font-extrabold ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <tr>
                        <th className="py-3 px-4">V1 (Infinitive)</th>
                        <th className="py-3 px-4">Phiên âm</th>
                        <th className="py-3 px-4">V2 (Past Simple)</th>
                        <th className="py-3 px-4">V3 (Past Participle)</th>
                        <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                        <th className="py-3 px-4 text-right">Phát âm</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      {filteredIrregulars.map((v, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                            idx % 2 === 0 ? (isDarkMode ? 'bg-slate-900/40' : 'bg-white') : isDarkMode ? 'bg-slate-900/80' : 'bg-slate-50/40'
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">{v.v1}</td>
                          <td className="py-3 px-4 font-mono text-slate-400 text-xs">{v.phonetic}</td>
                          <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">{v.v2}</td>
                          <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">{v.v3}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{v.meaning}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => speak(`${v.v1}, ${v.v2}, ${v.v3}`, 'en')}
                              className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 dark:hover:bg-slate-800 dark:text-indigo-400"
                              title="Nghe đọc V1, V2, V3"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUFFIX PRONUNCIATION RULES (-S/-ES & -ED) */}
          {enSubTab === 'suffixes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rule -s / -es */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm">
                    /s/
                  </span>
                  <h3 className="text-lg font-black">Quy Tắc Phát Âm Đuôi -s / -es</h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-indigo-600 block mb-1">1. Đọc là /s/:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Khi âm cuối là phụ âm vô thanh: <strong>/p/, /t/, /k/, /f/, /θ/</strong> (Mẹo nhớ: <em>&quot;Thời phong kiến phương tây&quot;</em>).
                    </p>
                    <div className="mt-2 text-xs font-mono text-slate-500">Ví dụ: stops, cats, books, laughs, months.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-indigo-600 block mb-1">2. Đọc là /ɪz/:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Khi âm cuối là các âm gió: <strong>/s/, /z/, /ʃ/, /tʃ/, /ʒ/, /dʒ/</strong> (Mẹo nhớ: <em>&quot;Sóng gió chẳng sợ zó giông&quot;</em>).
                    </p>
                    <div className="mt-2 text-xs font-mono text-slate-500">Ví dụ: kisses, boxes, watches, dishes, changes.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-indigo-600 block mb-1">3. Đọc là /z/:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Khi âm cuối là các nguyên âm và phụ âm hữu thanh còn lại: <strong>/b/, /d/, /g/, /v/, /m/, /n/, /l/, /r/...</strong>
                    </p>
                    <div className="mt-2 text-xs font-mono text-slate-500">Ví dụ: plays, words, bags, dreams, pens.</div>
                  </div>
                </div>
              </div>

              {/* Rule -ed */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-sm">
                    /d/
                  </span>
                  <h3 className="text-lg font-black">Quy Tắc Phát Âm Đuôi -ed</h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-emerald-600 block mb-1">1. Đọc là /ɪd/:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Khi động từ kết thúc bằng hai âm <strong>/t/</strong> hoặc <strong>/d/</strong> (Mẹo nhớ: <em>&quot;Tiền Đô&quot;</em>).
                    </p>
                    <div className="mt-2 text-xs font-mono text-slate-500">Ví dụ: wanted, needed, decided, visited.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-emerald-600 block mb-1">2. Đọc là /t/:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Khi động từ kết thúc bằng các âm vô thanh: <strong>/p/, /k/, /f/, /s/, /ʃ/, /tʃ/</strong> (Mẹo nhớ: <em>&quot;Chính phủ phát sách không share&quot;</em>).
                    </p>
                    <div className="mt-2 text-xs font-mono text-slate-500">Ví dụ: stopped, looked, washed, watched, laughed.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-emerald-600 block mb-1">3. Đọc là /d/:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Khi động từ kết thúc bằng các nguyên âm và phụ âm hữu thanh còn lại.
                    </p>
                    <div className="mt-2 text-xs font-mono text-slate-500">Ví dụ: played, lived, learned, loved, opened.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VOCABULARY LEARNING METHODS */}
          {enSubTab === 'methods' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                className={`p-6 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">🔄</div>
                <h3 className="font-extrabold text-base mb-1.5">Lặp Lại Ngắt Quãng (Spaced Repetition)</h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Dựa trên đường cong quên lãng Ebbinghaus: ôn từ vựng vào đúng thời điểm não bộ chuẩn bị quên (sau 1 ngày, 3 ngày, 7 ngày, 14 ngày, 30 ngày) giúp biến trí nhớ ngắn hạn thành phản xạ vĩnh viễn.
                </p>
              </div>

              <div
                className={`p-6 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">🧠</div>
                <h3 className="font-extrabold text-base mb-1.5">Chủ Động Truy Xuất (Active Recall)</h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Thay vì đọc thụ động, hãy che nghĩa tiếng Việt lại và tự ép bộ não nhớ ra từ vựng và câu ví dụ, hoặc sử dụng tính năng Lật thẻ Flashcard & Bài tập trắc nghiệm trong ứng dụng.
                </p>
              </div>

              <div
                className={`p-6 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">🔗</div>
                <h3 className="font-extrabold text-base mb-1.5">Học Theo Cụm Từ (Collocations)</h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Không bao giờ học từ đơn lẻ! Luôn gắn từ với động từ hoặc giới từ đi kèm (ví dụ: &quot;make a decision&quot;, &quot;take responsibility&quot;, &quot;interested in&quot;) để nói và viết tự nhiên như người bản xứ.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: CHINESE THEORY HUB                                             */}
      {/* ========================================================================= */}
      {currentLang === 'zh' && (
        <div className="space-y-6">
          {/* Sub-tab navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'pinyin', label: 'Bảng Pinyin (21 Thanh & 36 Vận)', icon: Volume2 },
              { id: 'tones', label: '4 Thanh Điệu & Biến Điệu', icon: Sparkles },
              { id: 'strokes', label: '8 Nét & Quy Tắc Bút Thuận', icon: BookOpen },
              { id: 'canvas', label: 'Bảng Tập Viết Chữ Hán', icon: PenTool },
              { id: 'radicals', label: 'Bộ Thủ Thông Dụng', icon: Layers },
              { id: 'hanviet', label: 'Quy Luật Hán - Việt', icon: Lightbulb },
            ].map((tab) => {
              const isSelected = zhSubTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setZhSubTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: PINYIN INITIALS & FINALS */}
          {zhSubTab === 'pinyin' && (
            <div className="space-y-8">
              {/* 21 Thanh Mẫu */}
              <div>
                <h3 className="text-base sm:text-lg font-black mb-3 text-indigo-600 dark:text-indigo-400">
                  21 Thanh Mẫu (Phụ Âm Đầu Trong Tiếng Trung - 声母)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {CHINESE_INITIALS.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                            {item.pinyin}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{item.ipa}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{item.vietnameseApprox}</p>
                        <div className="text-[11px] text-slate-400 pt-1">
                          Ví dụ: <strong className="text-slate-800 dark:text-slate-100">{item.exampleChar}</strong> ({item.examplePinyin} - {item.exampleMeaning})
                        </div>
                      </div>

                      <button
                        onClick={() => speak(item.exampleChar, 'zh')}
                        className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 transition-colors shrink-0"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 36 Vận Mẫu */}
              <div>
                <h3 className="text-base sm:text-lg font-black mb-3 text-indigo-600 dark:text-indigo-400">
                  Các Vận Mẫu Căn Bản & Thông Dụng (Vần Trong Tiếng Trung - 韵母)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {CHINESE_FINALS.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                            {item.pinyin}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{item.ipa}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{item.vietnameseApprox}</p>
                        <div className="text-[11px] text-slate-400 pt-1">
                          Ví dụ: <strong className="text-slate-800 dark:text-slate-100">{item.exampleChar}</strong> ({item.examplePinyin} - {item.exampleMeaning})
                        </div>
                      </div>

                      <button
                        onClick={() => speak(item.exampleChar, 'zh')}
                        className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 transition-colors shrink-0"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TONES & TONE SANDHI */}
          {zhSubTab === 'tones' && (
            <div className="space-y-6">
              {/* 5 Standard Pinyin Tones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {[
                  { name: 'Thanh 1 (Âm Bình)', mark: 'ā (55)', desc: 'Cao và bằng phẳng, giữ nguyên cao độ từ đầu đến cuối.', ex: 'mā (妈 - mẹ)', char: '妈' },
                  { name: 'Thanh 2 (Dương Bình)', mark: 'á (35)', desc: 'Đi từ trung bình lên cao, tương tự dấu sắc tiếng Việt.', ex: 'má (麻 - cây gai)', char: '麻' },
                  { name: 'Thanh 3 (Thượng Thanh)', mark: 'ǎ (214)', desc: 'Hạ thấp giọng rồi uốn lượn nhẹ lên cao, như dấu hỏi.', ex: 'mǎ (马 - con ngựa)', char: '马' },
                  { name: 'Thanh 4 (Khứ Thanh)', mark: 'à (51)', desc: 'Dứt khoát rơi từ đỉnh cao nhất xuống đáy, nhấn mạnh.', ex: 'mà (骂 - mắng mỏ)', char: '骂' },
                  { name: 'Khinh Thanh (Thanh Nhẹ)', mark: 'a (0)', desc: 'Đọc nhẹ và ngắn, phụ thuộc vào cao độ âm đứng trước.', ex: 'ba (爸 - bàba)', char: '爸爸' },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block mb-1">{t.name}</span>
                    <span className="text-2xl font-black font-mono text-slate-800 dark:text-slate-100 block mb-1">{t.mark}</span>
                    <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">{t.desc}</p>
                    <button
                      onClick={() => speak(t.char, 'zh')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t.ex}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Tone Sandhi Rules */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="text-lg font-black">Các Quy Tắc Biến Điệu Chuẩn Quốc Tế Bậc Nhất</h3>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    Bấm loa để nghe trực tiếp biến điệu thực tế
                  </span>
                </div>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-indigo-600 block mb-1">1. Quy tắc hai thanh 3 đi liền nhau (3 + 3 &rarr; 2 + 3):</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Khi hai từ mang thanh 3 đứng liền nhau, từ thứ nhất biến âm thành thanh 2 (dấu sắc).
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => speak('你好', 'zh')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold hover:text-indigo-600 hover:border-indigo-300 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>你好 (nǐ hǎo &rarr; <strong>ní hǎo</strong>)</span>
                      </button>
                      <button
                        onClick={() => speak('很好', 'zh')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold hover:text-indigo-600 hover:border-indigo-300 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>很好 (hěn hǎo &rarr; <strong>hén hǎo</strong>)</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-indigo-600 block mb-1">2. Biến điệu của chữ &quot;不&quot; (bù):</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Nguyên bản mang thanh 4 (bù). Khi đứng trước một từ mang thanh 4, nó biến thành thanh 2 (bú).
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => speak('不是', 'zh')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold hover:text-indigo-600 hover:border-indigo-300 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>不是 (bù shì &rarr; <strong>bú shì</strong>)</span>
                      </button>
                      <button
                        onClick={() => speak('不对', 'zh')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold hover:text-indigo-600 hover:border-indigo-300 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>不对 (bù duì &rarr; <strong>bú duì</strong>)</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-indigo-600 block mb-1">3. Biến điệu của chữ &quot;一&quot; (yī):</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                      - Đứng trước thanh 1, 2, 3: đọc thành thanh 4 (yì).<br />
                      - Đứng trước thanh 4: đọc thành thanh 2 (yí).
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => speak('一起', 'zh')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold hover:text-indigo-600 hover:border-indigo-300 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>一起 (yī + qǐ &rarr; <strong>yì qǐ</strong>)</span>
                      </button>
                      <button
                        onClick={() => speak('一样', 'zh')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold hover:text-indigo-600 hover:border-indigo-300 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>一样 (yī + yàng &rarr; <strong>yí yàng</strong>)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 8 STROKES & RULES */}
          {zhSubTab === 'strokes' && (
            <div className="space-y-6">
              {/* 8 Basic Strokes */}
              <div>
                <h3 className="text-base sm:text-lg font-black mb-3 text-indigo-600 dark:text-indigo-400">
                  8 Nét Bút Cơ Bản Trong Thư Pháp & Chữ Hán (Vĩnh Tự Bát Pháp - 永字八法)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CHINESE_STROKES.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl font-serif font-black text-indigo-600 dark:text-indigo-400">{s.chinese}</span>
                        <span className="text-xs font-mono text-slate-400">{s.pinyin}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{s.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{s.direction}</p>
                      <div className="mt-2 text-[10px] text-indigo-600 dark:text-indigo-400">
                        Ví dụ trong chữ: <strong>{s.exampleChar}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7 Stroke Order Rules */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <h3 className="text-lg font-black mb-4">7 Quy Tắc Bút Thuận Kinh Điển Khi Viết Chữ Hán</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CHINESE_STROKE_ORDER_RULES.map((r, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <span className="font-extrabold text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 block">
                        {r.rule}
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{r.desc}</p>
                      <span className="text-xs font-mono font-bold text-slate-500 block pt-1">
                        Ví dụ minh họa: {r.example}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE STROKE CANVAS */}
          {zhSubTab === 'canvas' && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-black">Bảng Vẽ & Tập Viết Chữ Hán Tương Tác</h3>
                <p className="text-xs text-slate-500">
                  Dùng ngón tay trên điện thoại hoặc chuột trên máy tính để viết chữ Hán trên ô Mễ tự cách. Có chữ mẫu mờ để đồ nét theo chuẩn bút thuận!
                </p>
              </div>
              <StrokeCanvas initialChar="你" isDarkMode={isDarkMode} />
            </div>
          )}

          {/* TAB 5: RADICALS TABLE */}
          {zhSubTab === 'radicals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border w-full sm:w-80 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                  }`}
                >
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Tìm bộ thủ, ý nghĩa, Hán-Việt..."
                    value={radicalSearch}
                    onChange={(e) => setRadicalSearch(e.target.value)}
                    className="w-full text-xs bg-transparent outline-none placeholder-slate-400"
                  />
                </div>

                <div className="text-xs text-slate-500">
                  Hiển thị <strong>{filteredRadicals.length}</strong> bộ thủ tần suất xuất hiện cao nhất
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRadicals.map((rad, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-serif font-black text-indigo-600 dark:text-indigo-400">
                        {rad.radical}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Bộ {rad.sinoVietnamese}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">{rad.meaning}</p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold block mb-1">Chữ Hán chứa bộ này:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {rad.examples.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs flex items-center gap-1.5"
                          >
                            <span className="font-serif font-bold text-slate-900 dark:text-white">{ex.char}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({ex.pinyin})</span>
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400">{ex.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: HAN-VIET RULES */}
          {zhSubTab === 'hanviet' && (
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-black mb-2 text-indigo-600 dark:text-indigo-400">
                  Lợi Thế Tuyệt Đối Của Người Việt Học Tiếng Trung: Hệ Từ Hán - Việt
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Khoảng <strong>60% - 70%</strong> vốn từ vựng tiếng Việt có nguồn gốc từ tiếng Hán. Khi nắm vững quy luật tương ứng giữa âm Pinyin và âm Hán - Việt, bạn có thể tự suy đoán nghĩa và cách đọc của hàng ngàn từ tiếng Trung mà không cần tra từ điển!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-indigo-600 block">Quy tắc 1: Cặp từ ghép Hán - Việt tương đồng 100%</span>
                  <p className="text-xs text-slate-500">
                    Cấu trúc ghép từ giống hệt tiếng Việt hiện đại:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                    <li>国家 (guójiā) &rarr; Quốc gia</li>
                    <li>经济 (jīngjì) &rarr; Kinh tế</li>
                    <li>文化 (wénhuà) &rarr; Văn hóa</li>
                    <li>科技 (kējì) &rarr; Khoa kỹ (Khoa học công nghệ)</li>
                    <li>成功 (chénggōng) &rarr; Thành công</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-indigo-600 block">Quy tắc 2: Tương ứng thanh điệu Pinyin & Hán - Việt</span>
                  <p className="text-xs text-slate-500">
                    Thanh 1 tiếng Trung thường ứng với thanh Không/Ngang tiếng Việt; Thanh 2 ứng với thanh Sắc/Hỏi; Thanh 4 ứng với thanh Nặng/Sắc.
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                    <li>中 (zhōng - thanh 1) &rarr; Trung</li>
                    <li>学 (xué - thanh 2) &rarr; Học</li>
                    <li>大 (dà - thanh 4) &rarr; Đại</li>
                    <li>电 (diàn - thanh 4) &rarr; Điện</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
