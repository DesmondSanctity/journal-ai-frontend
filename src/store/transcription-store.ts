import { create } from 'zustand';
import { useAuthStore } from './auth-store';
import { API_URL } from '@/constants';
import { useJournalStore } from './journal-store';
import { useAnalyticsStore } from './analytics-store';
import { saveAudioFile } from '@/lib/file';
import toast from 'react-hot-toast';

interface TranscriptionState {
 isConnected: boolean;
 transcribedText: string;
 audioBlob: Blob | null;
 isRecording: boolean;
 isSending: boolean;
 sendAudioRecording: (audioBlob: Blob) => Promise<void>;
 setIsRecording: (value: boolean) => void;
 setAudioBlob: (blob: Blob) => void;
 resetState: () => void;
}

export const useTranscriptionStore = create<TranscriptionState>((set) => ({
 isConnected: false,
 transcribedText: '',
 audioBlob: null,
 isRecording: false,
 isSending: false,

 setIsRecording: (value: boolean) => {
  set({ isRecording: value });
 },

 setAudioBlob: (blob: Blob) => {
  set({ audioBlob: blob });
 },

 sendAudioRecording: async (audioBlob: Blob) => {
  const { token, user } = useAuthStore.getState();
  const userId = user?.id;

  if (!userId || !token) return;

  set({ isSending: true });

  try {
   const { url, publicId } = await saveAudioFile(audioBlob);

   const response = await fetch(
    `${API_URL}/transcription/transcribe/${userId}`,
    {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({ audioUrl: url, publicId }),
    }
   );

   if (!response.ok) {
    throw new Error('Transcription request failed');
   }

   const data = await response.json();
   set({
    transcribedText: data.text,
    isSending: false,
   });

   toast.success('Journal entry created successfully!');

   // Refresh journals and analytics after new entry
   useJournalStore.getState().fetchEntries();
   useAnalyticsStore.getState().fetchAnalytics();
  } catch (error) {
   toast.error('Failed to create journal entry');
   set({ isSending: false });
  }
 },

 resetState: () => {
  set({
   transcribedText: '',
   audioBlob: null,
   isRecording: false,
   isSending: false,
  });
 },
}));
