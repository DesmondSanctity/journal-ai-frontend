'use client';

import { DashboardNav } from '@/components/dashboard/nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const [isNavOpen, setIsNavOpen] = useState(false);

 return (
  <div className='flex flex-col min-h-screen w-full bg-gray-50'>
   <header className='sticky top-0 z-50 w-full border-b bg-white'>
    <div className='mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-8'>
     <div className='flex h-16 items-center justify-between'>
      <div className='flex items-center gap-4 sm:gap-8 w-full'>
       <div className='flex items-center gap-3'>
        <Button
         variant='ghost'
         size='icon'
         className='md:hidden'
         onClick={() => setIsNavOpen(!isNavOpen)}
        >
         <Menu className='h-5 w-5' />
        </Button>
        <div className='text-xl sm:text-2xl font-bold'>
         <Link href='/dashboard/journal'>
          <div>Journal AI</div>
         </Link>
        </div>
       </div>
       <div className='hidden md:flex flex-1'>
        <DashboardNav />
       </div>
       <UserNav />
      </div>
     </div>
     {/* Mobile Navigation */}
     {isNavOpen && (
      <div className='md:hidden border-t py-2'>
       <DashboardNav />
      </div>
     )}
    </div>
   </header>

   <main className='flex-1 mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8'>
    {children}
   </main>

   <footer className='border-t bg-white mt-8'>
    <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
     <div className='flex h-14 items-center justify-between text-xs sm:text-sm'>
      <p className='text-muted-foreground'>Built with Next.js and Tailwind</p>
      <p className='text-muted-foreground'>© 2024 Journal AI</p>
     </div>
    </div>
   </footer>
  </div>
 );
}
