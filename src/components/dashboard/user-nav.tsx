'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/auth-store';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
 const user = useAuthStore((state) => state.user);
 const logout = useAuthStore((state) => state.logout);

 return (
  <div className='ml-auto'>
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button
      variant='ghost'
      className='relative h-9 w-9 rounded-full transition-all duration-200 hover:scale-110 hover:bg-primary/10'
     >
      <Avatar className='h-9 w-9 transition-all duration-200'>
       <AvatarFallback className='bg-primary/10 hover:bg-primary/20 transition-colors'>
        {user?.email?.charAt(0).toUpperCase()}
       </AvatarFallback>
      </Avatar>
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56 mt-3 bg-white border shadow-md' align='end'>
     <DropdownMenuItem
      asChild
      className='transition-colors duration-200 hover:bg-primary/10'
     >
      <Link href='/dashboard/profile' className='flex items-center'>
       <User className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
       Profile
      </Link>
     </DropdownMenuItem>
     <DropdownMenuItem
      asChild
      className='transition-colors duration-200 hover:bg-primary/10'
     >
      <Link href='/dashboard/settings' className='flex items-center'>
       <Settings className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
       Settings
      </Link>
     </DropdownMenuItem>
     <DropdownMenuItem
      onClick={logout}
      className='transition-colors duration-200 hover:bg-destructive/10 text-destructive'
     >
      <LogOut className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
      Log out
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 );
}
