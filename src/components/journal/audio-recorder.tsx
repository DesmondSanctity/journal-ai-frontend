'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useTranscriptionStore } from '@/store/transcription-store';
import { Mic, Square, AudioWaveform } from 'lucide-react';

export function AudioRecorder() {
 const mediaRecorder = useRef<MediaRecorder | null>(null);
 const {
  startWebSocket,
  sendAudioChunk,
  endSession,
  transcribedText,
  isConnected,
  isRecording,
  setIsRecording,
 } = useTranscriptionStore();

 const handleRecording = async (e: React.MouseEvent) => {
  e.preventDefault();
  if (!isRecording) {
   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   mediaRecorder.current = new MediaRecorder(stream, {
    mimeType: 'audio/webm',
   });

   await startWebSocket();
   setIsRecording(true);

   mediaRecorder.current.start(1000);
   mediaRecorder.current.ondataavailable = (event) => {
    sendAudioChunk(event.data);
   };
  } else {
   mediaRecorder.current?.stop();
   setIsRecording(false);
   endSession();
  }
 };

 return (
  <div className='space-y-4'>
   <div className='flex items-center justify-between'>
    <Button
     onClick={handleRecording}
     variant={isRecording ? 'destructive' : 'default'}
     className={`w-full flex items-center gap-2 transition-all duration-300 ${
      isRecording ? 'animate-pulse shadow-lg' : 'hover:scale-[1.02]'
     }`}
    >
     {isRecording ? (
      <>
       <Square className='h-4 w-4 animate-spin' />
       Stop Recording
      </>
     ) : (
      <>
       <Mic className='h-4 w-4' />
       Start Recording
      </>
     )}
    </Button>
   </div>

   {isConnected && (
    <div className='flex items-center gap-2 animate-fade-in'>
     <div className='flex gap-1'>
      {[...Array(3)].map((_, i) => (
       <div
        key={i}
        className={`h-2 w-2 rounded-full bg-green-500 animate-bounce`}
        style={{ animationDelay: `${i * 0.2}s` }}
       />
      ))}
     </div>
     <span className='text-sm text-muted-foreground'>
      Recording in progress...
     </span>
    </div>
   )}

   {transcribedText && (
    <div className='rounded-lg border bg-card p-4 mt-4 animate-slide-up shadow-sm'>
     <div className='flex items-center gap-2 mb-2'>
      <AudioWaveform className='h-4 w-4 text-primary' />
      <span className='text-sm font-medium'>Transcription</span>
     </div>
     <p className='text-sm leading-relaxed'>{transcribedText}</p>
    </div>
   )}
  </div>
 );
}
