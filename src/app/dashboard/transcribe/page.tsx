'use client';

import { EntryHistory } from '@/components/journal/history';
import { Card, CardContent } from '@/components/ui/card';
import { useJournalStore } from '@/store/journal-store';
import { BookOpen } from 'lucide-react';

export default function TranscribePage() {
 const { entries = [] } = useJournalStore.getState();

 return (
  <div className='space-y-6'>
   <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
    <div>
     <p className='text-sm sm:text-base text-muted-foreground mt-2'></p>
    </div>
   </div>
   {entries.length > 0 ? (
    <EntryHistory type='transcription' entries={entries} />
   ) : (
    <Card className='py-12'>
     <CardContent className='flex flex-col items-center justify-center text-center'>
      <BookOpen className='h-12 w-12 text-muted-foreground mb-4' />
      <h3 className='text-lg font-semibold mb-2'>No Journals History Yet</h3>
      <p className='text-muted-foreground'>
       Start recording your thoughts using the audio recorder above
      </p>
     </CardContent>
    </Card>
   )}
  </div>
 );
}
