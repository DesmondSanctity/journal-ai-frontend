'use client';

import { PageWrapper } from '@/components/shared/page-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Loader2, Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
 const [sending, setSending] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSending(true);
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setSending(false);
 };

 return (
  <PageWrapper>
   <div className='bg-slate-50'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
     <div className='max-w-2xl mx-auto space-y-8'>
      <div className='text-center'>
       <h1 className='text-3xl font-bold'>Get in Touch</h1>
       <p className='mt-2 text-muted-foreground'>
        Have questions about Journal AI? We&apos;re here to help you transform your
        journaling experience.
       </p>
      </div>

      <Card>
       <CardHeader>
        <CardTitle className='text-2xl'>Send us a Message</CardTitle>
       </CardHeader>
       <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
         <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
           <label className='text-sm font-medium'>First Name</label>
           <Input placeholder='John' />
          </div>
          <div className='space-y-2'>
           <label className='text-sm font-medium'>Last Name</label>
           <Input placeholder='Doe' />
          </div>
         </div>

         <div className='space-y-2'>
          <label className='text-sm font-medium'>Email</label>
          <Input type='email' placeholder='john@example.com' />
         </div>

         <div className='space-y-2'>
          <label className='text-sm font-medium'>Message</label>
          <Textarea
           placeholder='How can we help you?'
           className='min-h-[150px]'
          />
         </div>
         <Button className='w-full gap-2' disabled={sending}>
          {sending ? (
           <>
            Sending...
            <Loader2 className='h-4 w-4 animate-spin' />
           </>
          ) : (
           <>
            Send Message
            <Send className='h-4 w-4' />
           </>
          )}
         </Button>
        </form>
       </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
       <div className='text-center'>
        <Mail className='h-6 w-6 mx-auto mb-2 text-primary' />
        <h3 className='font-medium'>Email Us</h3>
        <p className='text-sm text-muted-foreground'>support@journalai.com</p>
       </div>
       <div className='text-center'>
        <Clock className='h-6 w-6 mx-auto mb-2 text-primary' />
        <h3 className='font-medium'>Response Time</h3>
        <p className='text-sm text-muted-foreground'>Within 24 hours</p>
       </div>
       <div className='text-center'>
        <MessageSquare className='h-6 w-6 mx-auto mb-2 text-primary' />
        <h3 className='font-medium'>Live Chat</h3>
        <p className='text-sm text-muted-foreground'>Mon-Fri, 9am-5pm EST</p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </PageWrapper>
 );
}
