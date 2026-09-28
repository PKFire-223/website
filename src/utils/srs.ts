import { UserWordProgress, LearningStatus, PeriodicTestRecord, UserProfileProgress } from '../types';

const STORAGE_KEY = 'linguavocab_user_progress_v1';

export const getInitialProfile = (): UserProfileProgress => {
  const today = new Date().toISOString().split('T')[0];
  return {
    streak: 1,
    lastActiveDate: today,
    dailyGoal: 10,
    todayLearnedCount: 0,
    wordsProgress: {},
    testHistory: [],
  };
};

export const loadUserProfile = (): UserProfileProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialProfile();

    const profile: UserProfileProgress = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];

    // Check streak
    if (profile.lastActiveDate !== today) {
      const lastActive = new Date(profile.lastActiveDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Continuous streak maintained
        profile.streak += 1;
      } else if (diffDays > 1) {
        // Broken streak
        profile.streak = 1;
      }
      profile.todayLearnedCount = 0;
      profile.lastActiveDate = today;
      saveUserProfile(profile);
    }

    return profile;
  } catch (e) {
    console.error('Error loading progress:', e);
    return getInitialProfile();
  }
};

export const saveUserProfile = (profile: UserProfileProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

/**
 * SuperMemo 2 (SM-2) Spaced Repetition rating:
 * 1 = Complete blackout / wrong
 * 2 = Hard / hesitated
 * 3 = Good / recalled with some effort
 * 4 = Easy / instantaneous recall
 */
export const updateWordSrs = (
  current: UserWordProgress | undefined,
  wordId: string,
  quality: 1 | 2 | 3 | 4
): UserWordProgress => {
  const now = Date.now();
  let progress: UserWordProgress = current || {
    wordId,
    status: 'learning',
    repetitions: 0,
    easeFactor: 2.5,
    intervalDays: 1,
    nextReviewDate: now + 24 * 60 * 60 * 1000,
    correctCount: 0,
    incorrectCount: 0,
    lastReviewed: now,
    isBookmarked: false,
  };

  const isCorrect = quality >= 3;
  if (isCorrect) {
    progress.correctCount += 1;
  } else {
    progress.incorrectCount += 1;
  }

  // SM-2 Algorithm computation
  if (quality < 2) {
    // Reset repetitions if forgotten completely
    progress.repetitions = 0;
    progress.intervalDays = 1;
    progress.status = 'review';
  } else {
    // Quality 2, 3, 4
    if (progress.repetitions === 0) {
      progress.intervalDays = 1;
    } else if (progress.repetitions === 1) {
      progress.intervalDays = 3;
    } else {
      progress.intervalDays = Math.round(progress.intervalDays * progress.easeFactor);
    }
    progress.repetitions += 1;

    // Determine status
    if (progress.repetitions >= 4 && progress.intervalDays >= 14) {
      progress.status = 'mastered';
    } else {
      progress.status = 'learning';
    }
  }

  // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  // where q is 1-5 scale (map our 1-4 to 2-5)
  const qScale = quality + 1;
  progress.easeFactor = Math.max(
    1.3,
    progress.easeFactor + (0.1 - (5 - qScale) * (0.08 + (5 - qScale) * 0.02))
  );

  progress.nextReviewDate = now + progress.intervalDays * 24 * 60 * 60 * 1000;
  progress.lastReviewed = now;

  return progress;
};
