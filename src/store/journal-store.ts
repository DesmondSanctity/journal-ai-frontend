import { API_URL } from '@/constants';
import { create } from 'zustand';
import { useAuthStore } from './auth-store';

interface JournalState {
 entries: Array<{
  id: string;
  title: string;
  content: string;
  audioUrl: string;
  createdAt: string;
  tags?: string[];
 }>;
 addEntry: (entry: {
  title: string;
  content: string;
  audioUrl: string;
  tags?: string[];
 }) => Promise<void>;
 fetchEntries: () => Promise<void>;
}

export const useJournalStore = create<JournalState>((set) => ({
 entries: [],
 addEntry: async (entry) => {
  const token = useAuthStore.getState().token;

  if (!token) return;

  const response = await fetch(`${API_URL}/journal`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   },
   body: JSON.stringify(entry),
  });
  const newEntry = await response.json();
  set((state) => ({ entries: [...state.entries, newEntry] }));
 },
 fetchEntries: async () => {
  const response = await fetch(`${API_URL}/journal`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem('auth-storage')}`,
   },
  });
  const entries = await response.json();
  set({ entries });
 },
}));
