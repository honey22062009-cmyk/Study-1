'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TestAttempt, MistakeEntry, StudySession, TopicMastery, UserAnswer, Recommendation } from '@/lib/types';

interface AppState {
  // User progress
  attempts: TestAttempt[];
  mistakes: MistakeEntry[];
  sessions: StudySession[];
  topicMastery: Record<string, TopicMastery>;
  recommendations: Recommendation[];
  
  // UI state
  focusTimeSeconds: number;
  currentStreak: number;
  totalStudyTimeSeconds: number;
  
  // Actions
  addAttempt: (attempt: TestAttempt) => void;
  updateAttempt: (id: string, updates: Partial<TestAttempt>) => void;
  addMistake: (mistake: MistakeEntry) => void;
  resolveMistake: (id: string) => void;
  updateMistakeCategory: (id: string, category: MistakeEntry['category']) => void;
  addSession: (session: StudySession) => void;
  updateTopicMastery: (topicId: string, mastery: Partial<TopicMastery>) => void;
  dismissRecommendation: (id: string) => void;
  addFocusTime: (seconds: number) => void;
  
  // Practice / Test helpers
  createPracticeSession: (questionIds: string[]) => void;
}

const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'weak-topic',
    title: 'Genetics needs attention',
    description: 'Your recent Biology attempts show weaker performance in Genetics. You may want to revise Mendelian inheritance.',
    subjectId: 'biology',
    chapterId: 'bio-07',
    topicId: 'bio-07-t1',
    priority: 'high',
    reason: 'Accuracy 45% in last 10 questions vs 78% average',
    actionLabel: 'Practice 15 Questions',
    actionLink: '/practice?topic=bio-07-t1&count=15',
    dismissed: false,
  },
  {
    id: 'rec-2',
    type: 'mistake',
    title: 'Review 8 unresolved mistakes',
    description: 'You have 8 mistakes in Thermodynamics that are still unresolved.',
    subjectId: 'physics',
    chapterId: 'phy-05',
    priority: 'medium',
    reason: 'Mistakes from last week still pending',
    actionLabel: 'Revise Mistakes',
    actionLink: '/mistakes?chapter=phy-05',
    dismissed: false,
  },
  {
    id: 'rec-3',
    type: 'revise',
    title: 'Quick revision: Breathing',
    description: 'You studied Breathing 5 days ago. Spaced revision suggested.',
    subjectId: 'biology',
    chapterId: 'bio-05',
    topicId: 'bio-05-t1',
    priority: 'low',
    reason: 'Spaced repetition optimal now',
    actionLabel: 'Quick Revision',
    actionLink: '/learn/biology/bio-05/bio-05-t1?tab=quick',
    dismissed: false,
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      attempts: [],
      mistakes: [],
      sessions: [],
      topicMastery: {},
      recommendations: mockRecommendations,
      focusTimeSeconds: 0,
      currentStreak: 3,
      totalStudyTimeSeconds: 45200,

      addAttempt: (attempt) => set(state => ({ attempts: [...state.attempts, attempt] })),
      
      updateAttempt: (id, updates) => set(state => ({
        attempts: state.attempts.map(a => a.id === id ? { ...a, ...updates } : a)
      })),

      addMistake: (mistake) => set(state => {
        // Check if mistake already exists for same question
        const existing = state.mistakes.find(m => m.questionId === mistake.questionId && !m.resolved);
        if (existing) {
          return {
            mistakes: state.mistakes.map(m => 
              m.id === existing.id 
                ? { ...m, timesRepeated: m.timesRepeated + 1, lastAttempted: new Date().toISOString() }
                : m
            )
          };
        }
        return { mistakes: [...state.mistakes, mistake] };
      }),

      resolveMistake: (id) => set(state => ({
        mistakes: state.mistakes.map(m => m.id === id ? { ...m, resolved: true } : m)
      })),

      updateMistakeCategory: (id, category) => set(state => ({
        mistakes: state.mistakes.map(m => m.id === id ? { ...m, category } : m)
      })),

      addSession: (session) => set(state => ({ sessions: [...state.sessions, session] })),

      updateTopicMastery: (topicId, mastery) => set(state => ({
        topicMastery: {
          ...state.topicMastery,
          [topicId]: {
            topicId,
            chapterId: mastery.chapterId || state.topicMastery[topicId]?.chapterId || '',
            subjectId: mastery.subjectId || state.topicMastery[topicId]?.subjectId || '',
            totalAttempted: mastery.totalAttempted ?? state.topicMastery[topicId]?.totalAttempted ?? 0,
            correct: mastery.correct ?? state.topicMastery[topicId]?.correct ?? 0,
            accuracy: mastery.accuracy ?? state.topicMastery[topicId]?.accuracy ?? 0,
            avgTimeSeconds: mastery.avgTimeSeconds ?? state.topicMastery[topicId]?.avgTimeSeconds ?? 0,
            lastAttempted: mastery.lastAttempted ?? new Date().toISOString(),
            masteryLevel: mastery.masteryLevel ?? state.topicMastery[topicId]?.masteryLevel ?? 0,
            weakAreas: mastery.weakAreas ?? state.topicMastery[topicId]?.weakAreas ?? [],
          }
        }
      })),

      dismissRecommendation: (id) => set(state => ({
        recommendations: state.recommendations.map(r => r.id === id ? { ...r, dismissed: true } : r)
      })),

      addFocusTime: (seconds) => set(state => ({
        focusTimeSeconds: state.focusTimeSeconds + seconds,
        totalStudyTimeSeconds: state.totalStudyTimeSeconds + seconds,
      })),

      createPracticeSession: (questionIds) => {
        // placeholder
      }
    }),
    {
      name: 'neet-platform-storage',
      partialize: (state) => ({
        attempts: state.attempts,
        mistakes: state.mistakes,
        sessions: state.sessions,
        topicMastery: state.topicMastery,
        focusTimeSeconds: state.focusTimeSeconds,
        totalStudyTimeSeconds: state.totalStudyTimeSeconds,
        currentStreak: state.currentStreak,
      }),
    }
  )
);
