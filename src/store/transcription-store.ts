import { create } from 'zustand';
import { useAuthStore } from './auth-store';
import { API_URL } from '@/constants';

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

  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  set({ isSending: true });

  try {
   const response = await fetch(
    `${API_URL}/transcription/transcribe/${userId}`,
    {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${token}`,
     },
     body: formData,
    }
   );

   const data = await response.json();
   set({
    transcribedText: data.text,
    isSending: false,
   });
  } catch (error) {
   console.error('Transcription error:', error);
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
