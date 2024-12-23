'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { formatDistanceToNow } from 'date-fns';
import { useJournalStore } from '@/store/journal-store';

export default function ProfilePage() {
 const user = useAuthStore((state) => state.user);
 const entries = useJournalStore((state) => state.entries);

 if (!user) return null;

 const stats = {
  totalJournals: entries.length,
  totalTime: `${(
   entries.reduce((sum, entry) => sum + (entry.duration || 0), 0) / 60
  ).toFixed(1)} minutes`,
  lastActive: entries[0]
   ? formatDistanceToNow(new Date(entries[0].createdAt)) + ' ago'
   : 'No activity yet',
 };

 return (
  <div className='space-y-6'>
   <Card>
    <CardHeader>
     <div className='flex items-center gap-6'>
      <Avatar className='h-20 w-20'>
       <AvatarImage src='/avatars/user.png' />
       <AvatarFallback>
        {user?.name
         ?.split(' ')
         .map((part) => part[0])
         .join('')
         .toUpperCase()
         .slice(0, 2)}
       </AvatarFallback>
      </Avatar>
      <div>
       <h1 className='text-2xl font-bold'>{user?.name}</h1>
       <div className='flex items-center gap-2 mt-1'>
        <span className='text-muted-foreground'>{user?.email}</span>
        <Badge>{user?.role}</Badge>
       </div>
       <p className='text-sm text-muted-foreground mt-1'>
        Member since {formatDistanceToNow(new Date(user?.createdAt))} ago
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
       {stats.totalJournals}
      </div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Recording Time</CardTitle>
      <Clock className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>{stats.totalTime}</div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Last Entry</CardTitle>
      <Settings className='h-4 w-4 text-muted-foreground' />
     </CardHeader>
     <CardContent>
      <div className='text-2xl font-bold'>{stats.lastActive}</div>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}
