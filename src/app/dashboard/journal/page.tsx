'use client';

import { AudioRecorder } from '@/components/journal/audio-recorder';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BookText, CalendarDays } from 'lucide-react';
import { EntryHistory } from '@/components/journal/history';
import { useState } from 'react';
import { useJournalStore } from '@/store/journal-store';

export default function JournalPage() {
 const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
 const entries = useJournalStore((state) => state.entries);

 // Filter entries for today
 const todayEntries = Array.isArray(entries)
  ? entries.filter((entry) => {
     const entryDate = new Date(entry.createdAt);
     const today = new Date();
     return (
      entryDate.getDate() === today.getDate() &&
      entryDate.getMonth() === today.getMonth() &&
      entryDate.getFullYear() === today.getFullYear()
     );
    })
  : [];

 return (
  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
   {/* Left Column - Journal Input and History */}
   <div className='lg:col-span-2 space-y-6'>
    <Card>
     <CardHeader>
      <CardTitle>What&apos;s on your mind?</CardTitle>
     </CardHeader>
     <CardContent>
      <h4>Make a journal entry today...</h4>
      <div className='mt-4'>
       <AudioRecorder />
      </div>
     </CardContent>
    </Card>

    {todayEntries.length > 0 ? (
     <EntryHistory type='journal' entries={todayEntries} />
    ) : (
     <Card className='py-12'>
      <CardContent className='flex flex-col items-center justify-center text-center'>
       <BookOpen className='h-12 w-12 text-muted-foreground mb-4' />
       <h3 className='text-lg font-semibold mb-2'>No Journals Yet</h3>
       <p className='text-muted-foreground'>
        Start recording your thoughts using the audio recorder above
       </p>
      </CardContent>
     </Card>
    )}
   </div>

   {/* Right Column - Calendar and Daily Summary */}
   <div className='flex flex-col gap-6'>
    <Card className='hidden lg:block'>
     <CardHeader>
      <CardTitle className='flex items-center gap-2'>
       <CalendarDays className='h-5 w-5' />
       Calendar
      </CardTitle>
     </CardHeader>
     <CardContent className='flex justify-center'>
      <Calendar
       mode='single'
       selected={selectedDate}
       onSelect={setSelectedDate}
       className='rounded-md border'
      />
     </CardContent>
    </Card>

    <Card>
     <CardHeader>
      <CardTitle className='flex items-center gap-2'>
       <BookText className='h-5 w-5' />
       Daily Summary
      </CardTitle>
     </CardHeader>
     <CardContent>
      <div className='space-y-4 text-sm'>
       {todayEntries.length > 0 ? (
        <div className='space-y-2 mt-2'>
         {todayEntries?.map((entry) => (
          <div key={entry.id} className='text-sm text-muted-foreground'>
           {entry.excerpt}
          </div>
         ))}
        </div>
       ) : (
        <p className='text-muted-foreground leading-relaxed'>
         No entries for today. Start by recording your thoughts above.
        </p>
       )}
      </div>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}
