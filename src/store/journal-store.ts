import { create } from 'zustand';

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
  const response = await fetch('http://localhost:8787/api/journal', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('auth-storage')}`,
   },
   body: JSON.stringify(entry),
  });
  const newEntry = await response.json();
  set((state) => ({ entries: [...state.entries, newEntry] }));
 },
 fetchEntries: async () => {
  const response = await fetch('http://localhost:8787/api/journal', {
   headers: {
    Authorization: `Bearer ${localStorage.getItem('auth-storage')}`,
   },
  });
  const entries = await response.json();
  set({ entries });
 },
}));
