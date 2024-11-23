'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Tag, FileText, ListChecks, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const mockTranscript = {
 id: '1',
 title: 'Team Standup Meeting',
 duration: 1800,
 createdAt: new Date().toISOString(),
 segments: [
  { text: "Let's begin with updates from the frontend team.", timestamp: 0 },
  { text: 'We completed the new dashboard implementation.', timestamp: 45 },
 ],
 summary:
  'Weekly team standup covering frontend updates, backend progress, and upcoming sprint planning.',
 tags: ['meeting', 'standup', 'team-updates'],
 categories: ['Development', 'Planning'],
};

export default function TranscriptPage() {
 return (
  <div>
   <div className='mb-8'>
    <Link href='/dashboard/transcribe'>
     <Button variant='ghost' className='flex items-center gap-2'>
      <ArrowLeft className='h-4 w-4' />
      Back to Transcriptions
     </Button>
    </Link>
   </div>

   <div className='max-w-4xl mx-auto space-y-6'>
    <div className='flex items-center justify-between'>
     <h1 className='text-3xl font-bold'>{mockTranscript.title}</h1>
     <div className='flex items-center gap-2 text-muted-foreground'>
      <Clock className='h-4 w-4' />
      <span>{Math.floor(mockTranscript.duration / 60)} minutes</span>
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
        {mockTranscript.segments.map((segment, index) => (
         <div
          key={index}
          className='flex gap-4 py-2 hover:bg-muted/50 rounded-lg px-2'
         >
          <span className='text-sm text-muted-foreground w-20'>
           {new Date(segment.timestamp * 1000).toISOString().substr(14, 5)}
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
        <p className='leading-7'>{mockTranscript.summary}</p>
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
          {mockTranscript.tags.map((tag) => (
           <Badge key={tag} variant='secondary'>
            {tag}
           </Badge>
          ))}
         </div>
        </div>

        <div className='space-y-2'>
         <div className='flex items-center gap-2 text-sm font-medium'>
          <ListChecks className='h-4 w-4' /> Categories
         </div>
         <div className='flex gap-2'>
          {mockTranscript.categories.map((category) => (
           <Badge key={category} variant='outline'>
            {category}
           </Badge>
          ))}
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
