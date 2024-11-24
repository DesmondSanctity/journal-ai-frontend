import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';

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

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
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
  const analytics = await response.json() as AnalyticsState['analytics'];
  console.log('Fetched entries from API:', analytics);
  set({ analytics });
 },
}));
