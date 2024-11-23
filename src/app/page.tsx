'use client';

import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, BookText, BarChart2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
 return (
  <div className='flex flex-col min-h-screen'>
   {/* Navbar */}
   <Nav />

   {/* Hero Section */}
   <section className='py-20 sm:py-32'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
     <h1 className='text-4xl sm:text-6xl font-bold tracking-tight'>
      Transform Your Thoughts Into
      <span className='text-primary block mt-2'>Organized Insights</span>
     </h1>
     <p className='mt-6 text-lg text-muted-foreground max-w-2xl mx-auto'>
      Record your thoughts naturally. Our AI transforms your voice into
      structured journal entries, complete with summaries and insights.
     </p>
     <div className='mt-10 flex items-center justify-center gap-4'>
      <Link href='/auth/register'>
       <Button size='lg' className='gap-2'>
        Start Journaling <ArrowRight className='h-4 w-4' />
       </Button>
      </Link>
     </div>
    </div>
   </section>

   {/* Features Grid */}
   <section className='py-20 bg-slate-50'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
     <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      <div className='flex flex-col items-center text-center p-6'>
       <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
        <Mic className='h-6 w-6 text-primary' />
       </div>
       <h3 className='text-xl font-semibold'>Voice to Text</h3>
       <p className='mt-2 text-muted-foreground'>
        Speak naturally and watch your thoughts transform into organized text
       </p>
      </div>
      <div className='flex flex-col items-center text-center p-6'>
       <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
        <BookText className='h-6 w-6 text-primary' />
       </div>
       <h3 className='text-xl font-semibold'>Smart Summaries</h3>
       <p className='mt-2 text-muted-foreground'>
        AI-powered daily summaries of your journal entries
       </p>
      </div>
      <div className='flex flex-col items-center text-center p-6'>
       <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
        <BarChart2 className='h-6 w-6 text-primary' />
       </div>
       <h3 className='text-xl font-semibold'>Insightful Analytics</h3>
       <p className='mt-2 text-muted-foreground'>
        Track patterns and gain insights from your journaling habits
       </p>
      </div>
     </div>
    </div>
   </section>

   {/* How it Works */}
   <section className='py-20'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
     <h2 className='text-3xl font-bold text-center mb-12'>How It Works</h2>
     <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      {[1, 2, 3].map((step) => (
       <div key={step} className='relative'>
        <div className='flex items-center gap-4 mb-4'>
         <div className='h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold'>
          {step}
         </div>
         <h3 className='font-semibold'>
          {step === 1 && 'Record Your Thoughts'}
          {step === 2 && 'AI Processing'}
          {step === 3 && 'Review Insights'}
         </h3>
        </div>
        <p className='text-muted-foreground'>
         {step === 1 && 'Speak naturally about your day, ideas, or reflections'}
         {step === 2 && 'Our AI transcribes and analyzes your recordings'}
         {step === 3 && 'Get organized entries with summaries and insights'}
        </p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* CTA */}
   <section className='py-20 bg-primary'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
     <div className='max-w-2xl mx-auto'>
      <h2 className='text-3xl font-bold text-white mb-6'>
       Start Your Journaling Journey Today
      </h2>
      <p className='text-primary-foreground/80 mb-8'>
       Join thousands of others who have transformed their journaling experience
      </p>
      <Link href='/auth/register'>
       <Button size='lg' variant='secondary' className='gap-2'>
        Get Started <Sparkles className='h-4 w-4' />
       </Button>
      </Link>
     </div>
    </div>
   </section>

   {/* Footer */}
   <Footer />
  </div>
 );
}
