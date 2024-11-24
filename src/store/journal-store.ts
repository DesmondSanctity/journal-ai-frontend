import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

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
  publicId: string;
  createdAt: string;
 }>;
 fetchEntries: () => Promise<void>;
 fetchEntryById: (id: string) => Promise<void>;
 deleteEntry: (id: string) => Promise<void>;
 clearEntries: () => void;
}

export const useJournalStore = create<JournalState>()(
 persist(
  (set) => ({
   entries: [],
   entry: {},

   fetchEntries: async () => {
    try {
     const token = useAuthStore.getState().token;

     const response = await fetch(`${API_URL}/journal`, {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     });
     const entries = await response.json();
     set({ entries: entries.data });
    } catch (error) {
     console.error('Error fetching entries:', error);
     toast.error('Failed to fetch entries');
    }
   },

   fetchEntryById: async (id: string) => {
    try {
     // find the entry with the given id
     const foundEntry = useJournalStore
      .getState()
      .entries.find((entry) => entry.id === id);
     if (foundEntry) {
      set((state) => ({ ...state, currentEntry: foundEntry }));
     }
    } catch (error) {
     console.error('Error fetching entry:', error);
     toast.error('Failed to fetch entry');
    }
   },

   deleteEntry: async (id: string) => {
    try {
     const token = useAuthStore.getState().token;

     // Delete from backend
     await fetch(`${API_URL}/journal/${id}`, {
      method: 'DELETE',
      headers: {
       Authorization: `Bearer ${token}`,
      },
     });

     // Update local state
     set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
     }));
    } catch (error) {
     console.error('Error deleting entry:', error);
     toast.error('Failed to delete entry');
    }
   },

   clearEntries: () => set({ entries: [] }),
  }),
  {
   name: 'journal-storage',
  }
 )
);
