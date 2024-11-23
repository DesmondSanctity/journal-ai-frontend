import Link from 'next/link';

export function Footer() {
 return (
  <footer className='border-t py-8'>
   <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
     <div className='text-sm text-muted-foreground'>
      © 2024 Journal AI. All rights reserved.
     </div>
     <div className='flex items-center gap-6 text-sm text-muted-foreground'>
      <Link href='/privacy'>Privacy</Link>
      <Link href='/terms'>Terms</Link>
      <Link href='/contact'>Contact</Link>
     </div>
    </div>
   </div>
  </footer>
 );
}
