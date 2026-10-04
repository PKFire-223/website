import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  HelpCircle,
  Play,
  ArrowRight,
  Languages,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Language } from '../types';
import { speak } from '../utils/speech';

interface AiRoleplayChatProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode?: boolean;
}

interface RoleplayScenario {
  id: string;
  language: Language;
  title: string;
  role: string;
  avatar: string;
  desc: string;
  level: string;
  location: string;
  firstMessage: string;
  firstPinyin?: string;
  firstTranslation: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: number;
  pinyinOrIpa?: string;
  translation?: string;
  feedback?: string;
  suggestions?: string[];
}

const PRESET_SCENARIOS: RoleplayScenario[] = [
  // English Scenarios
  {
    id: 'en-barista',
    language: 'en',
    title: 'Gọi Cà Phê & Bánh Ngọt tại Soho London',
    role: 'Nhân viên pha chế Barista người Anh (Oliver)',
    avatar: '☕',
    desc: 'Hỏi gọi các loại đồ uống flat white, latte, bánh croissant và trò chuyện thời tiết London.',
    level: 'A1 - A2 Căn bản',
    location: 'Soho, Central London 🇬🇧',
    firstMessage: "Hi there! Welcome to Monmouth Coffee. What can I get started for you today? Fancy a flat white or something iced?",
    firstPinyin: "/haɪ ðeə! ˈwɛlkəm tuː ˈmɒnməθ ˈkɒfi. wɒt kæn aɪ gɛt ˈstɑːtɪd fɔː juː təˈdeɪ?/",
    firstTranslation: "Xin chào bạn! Chào mừng đến Monmouth Coffee. Hôm nay tôi có thể lấy cho bạn món gì nào? Bạn muốn một ly flat white hay đồ uống đá?",
  },
  {
    id: 'en-customs',
    language: 'en',
    title: 'Làm Thủ Tục Hải Quan Sân Bay Heathrow',
    role: 'Sĩ quan hải quan & Biên phòng Anh (Officer Davies)',
    avatar: '🛂',
    desc: 'Trả lời các câu hỏi về mục đích chuyến đi, thời gian lưu trú, nơi cư trú và vé khứ hồi.',
    level: 'B1 - B2 Thực chiến',
    location: 'Heathrow Airport Terminal 5 🇬🇧',
    firstMessage: "Good afternoon. Passport and landing documents, please. What is the main purpose of your visit to the United Kingdom?",
    firstPinyin: "/ɡʊd ˌɑːftəˈnuːn. ˈpɑːspɔːt ænd ˈlændɪŋ ˈdɒkjʊmənts, pliːz.../",
    firstTranslation: "Chào buổi chiều. Xin vui lòng xuất trình hộ chiếu và giấy tờ nhập cảnh. Mục đích chính chuyến đi của bạn đến Vương quốc Anh là gì?",
  },
  {
    id: 'en-interview',
    language: 'en',
    title: 'Phỏng Vấn Tuyển Dụng Công Nghệ Toàn Cầu',
    role: 'Giám đốc nhân sự Tech Startup (Sarah Jenkins)',
    avatar: '💼',
    desc: 'Luyện trả lời phỏng vấn xin việc: giới thiệu bản thân, giải quyết vấn đề và định hướng nghề nghiệp.',
    level: 'B2 - C1 Chuyên nghiệp',
    location: 'London Tech City / Remote 🌍',
    firstMessage: "Hello! Thanks for joining today's interview. Could you walk me through your background and why you are interested in this position?",
    firstPinyin: "/hɛˈləʊ! θæŋks fɔː ˈʤɔɪnɪŋ təˈdeɪz ˈɪntəvjuː.../",
    firstTranslation: "Xin chào! Cảm ơn bạn đã tham gia buổi phỏng vấn hôm nay. Bạn có thể điểm qua kinh nghiệm bản thân và lý do bạn muốn ứng tuyển vị trí này không?",
  },

  // Chinese Scenarios
  {
    id: 'zh-hotel',
    language: 'zh',
    title: 'Check-in Nhận Phòng Khách Sạn tại Bắc Kinh',
    role: 'Lễ tân Khách sạn Vương Phủ Tỉnh (Tiểu Trương - 小张)',
    avatar: '🏨',
    desc: 'Xác nhận thông tin đặt phòng, hỏi tầng cao có ban công, mã wifi và bữa sáng tự chọn.',
    level: 'HSK 2 - 3 Giao tiếp',
    location: 'Wangfujing, Beijing 🇨🇳',
    firstMessage: "您好，欢迎光临王府井大饭店！请问您有预订吗？请出示一下您的护照。",
    firstPinyin: "Nín hǎo, huānyíng guānglín Wángfǔjǐng Dà Fàndiàn! Qǐngwèn nín yǒu yùdìng ma? Qǐng chūshì yíxià nín de hùzhào.",
    firstTranslation: "Kính chào quý khách, hoan nghênh đến với Đại khách sạn Vương Phủ Tỉnh! Xin hỏi quý khách có đặt phòng trước chưa ạ? Xin vui lòng cho tôi xem hộ chiếu của quý khách.",
  },
  {
    id: 'zh-noodle',
    language: 'zh',
    title: 'Gọi Món Quán Mì Bò & Trà Sữa Thượng Hải',
    role: 'Chủ tiệm mì bản địa hiếu khách (Bác Vương - 王师傅)',
    avatar: '🍜',
    desc: 'Chọn loại sợi mì, độ cay, đồ ăn kèm, gọi trà sữa ít đường và thanh toán qua mã QR.',
    level: 'HSK 1 - 2 Cơ bản',
    location: 'Phố đi bộ Nam Kinh, Thượng Hải 🇨🇳',
    firstMessage: "来啦！两位里边坐！今天想吃点什么？我们店的招牌牛肉面加卤蛋最受欢迎，要微辣还是重辣？",
    firstPinyin: "Lái la! Liǎng wèi lǐbian zuò! Jīntiān xiǎng chī diǎn shénme? Wǒmen diàn de zhāopái niúròumiàn jiā lǔdàn zuì shòu huānyíng, yào wēilà háishì zhònglà?",
    firstTranslation: "Chào quý khách! Hai vị vào trong ngồi nhé! Hôm nay muốn dùng món gì ạ? Mì bò đặc sản thêm trứng kho của quán chúng tôi được chuộng nhất đấy, quý khách ăn cay vừa hay cay nhiều?",
  },
  {
    id: 'zh-taxi',
    language: 'zh',
    title: 'Đi Taxi Tham Quan Phố Cổ Bắc Kinh',
    role: 'Bác tài xế Bắc Kinh thân thiện (Sư phụ Lý - 李师傅)',
    avatar: '🚕',
    desc: 'Báo điểm đến Cố Cung, trò chuyện thời tiết, các địa điểm ăn ngon và văn hóa ẩm thực Bắc Kinh.',
    level: 'HSK 3 - 4 Thực tế',
    location: 'Đường vành đai 2, Bắc Kinh 🇨🇳',
    firstMessage: "走着！您好朋友，您这是去故宫北门吧？现在正是看银杏叶的好时候，您是第一次来北京玩儿吗？",
    firstPinyin: "Zǒuzhe! Nínhǎo péngyou, nín zhè shì qù Gùgōng běimén ba? Xiànzài zhèngshì kàn yínxìng yè de hǎo shíhou, nín shì dì-yī cì lái Běijīng wánr ma?",
    firstTranslation: "Đi nào! Chào bạn nhé, bạn đi tới cổng bắc Tử Cấm Thành phải không? Thời điểm này ngắm lá ngân hạnh là tuyệt nhất đấy, bạn lần đầu đến Bắc Kinh du lịch à?",
  },
];

export const AiRoleplayChat: React.FC<AiRoleplayChatProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode = false,
}) => {
  const filteredScenarios = PRESET_SCENARIOS.filter((s) => s.language === currentLang);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    filteredScenarios[0]?.id || 'en-barista'
  );

  const activeScenario =
    filteredScenarios.find((s) => s.id === selectedScenarioId) || filteredScenarios[0];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [autoSpeakAi, setAutoSpeakAi] = useState<boolean>(true);
  const [customRoleInput, setCustomRoleInput] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize first message when scenario changes
  useEffect(() => {
    if (!activeScenario) return;
    const initialMsg: ChatMessage = {
      id: 'init-1',
      sender: 'ai',
      text: activeScenario.firstMessage,
      timestamp: Date.now(),
      pinyinOrIpa: activeScenario.firstPinyin,
      translation: activeScenario.firstTranslation,
      suggestions:
        currentLang === 'en'
          ? [
              "I'd like a flat white with oat milk, please.",
              "Could you recommend something popular today?",
            ]
          : [
              "你好！我想点一份招牌牛肉面，微辣就行。",
              "请问支持微信支付或者支付宝吗？",
            ],
    };
    setMessages([initialMsg]);
  }, [activeScenario?.id, currentLang]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Setup Web Speech Recognition for Mic
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentLang]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech. Bạn có thể gõ trực tiếp qua ô nhập liệu!');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recognition', err);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!messageContent || isLoading) return;

    // Add user message to UI
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        sender: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const response = await fetch('/api/ai-roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTitle: isCustomMode && customRoleInput ? customRoleInput : activeScenario.title,
          role: isCustomMode && customRoleInput ? customRoleInput : activeScenario.role,
          userMessage: messageContent,
          history: historyPayload,
          language: currentLang,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Lỗi kết nối AI');
      }

      // Parse AI structured reply if applicable
      const fullReply = data.reply || '';
      let cleanMainText = fullReply;
      let pinyinIpa = '';
      let translation = '';
      let feedback = '';
      let suggestions: string[] = [];

      // Extract sections if provided by prompt
      const pinyinMatch = fullReply.match(/\[(?:Pinyin\/IPA|Phiên âm)\]:?\s*([\s\S]*?)(?=\n\[|$)/i);
      const transMatch = fullReply.match(/\[(?:Bản dịch|Dịch nghĩa)\]:?\s*([\s\S]*?)(?=\n\[|$)/i);
      const feedbackMatch = fullReply.match(/\[(?:Nhận xét & Sửa lỗi|Góp ý)\]:?\s*([\s\S]*?)(?=\n\[|$)/i);
      const sugMatch = fullReply.match(/\[(?:Gợi ý phản xạ|Gợi ý)\]:?\s*([\s\S]*?)(?=\n\[|$)/i);

      if (pinyinMatch || transMatch) {
        // Main text is everything before the first section
        cleanMainText = fullReply.split(/\[(?:Pinyin\/IPA|Phiên âm|Bản dịch|Nhận xét)/i)[0].trim();
        pinyinIpa = pinyinMatch ? pinyinMatch[1].trim() : '';
        translation = transMatch ? transMatch[1].trim() : '';
        feedback = feedbackMatch ? feedbackMatch[1].trim() : '';
        if (sugMatch) {
          suggestions = sugMatch[1]
            .split('\n')
            .map((s: string) => s.replace(/^[-*•\d.]+\s*/, '').trim())
            .filter((s: string) => s.length > 0);
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: cleanMainText || fullReply,
        timestamp: Date.now(),
        pinyinOrIpa: pinyinIpa,
        translation: translation,
        feedback: feedback,
        suggestions: suggestions.length > 0 ? suggestions : undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Auto speak response
      if (autoSpeakAi) {
        speak(cleanMainText || fullReply, currentLang);
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Xin lỗi bạn, mạng kết nối AI tạm thời bị gián đoạn. Bạn thử gửi lại tin nhắn nhé!',
        timestamp: Date.now(),
        translation: 'Lỗi kết nối máy chủ.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    if (!activeScenario) return;
    const initialMsg: ChatMessage = {
      id: 'init-reset',
      sender: 'ai',
      text: activeScenario.firstMessage,
      timestamp: Date.now(),
      pinyinOrIpa: activeScenario.firstPinyin,
      translation: activeScenario.firstTranslation,
      suggestions:
        currentLang === 'en'
          ? [
              "I'd like a flat white with oat milk, please.",
              "Could you recommend something popular today?",
            ]
          : [
              "你好！我想点一份招牌牛肉面，微辣就行。",
              "请问支持微信支付或者支付宝吗？",
            ],
    };
    setMessages([initialMsg]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800 text-white'
            : 'bg-gradient-to-r from-indigo-50/90 via-sky-50/50 to-white border-indigo-100 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Roleplay Native Partner &bull; Phản Xạ 1-1 Bằng Mic & Chat</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Luyện Giao Tiếp & Nhập Vai Đời Thực Với AI
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Trò chuyện trực tiếp bằng mic hoặc gõ phím với người bản xứ AI. Nhận diện giọng nói chuẩn xác,
              sửa lỗi ngữ pháp/phát âm tức thì và gợi ý phản xạ tự nhiên như người bản xứ.
            </p>
          </div>

          {/* Language Selector in Mode */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div
              className={`flex items-center p-1 rounded-2xl border ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <button
                onClick={() => onLanguageChange('en')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🇬🇧 Tiếng Anh</span>
              </button>
              <button
                onClick={() => onLanguageChange('zh')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentLang === 'zh'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🇨🇳 Tiếng Trung</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scenarios List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-slate-500">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Tình huống nhập vai</span>
            </h3>
            <button
              onClick={handleResetConversation}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer`}
              title="Bắt đầu lại cuộc trò chuyện từ đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredScenarios.map((scenario) => {
              const isSelected = selectedScenarioId === scenario.id && !isCustomMode;
              return (
                <div
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenarioId(scenario.id);
                    setIsCustomMode(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-100 dark:border-slate-700">
                      {scenario.avatar}
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
                          {scenario.level}
                        </span>
                        <span className="text-[10px] text-slate-400">{scenario.location}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                        {scenario.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {scenario.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Custom Scenario Card */}
            <div
              onClick={() => setIsCustomMode(true)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                isCustomMode
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                  : isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200/90 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-100 dark:border-slate-700">
                  ✨
                </span>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    Tùy biến
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                    Tự tạo vai trò AI tùy thích
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Ví dụ: Bạn thân đại học, Bác sĩ nha khoa, Đối tác thương mại...
                  </p>
                </div>
              </div>

              {isCustomMode && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <input
                    type="text"
                    placeholder="Nhập vai trò của AI (ví dụ: Nhân viên bán vé xem phim tại New York)"
                    value={customRoleInput}
                    onChange={(e) => setCustomRoleInput(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                      isDarkMode
                        ? 'bg-slate-950 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Box */}
        <div className="lg:col-span-8 flex flex-col h-[650px] rounded-3xl border shadow-sm overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          {/* Chat Header */}
          <div
            className={`p-4 px-6 border-b flex items-center justify-between ${
              isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/80 border-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{isCustomMode ? '✨' : activeScenario.avatar}</span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {isCustomMode && customRoleInput ? customRoleInput : activeScenario.role}
                </h3>
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sẵn sàng phản xạ bản xứ</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoSpeakAi(!autoSpeakAi)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  autoSpeakAi
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tự động phát âm câu thoại khi AI trả lời"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tự đọc câu thoại</span>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-1.5`}
                >
                  <div className="flex items-end gap-2 max-w-[88%] sm:max-w-[80%]">
                    {isAi && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 flex items-center justify-center text-sm shrink-0">
                        {isCustomMode ? '🤖' : activeScenario.avatar}
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-3xl text-sm leading-relaxed transition-all ${
                        isAi
                          ? isDarkMode
                            ? 'bg-slate-950 border border-slate-800 text-slate-100 rounded-bl-xs'
                            : 'bg-slate-100/90 border border-slate-200/80 text-slate-900 rounded-bl-xs'
                          : 'bg-indigo-600 text-white rounded-br-xs shadow-xs shadow-indigo-600/20'
                      }`}
                    >
                      {/* Main Message Text */}
                      <p className="font-semibold text-sm sm:text-base">{msg.text}</p>

                      {/* Optional Pronunciation (IPA/Pinyin) */}
                      {msg.pinyinOrIpa && (
                        <p className="text-xs font-mono text-indigo-500 dark:text-indigo-400 mt-1">
                          {msg.pinyinOrIpa}
                        </p>
                      )}

                      {/* Optional Translation */}
                      {msg.translation && (
                        <p
                          className={`text-xs mt-1.5 pt-1.5 border-t ${
                            isAi
                              ? isDarkMode
                                ? 'border-slate-800 text-slate-400'
                                : 'border-slate-200 text-slate-500'
                              : 'border-indigo-500/40 text-indigo-100'
                          }`}
                        >
                          &rarr; {msg.translation}
                        </p>
                      )}

                      {/* Feedback & Correction */}
                      {msg.feedback && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                          <div className="font-bold flex items-center gap-1">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span>Nhận xét & Sửa lỗi phản xạ:</span>
                          </div>
                          <div>{msg.feedback}</div>
                        </div>
                      )}
                    </div>

                    {!isAi && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">
                        Tôi
                      </div>
                    )}
                  </div>

                  {/* Actions under message (TTS, Suggestions) */}
                  {isAi && (
                    <div className="flex items-center gap-2 pl-10 text-[11px] text-slate-400">
                      <button
                        onClick={() => speak(msg.text, currentLang, 1.0)}
                        className="hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                        title="Nghe tốc độ chuẩn (1.0x)"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>1.0x</span>
                      </button>
                      <button
                        onClick={() => speak(msg.text, currentLang, 0.75)}
                        className="hover:text-indigo-600 font-mono cursor-pointer"
                        title="Nghe chậm (0.75x)"
                      >
                        0.75x
                      </button>
                    </div>
                  )}

                  {/* Quick suggested reply chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="pl-10 pt-1 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Gợi ý câu trả lời tiếp theo:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestions.map((sug, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(sug)}
                            className="px-2.5 py-1 rounded-xl text-xs border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer text-left"
                          >
                            &ldquo;{sug}&rdquo;
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3 text-xs text-slate-400 pl-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center animate-spin">
                  ⏳
                </div>
                <span>AI đang lắng nghe và suy nghĩ câu thoại phản xạ...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div
            className={`p-3 sm:p-4 border-t ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {/* Mic Toggle Button */}
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                  isRecording
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md ring-4 ring-rose-500/20 animate-pulse'
                    : isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 shadow-2xs'
                }`}
                title={isRecording ? 'Đang ghi âm giọng nói... Bấm để dừng' : 'Bấm để nói bằng Microphone'}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-indigo-600" />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder={
                  isRecording
                    ? 'Đang lắng nghe giọng bạn nói... (Nói vào mic)'
                    : currentLang === 'en'
                    ? 'Nhập tin nhắn bằng tiếng Anh hoặc bấm Mic...'
                    : 'Nhập tin nhắn bằng tiếng Trung hoặc bấm Mic...'
                }
                className={`flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border outline-none transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500'
                    : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-600 shadow-2xs'
                }`}
              />

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="p-3 rounded-2xl bg-indigo-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all cursor-pointer shadow-xs shadow-indigo-600/20 shrink-0"
                title="Gửi tin nhắn"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Quick helper tip */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>Mẹo: Bạn có thể vừa bấm Mic nói vừa sửa chữ trước khi bấm Gửi.</span>
              <span>{currentLang === 'en' ? '🇬🇧 English Native' : '🇨🇳 HSK Standard'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
