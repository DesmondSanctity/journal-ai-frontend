'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookText, Mic, BarChart2 } from 'lucide-react';

const navItems = [
 { href: '/dashboard/journal', label: 'Journal', icon: BookText },
 { href: '/dashboard/transcribe', label: 'Transcribe', icon: Mic },
 { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
];

export function DashboardNav() {
 const pathname = usePathname();

 return (
  <nav className='flex items-center justify-center w-full'>
   <div className='flex md:flex-row flex-col w-full md:w-auto md:items-center md:space-x-8 space-y-2 md:space-y-0'>
    {navItems.map((item) => {
     const Icon = item.icon;
     return (
      <Link
       key={item.href}
       href={item.href}
       className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105',
        pathname === item.href
         ? 'bg-primary/10 text-primary shadow-sm'
         : 'text-muted-foreground hover:bg-gray-100'
       )}
      >
       <Icon className='h-4 w-4' />
       {item.label}
      </Link>
     );
    })}
   </div>
  </nav>
 );
}
