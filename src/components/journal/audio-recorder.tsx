'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranscriptionStore } from '@/store/transcription-store';
import { Mic, Square, AudioWaveform, Play, Send, Pause } from 'lucide-react';
import { saveAudioFile } from '@/lib/file';

export function AudioRecorder() {
 const mediaRecorder = useRef<MediaRecorder | null>(null);
 const audioChunks = useRef<Blob[]>([]);
 const audioPlayer = useRef<HTMLAudioElement | null>(null);
 const [canPlay, setCanPlay] = useState(false);
 const [isPlaying, setIsPlaying] = useState(false);
 const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes

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
   // Stop any playing audio
   if (audioPlayer.current) {
    audioPlayer.current.pause();
    audioPlayer.current = null;
   }
   setIsPlaying(false);
   setCanPlay(false);
   setAudioBlob(new Blob());
   setTimeLeft(300);

   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   mediaRecorder.current = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus',
   });
   audioChunks.current = [];

   mediaRecorder.current.ondataavailable = (event) => {
    audioChunks.current.push(event.data);
   };

   mediaRecorder.current.onstop = async () => {
    const audioBlob = new Blob(audioChunks.current, {
     type: 'audio/webm;codecs=opus',
    });
    setAudioBlob(audioBlob);
    setCanPlay(true);
   };

   setTimeout(() => {
    if (mediaRecorder.current?.state === 'recording') {
     handleStopRecording();
    }
   }, 300000);

   setIsRecording(true);
   mediaRecorder.current.start();
  } else {
   handleStopRecording();
  }
 };
 const handleStopRecording = () => {
  mediaRecorder.current?.stop();
  setIsRecording(false);
  setTimeLeft(300);
  mediaRecorder.current?.stream.getTracks().forEach((track) => track.stop());
 };

 const handlePlayback = () => {
  if (!audioPlayer.current) {
   if (audioBlob) {
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayer.current = new Audio(audioUrl);
    audioPlayer.current.addEventListener('ended', () => setIsPlaying(false));
   }
  }

  if (isPlaying) {
   audioPlayer.current?.pause();
  } else {
   audioPlayer.current?.play();
  }

  setIsPlaying(!isPlaying);
 };

 const handleSubmit = async () => {
  if (audioBlob) {
   await sendAudioRecording(audioBlob);
   setCanPlay(false);
   setAudioBlob(new Blob());
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

 useEffect(() => {
  let timer: NodeJS.Timeout;
  if (isRecording && timeLeft > 0) {
   timer = setInterval(() => {
    setTimeLeft((prev) => {
     if (prev <= 1) handleStopRecording();
     return prev - 1;
    });
   }, 1000);
  }
  return () => clearInterval(timer);
 }, [isRecording, timeLeft]);

 return (
  <div className='space-y-4'>
   <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2'>
    <Button
     onClick={handleRecording}
     variant={isRecording ? 'outline' : 'default'}
     disabled={isSending}
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
      <Button
       onClick={handlePlayback}
       variant='outline'
       disabled={isSending}
       className='w-full sm:w-auto'
      >
       {isPlaying ? (
        <>
         <Pause className='h-4 w-4 mr-2' />
         Pause
        </>
       ) : (
        <>
         <Play className='h-4 w-4 mr-2' />
         Play
        </>
       )}
      </Button>
      <Button
       onClick={handleSubmit}
       disabled={isSending}
       variant='default'
       className='w-full sm:w-auto'
      >
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
     <span className='text-sm text-muted-foreground'>
      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}{' '}
      remaining
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
