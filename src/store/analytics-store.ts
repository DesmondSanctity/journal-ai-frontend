import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';
import { persist } from 'zustand/middleware';

interface AnalyticsState {
 analytics: {
  totalTime: number;
  totalEntries: number;
  averageDuration: number;
  topTags: Array<{ tag: string; count: number }>;
  topTopics: Array<{ topic: string; count: number }>;
  wordFrequency: Array<{ word: string; count: number }>;
  sentimentData: Array<{ sentiment: string; count: number }>;
 };
 fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>()(
 persist(
  (set) => ({
   analytics: {
    totalTime: 0,
    totalEntries: 0,
    averageDuration: 0,
    topTags: [],
    topTopics: [],
    wordFrequency: [],
    sentimentData: [],
   },

   fetchAnalytics: async () => {
    const token = useAuthStore.getState().token;

    const response = await fetch(`${API_URL}/analytics`, {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });
    const analytics = await response.json();
    set({ analytics: analytics.data });
   },
  }),
  {
   name: 'journal-storage',
  }
 )
);
