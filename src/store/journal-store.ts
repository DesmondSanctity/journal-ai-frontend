import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';
import { persist } from 'zustand/middleware';

interface JournalState {
 entries: Array<{
  id: string;
  title: string;
  content: string;
  tags: string[];
  excerpt: string;
  summary: string;
  segments: Array<{
   text: string;
   timestamp: string;
  }>
  sentiments: Array<{
   sentiment: string;
   text: string;
   confidence: number;
   timestamp: string;
  }>;
  duration: number;
  audioUrl: string;
  createdAt: string;
 }>;
 fetchEntries: () => Promise<void>;
}

export const useJournalStore = create<JournalState>()(
 persist(
  (set) => ({
   entries: [],
   entry: {},

   fetchEntries: async () => {
    const token = useAuthStore.getState().token;

    const response = await fetch(`${API_URL}/journal`, {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });
    const entries = await response.json();
    console.log('Fetched entries from API:', entries);
    set({ entries: entries.data });
   },

   fetchEntryById: async (id: string) => {
    // find the entry with the given id
    const foundEntry = useJournalStore
     .getState()
     .entries.find((entry) => entry.id === id);
    if (foundEntry) {
     set((state) => ({ ...state, currentEntry: foundEntry }));
    }
   },
  }),
  {
   name: 'journal-storage',
  }
 )
);
