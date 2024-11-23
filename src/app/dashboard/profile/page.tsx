'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Settings } from 'lucide-react';

const mockUserData = {
 name: 'Alex Johnson',
 email: 'alex@example.com',
 role: 'user',
 joinedDate: 'January 2024',
 stats: {
  totalJournals: 45,
  totalTime: '38.5 hours',
  lastActive: '2 hours ago',
 },
};

export default function ProfilePage() {
 return (
  <div className='space-y-6'>
   <Card>
    <CardHeader>
     <div className='flex items-center gap-6'>
      <Avatar className='h-20 w-20'>
       <AvatarImage src='/avatars/user.png' />
       <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <div>
       <h1 className='text-2xl font-bold'>{mockUserData.name}</h1>
       <div className='flex items-center gap-2 mt-1'>
        <span className='text-muted-foreground'>{mockUserData.email}</span>
        <Badge>{mockUserData.role}</Badge>
       </div>
       <p className='text-sm text-muted-foreground mt-1'>
        Member since {mockUserData.joinedDate}
       </p>
      </div>
     </div>
    </CardHeader>
   </Card>

   <div className='grid gap-4 md:grid-cols-3'>
    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Total Journals</CardTitle>
      <FileText className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>
       {mockUserData.stats.totalJournals}
      </div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Recording Time</CardTitle>
      <Clock className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>{mockUserData.stats.totalTime}</div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Last Active</CardTitle>
      <Settings className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>{mockUserData.stats.lastActive}</div>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}