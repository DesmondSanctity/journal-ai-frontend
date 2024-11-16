import { create } from 'zustand';
import { useAuthStore } from './auth-store';

interface TranscriptionState {
 isConnected: boolean;
 transcribedText: string;
 sessionId: string | null;
 isRecording: boolean;
 ws: WebSocket | null;
 startWebSocket: () => Promise<void>;
 sendAudioChunk: (chunk: Blob) => void;
 endSession: () => void;
 setIsRecording: (value: boolean) => void;
}

export const useTranscriptionStore = create<TranscriptionState>((set, get) => ({
 isConnected: false,
 transcribedText: '',
 sessionId: null,
 ws: null,
 isRecording: false,

 setIsRecording: (value: boolean) => {
  set({ isRecording: value });
 },

 startWebSocket: async () => {
  const token = useAuthStore.getState().token;
  const ws = new WebSocket(
   `ws://localhost:8787/api/transcription/ws?token=${token}`
  );

  ws.onopen = () => {
   set({ isConnected: true, ws });
  };

  ws.onmessage = (event) => {
   const data = JSON.parse(event.data);
   if (data.type === 'transcription') {
    set((state) => ({
     transcribedText: state.transcribedText + ' ' + data.text,
    }));
   } else if (data.type === 'session') {
    set({ sessionId: data.sessionId });
   }
  };

  ws.onclose = () => {
   set({ isConnected: false, ws: null });
  };
 },

 sendAudioChunk: (chunk: Blob) => {
  const { ws } = get();
  if (ws && ws.readyState === WebSocket.OPEN) {
   ws.send(chunk);
  }
 },

 endSession: () => {
  const { ws } = get();
  if (ws) {
   ws.close();
  }
  set({
   isConnected: false,
   transcribedText: '',
   sessionId: null,
   ws: null,
  });
 },
}));
