import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
 return (
  <div className='min-h-screen bg-slate-50'>
   <nav className='flex items-center justify-between p-4'>
    <div className='text-2xl font-bold'>
     <Link href='/'>
      <div>Journal AI</div>
     </Link>
    </div>
   </nav>
   <main>{children}</main>
  </div>
 );
}
