import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';

interface JournalState {
 entries: Array<{
  id: string;
  title: string;
  content: string;
  tags: string[];
  excerpt: string;
  summary: string;
  segments: Array<{
   timestamp: string;
   text: string;
  }>;
  duration: number;
  audioUrl: string;
  createdAt: string;
 }>;
 fetchEntries: () => Promise<void>;
}

export const useJournalStore = create<JournalState>((set) => ({
 entries: [],
 fetchEntries: async () => {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/journal`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  const entries = await response.json();
  console.log('Fetched entries from API:', entries);
  set({ entries });
 },
}));
