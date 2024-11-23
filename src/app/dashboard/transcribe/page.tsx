'use client';

import { EntryHistory } from '@/components/journal/history';

const mockTranscriptionEntries = [
 {
  id: '1',
  title: 'Weekly Team Sync',
  duration: 1800,
  tags: ['meeting', 'team', 'planning'],
  createdAt: new Date().toISOString(),
  status: 'completed' as const,
 },
 {
  id: '2',
  title: 'Product Design Review',
  duration: 3600,
  tags: ['design', 'product', 'feedback'],
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  status: 'completed' as const,
 },
 {
  id: '3',
  title: 'Client Presentation',
  duration: 2400,
  tags: ['client', 'presentation', 'external'],
  createdAt: new Date(Date.now() - 7200000).toISOString(),
  status: 'processing' as const,
 },
 {
  id: '4',
  title: 'Technical Deep Dive',
  duration: 4500,
  tags: ['technical', 'architecture', 'planning'],
  createdAt: new Date(Date.now() - 10800000).toISOString(),
  status: 'completed' as const,
 },
 {
  id: '5',
  title: 'Sprint Retrospective',
  duration: 1200,
  tags: ['team', 'retrospective', 'agile'],
  createdAt: new Date(Date.now() - 14400000).toISOString(),
  status: 'completed' as const,
 },
];

export default function TranscribePage() {
 return (
  <div className='space-y-6'>
   <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
    <div>
     <p className='text-sm sm:text-base text-muted-foreground mt-2'></p>
    </div>
   </div>
   <EntryHistory type='transcription' entries={mockTranscriptionEntries} />
  </div>
 );
}
