'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Tag, FileText, ArrowLeft, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useJournalStore } from '@/store/journal-store';
import { calculateDominantMood } from '@/lib/journal';

export default function TranscriptPage() {
 const params = useParams();
 const router = useRouter();
 const journalId = params.id as string;
 const entry = useJournalStore((state) =>
  state.entries.find((entry) => entry.id === journalId)
 );
 const deleteEntry = useJournalStore((state) => state.deleteEntry);

 const dominantMood = calculateDominantMood(entry?.sentiments || []);

 if (!entry) {
  return <div>Entry not found</div>;
 }

 return (
  <div>
   <div className='mb-8 flex items-center justify-between'>
    <Link href='/dashboard/transcribe'>
     <Button variant='ghost' className='flex items-center gap-2'>
      <ArrowLeft className='h-4 w-4' />
      Back to Transcriptions
     </Button>
    </Link>

    <Button
     variant='destructive'
     size='sm'
     className='flex items-center gap-2'
     onClick={async () => {
      await deleteEntry(entry.id);
      // Add your delete entry logic here
      router.push('/dashboard/journal');
     }}
    >
     <Trash2 className='h-4 w-4' />
     <span className='hidden sm:inline'>Delete Entry</span>
    </Button>
   </div>

   <div className='max-w-4xl mx-auto space-y-6'>
    <div className='flex items-center justify-between'>
     <h1 className='text-xl font-bold'>{entry.title ?? 'Journal Entry'}</h1>
     <div className='flex items-center gap-2 text-muted-foreground'>
      <Clock className='h-4 w-4' />
      <span>{Math.floor(entry.duration / 60)} minutes</span>
     </div>
    </div>

    <Tabs defaultValue='transcript' className='space-y-4'>
     <TabsList>
      <TabsTrigger value='transcript'>Full Transcript</TabsTrigger>
      <TabsTrigger value='summary'>Summary</TabsTrigger>
      <TabsTrigger value='metadata'>Metadata</TabsTrigger>
     </TabsList>

     <TabsContent value='transcript'>
      <Card>
       <CardContent className='pt-6'>
        {entry.segments.map((segment, index) => (
         <div
          key={index}
          className='flex gap-4 py-2 hover:bg-muted/50 rounded-lg px-2'
         >
          <span className='text-sm text-muted-foreground whitespace-nowrap min-w-[80px]'>
           {segment.timestamp}
          </span>
          <p className='flex-1'>{segment.text}</p>
         </div>
        ))}
       </CardContent>
      </Card>
     </TabsContent>

     <TabsContent value='summary'>
      <Card>
       <CardHeader>
        <CardTitle className='flex items-center gap-2'>
         <FileText className='h-5 w-5' /> Summary
        </CardTitle>
       </CardHeader>
       <CardContent>
        <p className='leading-7 whitespace-pre-line'>{entry.summary}</p>
       </CardContent>
      </Card>
     </TabsContent>

     <TabsContent value='metadata'>
      <Card>
       <CardContent className='pt-6 space-y-6'>
        <div className='space-y-2'>
         <div className='flex items-center gap-2 text-sm font-medium'>
          <Tag className='h-4 w-4' /> Tags
         </div>
         <div className='flex gap-2'>
          {entry.tags.map((tag) => (
           <Badge key={tag} variant='secondary'>
            {tag}
           </Badge>
          ))}
         </div>
        </div>

        <div className='space-y-4 text-sm'>
         {/* Date and Time */}
         <div>
          <h4 className='font-medium mb-1'>Created</h4>
          <span className='text-muted-foreground'>
           {new Date(entry.createdAt).toLocaleString()}
          </span>
         </div>

         {/* Audio Player */}
         <div>
          <h4 className='font-medium mb-1'>Recording</h4>
          <audio controls className='w-full'>
           <source src={entry.audioUrl} type='audio/webm' />
          </audio>
         </div>

         {/* Average Mood */}
         <div>
          <h4 className='font-medium mb-1'>Overall Mood</h4>
          <span className='text-muted-foreground capitalize'>
           {dominantMood}
          </span>
         </div>
        </div>
       </CardContent>
      </Card>
     </TabsContent>
    </Tabs>
   </div>
  </div>
 );
}
