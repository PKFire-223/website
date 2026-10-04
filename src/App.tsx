import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { VocabularyExplorer } from './components/VocabularyExplorer';
import { ScrollToTop } from './components/ScrollToTop';
import { OfflineIndicator } from './components/OfflineIndicator';
import {
  getLanguageVocabulary,
  TOTAL_WORDS_COUNT,
  TOTAL_ENGLISH_COUNT,
  TOTAL_CHINESE_COUNT,
} from './data/vocabData';
import { Language, LevelType, UserProfileProgress, VocabWord } from './types';
import { loadUserProfile, saveUserProfile } from './utils/srs';

// Code-split tabs into separate chunks (Loaded only on demand to reduce initial payload & bandwidth by >90%)
const TheoryHub = lazy(() => import('./components/TheoryHub').then((m) => ({ default: m.TheoryHub })));
const SituationalDialogue = lazy(() => import('./components/SituationalDialogue').then((m) => ({ default: m.SituationalDialogue })));
const RandomCardDraw = lazy(() => import('./components/RandomCardDraw').then((m) => ({ default: m.RandomCardDraw })));
const ClozeTestMode = lazy(() => import('./components/ClozeTestMode').then((m) => ({ default: m.ClozeTestMode })));
const FlashcardMode = lazy(() => import('./components/FlashcardMode').then((m) => ({ default: m.FlashcardMode })));
const PracticeMode = lazy(() => import('./components/PracticeMode').then((m) => ({ default: m.PracticeMode })));
const PeriodicTestMode = lazy(() => import('./components/PeriodicTestMode').then((m) => ({ default: m.PeriodicTestMode })));
const PronunciationPracticeList = lazy(() => import('./components/PronunciationPracticeList').then((m) => ({ default: m.PronunciationPracticeList })));
const SentencePatternsMode = lazy(() => import('./components/SentencePatternsMode').then((m) => ({ default: m.SentencePatternsMode })));
const VocabularyNotebook = lazy(() => import('./components/VocabularyNotebook').then((m) => ({ default: m.VocabularyNotebook })));
const PronunciationModal = lazy(() => import('./components/PronunciationModal').then((m) => ({ default: m.PronunciationModal })));
const BookmarkedWordsDrawer = lazy(() => import('./components/BookmarkedWordsDrawer').then((m) => ({ default: m.BookmarkedWordsDrawer })));
const AiPhotoTranslator = lazy(() => import('./components/AiPhotoTranslator').then((m) => ({ default: m.AiPhotoTranslator })));
const AiRoleplayChat = lazy(() => import('./components/AiRoleplayChat').then((m) => ({ default: m.AiRoleplayChat })));
const ToeicIeltsExamHub = lazy(() => import('./components/ToeicIeltsExamHub').then((m) => ({ default: m.ToeicIeltsExamHub })));

const TabLoadingFallback: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-4 animate-pulse">
    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center text-xl shadow-xs">
      ⚡
    </div>
    <div className={`text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
      Đang tải tài nguyên & tối ưu hiển thị...
    </div>
    <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
      Hệ thống tải dữ liệu thông minh theo yêu cầu để tiết kiệm tối đa băng thông.
    </div>
  </div>
);

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentLevel, setCurrentLevel] = useState<LevelType>('A1');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [profile, setProfile] = useState<UserProfileProgress>(loadUserProfile());
  const [activePronounceWord, setActivePronounceWord] = useState<VocabWord | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [targetJumpWord, setTargetJumpWord] = useState<VocabWord | null>(null);

  // Asynchronously loaded vocabulary (split per language to avoid downloading 15MB at startup)
  const [languageWords, setLanguageWords] = useState<VocabWord[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingWords(true);
    getLanguageVocabulary(currentLang).then((words) => {
      if (isMounted) {
        setLanguageWords(words);
        setIsLoadingWords(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentLang]);

  // Theme: Default to Bright (Light Mode) as explicitly requested by user ("màu sáng tí")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('linguavocab_theme');
    return saved === 'dark'; // default to false (bright / light mode)
  });

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('linguavocab_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // When changing language, switch default level
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (lang === 'en') {
      setCurrentLevel('A1');
    } else {
      setCurrentLevel('HSK1');
    }
  };

  const handleUpdateProfile = (updated: UserProfileProgress) => {
    setProfile(updated);
    saveUserProfile(updated);
  };

  const handleToggleBookmark = (wordId: string) => {
    const currentProgress = profile.wordsProgress[wordId] || {
      wordId,
      status: 'learning',
      repetitions: 0,
      easeFactor: 2.5,
      intervalDays: 1,
      nextReviewDate: Date.now(),
      correctCount: 0,
      incorrectCount: 0,
      lastReviewed: Date.now(),
      isBookmarked: false,
    };

    handleUpdateProfile({
      ...profile,
      wordsProgress: {
        ...profile.wordsProgress,
        [wordId]: {
          ...currentProgress,
          isBookmarked: !currentProgress.isBookmarked,
        },
      },
    });
  };

  const handleJumpToWord = (word: VocabWord) => {
    if (word.language !== currentLang) {
      setCurrentLang(word.language);
    }
    setCurrentLevel(word.level);
    setActiveTab('explore');
    setTargetJumpWord(word);
    setIsBookmarksOpen(false);
  };

  const handleScoreSave = (score: number) => {
    if (!activePronounceWord) return;
    const wordId = activePronounceWord.id;
    const currentProgress = profile.wordsProgress[wordId] || {
      wordId,
      status: 'learning',
      repetitions: 1,
      easeFactor: 2.5,
      intervalDays: 1,
      nextReviewDate: Date.now() + 24 * 60 * 60 * 1000,
      correctCount: 1,
      incorrectCount: 0,
      lastReviewed: Date.now(),
      isBookmarked: false,
    };

    const best = Math.max(currentProgress.bestSpeechScore || 0, score);

    const updatedProfile: UserProfileProgress = {
      ...profile,
      todayLearnedCount: profile.todayLearnedCount + 1,
      wordsProgress: {
        ...profile.wordsProgress,
        [wordId]: {
          ...currentProgress,
          bestSpeechScore: best,
          lastReviewed: Date.now(),
        },
      },
    };

    handleUpdateProfile(updatedProfile);
  };

  // Bookmarked words count for active language
  const bookmarkedCount = languageWords.filter(
    (w) => profile.wordsProgress[w.id]?.isBookmarked
  ).length;

  return (
    <div
      className={`min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-600 selection:text-white transition-colors duration-200 ${
        isDarkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-[#f8fafc] text-slate-800'
      }`}
    >
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        profile={profile}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        totalWordsCount={TOTAL_WORDS_COUNT}
        currentLangWordsCount={currentLang === 'en' ? TOTAL_ENGLISH_COUNT : TOTAL_CHINESE_COUNT}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkedCount={bookmarkedCount}
      />

      <main className="flex-grow">
        {isLoadingWords && languageWords.length === 0 ? (
          <TabLoadingFallback isDarkMode={isDarkMode} />
        ) : (
          <Suspense fallback={<TabLoadingFallback isDarkMode={isDarkMode} />}>
            {activeTab === 'explore' && (
              <VocabularyExplorer
                words={languageWords}
                currentLang={currentLang}
                currentLevel={currentLevel}
                onLevelChange={setCurrentLevel}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onOpenPronounce={(w) => setActivePronounceWord(w)}
                isDarkMode={isDarkMode}
                targetJumpWord={targetJumpWord}
              />
            )}

            {activeTab === 'patterns' && (
              <SentencePatternsMode
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'toeic-ielts' && (
              <ToeicIeltsExamHub
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'ai-translate' && (
              <AiPhotoTranslator
                currentLang={currentLang}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'ai-roleplay' && (
              <AiRoleplayChat
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'theory' && (
              <TheoryHub
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'dialogue' && (
              <SituationalDialogue
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'random-draw' && (
              <RandomCardDraw
                words={languageWords}
                currentLang={currentLang}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onOpenPronounce={(w) => setActivePronounceWord(w)}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'cloze' && (
              <ClozeTestMode
                currentLang={currentLang}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'flashcard' && (
              <FlashcardMode
                words={languageWords.filter((w) => w.level === currentLevel)}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onOpenPronounce={(w) => setActivePronounceWord(w)}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'pronunciation' && (
              <PronunciationPracticeList
                words={languageWords}
                currentLang={currentLang}
                currentLevel={currentLevel}
                profile={profile}
                onOpenPronounce={(w) => setActivePronounceWord(w)}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'practice' && (
              <PracticeMode
                words={languageWords.filter((w) => w.level === currentLevel)}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'test' && (
              <PeriodicTestMode
                words={languageWords}
                profile={profile}
                currentLevel={currentLevel}
                onUpdateProfile={handleUpdateProfile}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'dictionary' && (
              <VocabularyNotebook
                words={languageWords}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onOpenPronounce={(w) => setActivePronounceWord(w)}
                isDarkMode={isDarkMode}
              />
            )}
          </Suspense>
        )}
      </main>

      <Suspense fallback={null}>
        {/* Speech Pronunciation Modal */}
        {activePronounceWord && (
          <PronunciationModal
            word={activePronounceWord}
            onClose={() => setActivePronounceWord(null)}
            onScoreSave={handleScoreSave}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Bookmarked Words Quick Access Drawer */}
        {isBookmarksOpen && (
          <BookmarkedWordsDrawer
            words={languageWords}
            profile={profile}
            onToggleBookmark={handleToggleBookmark}
            onJumpToWord={handleJumpToWord}
            isOpen={isBookmarksOpen}
            onClose={() => setIsBookmarksOpen(false)}
            isDarkMode={isDarkMode}
            currentLang={currentLang}
          />
        )}
      </Suspense>

      {/* Floating Scroll To Top Button (Bottom-Right) */}
      <ScrollToTop isDarkMode={isDarkMode} />

      {/* Offline Connectivity Notification */}
      <OfflineIndicator />

      {/* Footer */}
      <footer
        className={`py-8 text-xs border-t transition-colors ${
          isDarkMode
            ? 'bg-slate-950 border-slate-900 text-slate-500'
            : 'bg-white border-slate-200 text-slate-500 shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              LinguaVocab Standard
            </span>{' '}
            &mdash; Kho từ điển &gt; 10.000 từ vựng tiếng Anh (Oxford/CEFR) & &gt; 10.000 từ vựng tiếng Trung (HSK) riêng biệt (Tổng &gt; 20.000 từ chuẩn) cùng Hệ thống Mẫu câu giao tiếp chuẩn quốc tế.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Lặp lại ngắt quãng (SM-2)</span>
            <span>&bull;</span>
            <span>Web Speech API TTS/STT</span>
            <span>&bull;</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Tone màu dịu mắt &bull; Giao diện chuẩn</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
