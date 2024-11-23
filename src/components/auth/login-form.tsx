'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Loader2, Lock, Mail } from 'lucide-react';

const formSchema = z.object({
 email: z.string().email(),
 password: z.string().min(6),
});

export function LoginForm() {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
 const login = useAuthStore((state) => state.login);

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   email: '',
   password: '',
  },
 });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
   setIsLoading(true);
   await login(values.email, values.password);
   // Handle successful login here
   setTimeout(() => {
    router.push('/dashboard/journal');
   }, 100);
  } catch (error) {
   console.error(error);
  } finally {
   setIsLoading(false);
  }
 }

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
    <FormField
     control={form.control}
     name='email'
     render={({ field }) => (
      <FormItem>
       <FormLabel>Email</FormLabel>
       <FormControl>
        <div className='relative'>
         <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
         <Input
          {...field}
          type='email'
          className='pl-9 transition-all duration-200 hover:border-primary focus:ring-2 focus:ring-primary/20'
          placeholder='Enter your email'
         />
        </div>
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name='password'
     render={({ field }) => (
      <FormItem>
       <FormLabel>Password</FormLabel>
       <FormControl>
        <div className='relative'>
         <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
         <Input
          {...field}
          type='password'
          className='pl-9 transition-all duration-200 hover:border-primary focus:ring-2 focus:ring-primary/20'
          placeholder='Enter your password'
         />
        </div>
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <Button
     type='submit'
     className='w-full mt-6 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
     disabled={isLoading}
    >
     {isLoading ? (
      <>
       <Loader2 className='mr-2 h-4 w-4 animate-spin' />
       Signing in...
      </>
     ) : (
      'Sign in'
     )}
    </Button>
   </form>
  </Form>
 );
}
