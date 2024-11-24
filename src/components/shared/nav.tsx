import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Nav() {
 return (
  <nav className='border-b'>
   <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
    <div className='flex items-center justify-between h-16'>
     <Link href='/'>
      <div className='text-2xl font-bold'>Athene AI</div>
     </Link>
     <div className='flex items-center gap-4'>
      <Link href='/auth/login'>
       <Button variant='ghost'>Login</Button>
      </Link>
      <Link href='/auth/register'>
       <Button>Get Started</Button>
      </Link>
     </div>
    </div>
   </div>
  </nav>
 );
}
