import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';
import { persist } from 'zustand/middleware';
import { deleteAudioFile } from '@/lib/file';

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
  }>;
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
 fetchEntryById: (id: string) => Promise<void>;
 deleteEntry: (id: string, audioUrl: string) => Promise<void>;
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

   deleteEntry: async (id: string, audioUrl: string) => {
    const token = useAuthStore.getState().token;

    // Delete from backend
    await fetch(`${API_URL}/journal/${id}`, {
     method: 'DELETE',
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });

    // Delete audio file from Cloudinary
    await deleteAudioFile(audioUrl);

    // Update local state
    set((state) => ({
     entries: state.entries.filter((entry) => entry.id !== id),
    }));
   },
  }),
  {
   name: 'journal-storage',
  }
 )
);
