import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';
import { persist } from 'zustand/middleware';

interface AnalyticsState {
 analytics: {
  metrics: {
   totalTime: string;
   totalEntries: number;
   avgDuration: string;
   topTags: string[];
  };
  activityData: Array<{ day: string; entries: number }>;
  sentimentData: Array<{
   month: string;
   positive: number;
   neutral: number;
   negative: number;
  }>;
  topicsData: Array<{ topic: string; count: number }>;
  wordFrequency: Array<{ word: string; frequency: number }>;
 };
 fetchAnalytics: () => Promise<void>;
 clearAnalytics: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
 persist(
  (set) => ({
   analytics: {
    metrics: {
     totalTime: '0',
     totalEntries: 0,
     avgDuration: '0',
     topTags: [],
    },
    activityData: [],
    sentimentData: [],
    topicsData: [],
    wordFrequency: [],
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

   clearAnalytics: () =>
    set({
     analytics: {
      metrics: {
       totalTime: '0',
       totalEntries: 0,
       avgDuration: '0',
       topTags: [],
      },
      activityData: [],
      sentimentData: [],
      topicsData: [],
      wordFrequency: [],
     },
    }),
  }),
  {
   name: 'journal-storage',
  }
 )
);
