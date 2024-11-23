'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranscriptionStore } from '@/store/transcription-store';
import { Mic, Square, AudioWaveform, Play, Send } from 'lucide-react';

export function AudioRecorder() {
 const mediaRecorder = useRef<MediaRecorder | null>(null);
 const audioChunks = useRef<Blob[]>([]);
 const audioPlayer = useRef<HTMLAudioElement | null>(null);
 const [canPlay, setCanPlay] = useState(false);

 const {
  sendAudioRecording,
  setAudioBlob,
  audioBlob,
  transcribedText,
  isRecording,
  isSending,
  setIsRecording,
 } = useTranscriptionStore();

 const handleRecording = async (e: React.MouseEvent) => {
  e.preventDefault();
  if (!isRecording) {
   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   mediaRecorder.current = new MediaRecorder(stream);
   audioChunks.current = [];

   mediaRecorder.current.ondataavailable = (event) => {
    audioChunks.current.push(event.data);
   };

   mediaRecorder.current.onstop = () => {
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
    setAudioBlob(audioBlob);
    setCanPlay(true);
   };

   setIsRecording(true);
   mediaRecorder.current.start();
  } else {
   handleStopRecording();
  }
 };

 const handleStopRecording = () => {
  mediaRecorder.current?.stop();
  setIsRecording(false);
  mediaRecorder.current?.stream.getTracks().forEach((track) => track.stop());
 };

 const handlePlayback = () => {
  if (audioBlob) {
   const audioUrl = URL.createObjectURL(audioBlob);
   audioPlayer.current = new Audio(audioUrl);
   audioPlayer.current.play();
  }
 };

 const handleSubmit = async () => {
  if (audioBlob) {
   await sendAudioRecording(audioBlob);
  }
 };

 useEffect(() => {
  return () => {
   if (mediaRecorder.current?.state === 'recording') {
    mediaRecorder.current.stop();
   }
   if (audioPlayer.current) {
    audioPlayer.current.pause();
   }
  };
 }, []);

 return (
  <div className='space-y-4'>
   <div className='flex items-center gap-2'>
    <Button
     onClick={handleRecording}
     variant={isRecording ? 'destructive' : 'default'}
     className='flex items-center gap-2'
    >
     {isRecording ? (
      <>
       <Square className='h-4 w-4' />
       Stop Recording
      </>
     ) : (
      <>
       <Mic className='h-4 w-4' />
       Start Recording
      </>
     )}
    </Button>

    {canPlay && !isRecording && (
     <>
      <Button onClick={handlePlayback} variant='outline'>
       <Play className='h-4 w-4 mr-2' />
       Play
      </Button>
      <Button onClick={handleSubmit} disabled={isSending} variant='default'>
       <Send className='h-4 w-4 mr-2' />
       {isSending ? 'Sending...' : 'Send'}
      </Button>
     </>
    )}
   </div>

   {isRecording && (
    <div className='flex items-center gap-2 animate-fade-in'>
     <div className='flex gap-1'>
      {[...Array(3)].map((_, i) => (
       <div
        key={i}
        className='h-2 w-2 rounded-full bg-green-500 animate-bounce'
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