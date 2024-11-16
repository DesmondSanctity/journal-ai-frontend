'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, FileText, Tags, Activity } from 'lucide-react';
import {
 LineChart,
 BarChart,
 Line,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer,
} from 'recharts';

const mockMetrics = {
 totalTime: '47.2 hours',
 totalEntries: 156,
 avgDuration: '18.2 mins',
 topTags: ['meeting', 'technical', 'client'],
};

const mockActivityData = [
 { day: 'Mon', entries: 12 },
 { day: 'Tue', entries: 8 },
 { day: 'Wed', entries: 15 },
 { day: 'Thu', entries: 10 },
 { day: 'Fri', entries: 13 },
 { day: 'Sat', entries: 5 },
 { day: 'Sun', entries: 4 },
];

// Add these mock data
const mockSentimentData = [
 { month: 'Jan', positive: 65, neutral: 25, negative: 10 },
 { month: 'Feb', positive: 70, neutral: 20, negative: 10 },
 { month: 'Mar', positive: 60, neutral: 30, negative: 10 },
 { month: 'Apr', positive: 75, neutral: 15, negative: 10 },
];

const mockTopicsData = [
 { topic: 'Product Development', count: 45 },
 { topic: 'Team Collaboration', count: 38 },
 { topic: 'Client Meetings', count: 32 },
 { topic: 'Technical Reviews', count: 28 },
 { topic: 'Strategy Planning', count: 25 },
];

const mockWordFrequency = [
 { word: 'integration', frequency: 87 },
 { word: 'deployment', frequency: 76 },
 { word: 'testing', frequency: 65 },
 { word: 'feedback', frequency: 54 },
 { word: 'milestone', frequency: 43 },
];

export default function AnalyticsPage() {
 return (
  <div className='space-y-6'>
   <div>
    <h1 className='text-3xl font-bold tracking-tight'>Analytics</h1>
    <p className='text-muted-foreground mt-2'>
     Insights and metrics about your journals and transcriptions
    </p>
   </div>
   <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Total Time</CardTitle>
      <Clock className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>{mockMetrics.totalTime}</div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Total Entries</CardTitle>
      <FileText className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>{mockMetrics.totalEntries}</div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Avg Duration</CardTitle>
      <Activity className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>{mockMetrics.avgDuration}</div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Top Tags</CardTitle>
      <Tags className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='flex flex-wrap gap-2'>
       {mockMetrics.topTags.map((tag) => (
        <span key={tag} className='text-sm text-muted-foreground'>
         #{tag}
        </span>
       ))}
      </div>
     </CardContent>
    </Card>
   </div>

   {/* Charts Section 1 */}
   <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
    <Card className='min-h-[400px]'>
     <CardHeader>
      <CardTitle className='text-lg'>Weekly Activity</CardTitle>
     </CardHeader>
     <CardContent className='h-[350px]'>
      <ResponsiveContainer width='100%' height='100%'>
       <BarChart data={mockActivityData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='day' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='entries' fill='#0ea5e9' />
       </BarChart>
      </ResponsiveContainer>
     </CardContent>
    </Card>

    <Card className='min-h-[400px]'>
     <CardHeader>
      <CardTitle className='text-lg'>Performance Metrics</CardTitle>
     </CardHeader>
     <CardContent className='h-[350px]'>
      <ResponsiveContainer width='100%' height='100%'>
       <LineChart data={mockActivityData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='day' />
        <YAxis />
        <Tooltip />
        <Line type='monotone' dataKey='entries' stroke='#0ea5e9' />
       </LineChart>
      </ResponsiveContainer>
     </CardContent>
    </Card>
   </div>

   {/* Charts Section 2 */}
   <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    <Card className='min-h-[400px]'>
     <CardHeader>
      <CardTitle className='text-lg'>Sentiment Analysis</CardTitle>
     </CardHeader>
     <CardContent className='h-[300px]'>
      <ResponsiveContainer width='100%' height='100%'>
       <BarChart data={mockSentimentData}>
        <XAxis dataKey='month' />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip />
        <Bar
         dataKey='positive'
         fill='#4ade80'
         stackId='sentiment'
         name='Positive'
        />
        <Bar
         dataKey='neutral'
         fill='#94a3b8'
         stackId='sentiment'
         name='Neutral'
        />
        <Bar
         dataKey='negative'
         fill='#f87171'
         stackId='sentiment'
         name='Negative'
        />
       </BarChart>
      </ResponsiveContainer>
     </CardContent>
    </Card>

    <Card className='min-h-[400px]'>
     <CardHeader>
      <CardTitle className='text-lg'>Top Discussion Topics</CardTitle>
     </CardHeader>
     <CardContent className='h-[300px]'>
      <ResponsiveContainer width='100%' height='100%'>
       <BarChart data={mockTopicsData} layout='vertical'>
        <XAxis type='number' />
        <YAxis dataKey='topic' type='category' width={100} />
        <Tooltip />
        <Bar dataKey='count' fill='#0ea5e9' />
       </BarChart>
      </ResponsiveContainer>
     </CardContent>
    </Card>

    <Card className='lg:col-span-1 md:col-span-2'>
     <CardHeader>
      <CardTitle className='text-lg'>Word Frequency</CardTitle>
     </CardHeader>
     <CardContent>
      <div className='space-y-3'>
       {mockWordFrequency.map((item) => (
        <div key={item.word} className='flex items-center gap-2'>
         <div className='w-20 sm:w-24 truncate font-medium'>{item.word}</div>
         <div className='flex-1'>
          <div className='h-2 rounded-full bg-muted'>
           <div
            className='h-full rounded-full bg-blue-500'
            style={{
             width: `${
              (item.frequency / mockWordFrequency[0].frequency) * 100
             }%`,
            }}
           />
          </div>
         </div>
         <div className='w-12 text-right text-sm text-muted-foreground'>
          {item.frequency}
         </div>
        </div>
       ))}
      </div>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}