'use client';

import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import { Bell, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
 return (
  <div className='space-y-6'>
   <div>
    <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
    <p className='text-muted-foreground mt-2'>
     Manage your account preferences and settings
    </p>
   </div>

   <Tabs defaultValue='general' className='space-y-4'>
    <TabsList>
     <TabsTrigger value='general'>General</TabsTrigger>
     <TabsTrigger value='notifications'>Notifications</TabsTrigger>
     <TabsTrigger value='audio'>Audio</TabsTrigger>
    </TabsList>

    <TabsContent value='general'>
     <Card>
      <CardHeader>
       <div className='flex items-center gap-2'>
        <CardTitle>Appearance</CardTitle>
        <Badge variant='secondary'>Coming Soon</Badge>
       </div>
       <CardDescription>Customize how the app looks and feels</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
       <div className='flex items-center justify-between'>
        <div className='space-y-0.5'>
         <Label>Dark Mode</Label>
         <p className='text-sm text-muted-foreground'>
          Switch between light and dark themes
         </p>
        </div>
        <Switch disabled />
       </div>
      </CardContent>
     </Card>
    </TabsContent>

    <TabsContent value='notifications'>
     <Card>
      <CardHeader>
       <div className='flex items-center gap-2'>
        <Bell className='h-5 w-5' />
        <CardTitle>Notification Preferences</CardTitle>
        <Badge variant='secondary'>Coming Soon</Badge>
       </div>
      </CardHeader>
      <CardContent className='space-y-4'>
       <div className='flex items-center justify-between'>
        <div className='space-y-0.5'>
         <Label>Transcription Complete</Label>
         <p className='text-sm text-muted-foreground'>
          Get notified when your recording is transcribed
         </p>
        </div>
        <Switch disabled />
       </div>
       <div className='flex items-center justify-between'>
        <div className='space-y-0.5'>
         <Label>Daily Summary</Label>
         <p className='text-sm text-muted-foreground'>
          Receive a daily summary of your journals
         </p>
        </div>
        <Switch disabled />
       </div>
      </CardContent>
     </Card>
    </TabsContent>

    <TabsContent value='audio'>
     <Card>
      <CardHeader>
       <div className='flex items-center gap-2'>
        <Volume2 className='h-5 w-5' />
        <CardTitle>Audio Settings</CardTitle>
        <Badge variant='secondary'>Coming Soon</Badge>
       </div>
      </CardHeader>
      <CardContent className='space-y-4'>
       <div className='space-y-2'>
        <Label>Audio Quality</Label>
        <Select defaultValue='high' disabled>
         <SelectTrigger>
          <SelectValue placeholder='Select quality' />
         </SelectTrigger>
         <SelectContent className='bg-white border shadow-md'>
          <SelectItem value='high'>High Quality</SelectItem>
          <SelectItem value='medium'>Medium Quality</SelectItem>
          <SelectItem value='low'>Low Quality</SelectItem>
         </SelectContent>
        </Select>
       </div>
       <div className='flex items-center justify-between'>
        <div className='space-y-0.5'>
         <Label>Noise Cancellation</Label>
         <p className='text-sm text-muted-foreground'>
          Reduce background noise in recordings
         </p>
        </div>
        <Switch disabled />
       </div>
      </CardContent>
     </Card>
    </TabsContent>
   </Tabs>
  </div>
 );
}
