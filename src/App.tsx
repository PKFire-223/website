import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VocabularyExplorer } from './components/VocabularyExplorer';
import { TheoryHub } from './components/TheoryHub';
import { SituationalDialogue } from './components/SituationalDialogue';
import { RandomCardDraw } from './components/RandomCardDraw';
import { ClozeTestMode } from './components/ClozeTestMode';
import { FlashcardMode } from './components/FlashcardMode';
import { PracticeMode } from './components/PracticeMode';
import { PeriodicTestMode } from './components/PeriodicTestMode';
import { PronunciationPracticeList } from './components/PronunciationPracticeList';
import { VocabularyNotebook } from './components/VocabularyNotebook';
import { PronunciationModal } from './components/PronunciationModal';
import { VOCABULARY_DATABASE } from './data/vocabData';
import { Language, LevelType, UserProfileProgress, VocabWord } from './types';
import { loadUserProfile, saveUserProfile } from './utils/srs';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentLevel, setCurrentLevel] = useState<LevelType>('A1');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [profile, setProfile] = useState<UserProfileProgress>(loadUserProfile());
  const [activePronounceWord, setActivePronounceWord] = useState<VocabWord | null>(null);

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

  // Filter words by language
  const languageWords = VOCABULARY_DATABASE.filter((w) => w.language === currentLang);

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
        totalWordsCount={VOCABULARY_DATABASE.length}
        currentLangWordsCount={languageWords.length}
      />

      <main className="flex-grow">
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
      </main>

      {/* Speech Pronunciation Modal */}
      {activePronounceWord && (
        <PronunciationModal
          word={activePronounceWord}
          onClose={() => setActivePronounceWord(null)}
          onScoreSave={handleScoreSave}
          isDarkMode={isDarkMode}
        />
      )}

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
            &mdash; Kho từ điển &gt; 5.120 từ vựng tiếng Anh (Oxford/CEFR) & &gt; 5.150 từ vựng tiếng Trung (HSK) riêng biệt (Tổng &gt; 10.270 từ chuẩn).
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
