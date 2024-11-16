'use client';

import { AudioRecorder } from '@/components/journal/audio-recorder';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BookText, CalendarDays } from 'lucide-react';
import { EntryHistory } from '@/components/journal/history';
import { useState } from 'react';

const mockJournalEntries = [
 {
  id: '1',
  title: 'Morning Standup Discussion',
  content:
   'Team velocity is improving. Frontend deployments are now automated. New feature requests from product team.',
  tags: ['work', 'meetings', 'team'],
  createdAt: new Date().toISOString(),
 },
 {
  id: '2',
  title: 'Product Strategy Session',
  content:
   'Discussed Q4 roadmap. Priority on user engagement features. Mobile app development starting next month.',
  tags: ['strategy', 'product', 'planning'],
  createdAt: new Date(Date.now() - 3600000).toISOString(),
 },
 {
  id: '3',
  title: 'Technical Architecture Review',
  content:
   'Evaluated microservices structure. Need to improve API documentation. Performance optimization required.',
  tags: ['technical', 'architecture', 'planning'],
  createdAt: new Date(Date.now() - 7200000).toISOString(),
 },
 {
  id: '4',
  title: 'Client Feedback Meeting',
  content:
   'Positive response to new UI. Some concerns about mobile performance. Schedule follow-up next week.',
  tags: ['client', 'feedback', 'meetings'],
  createdAt: new Date(Date.now() - 10800000).toISOString(),
 },
];

export default function JournalPage() {
 const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

 return (
  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
   {/* Left Column - Journal Input and History */}
   <div className='lg:col-span-2 space-y-6'>
    <Card>
     <CardHeader>
      <CardTitle>Today's Journal</CardTitle>
     </CardHeader>
     <CardContent>
      <Input placeholder='Give your journal entry a title...' />
      <div className='mt-4'>
       <AudioRecorder />
      </div>
     </CardContent>
    </Card>

    <EntryHistory type='journal' entries={mockJournalEntries} />
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
       <p className='text-muted-foreground leading-relaxed'>
        Started the day with a team standup discussing frontend deployments and
        velocity improvements. The team shared progress on automated deployment
        pipelines.
       </p>
       <p className='text-muted-foreground leading-relaxed'>
        Had a productive strategy session about Q4 roadmap. Key focus areas
        include enhancing user engagement features and kickstarting mobile app
        development next month.
       </p>
       <p className='text-muted-foreground leading-relaxed'>
        Wrapped up with a technical review of our microservices architecture.
        Identified areas for API documentation improvements and performance
        optimization opportunities.
       </p>
      </div>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}
