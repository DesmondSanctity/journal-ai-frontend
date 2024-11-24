import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
 return (
  <div className='min-h-screen flex items-center justify-center bg-gray-50'>
   <div className='w-full max-w-md px-4'>
    <div className='text-center mb-8'>
     <h1 className='text-3xl font-bold'>Athene AI</h1>
     <p className='text-muted-foreground mt-2'>
      Your personal journaling companion
     </p>
    </div>
    <Card className='w-full transition-all duration-200 hover:shadow-lg'>
     <CardHeader>
      <CardTitle>Welcome back</CardTitle>
      <CardDescription>Enter your credentials to continue</CardDescription>
     </CardHeader>
     <CardContent>
      <LoginForm />
     </CardContent>
     <CardFooter className='flex justify-center'>
      <p className='text-sm text-muted-foreground'>
       Don&apos;t have an account?{' '}
       <Link
        href='/auth/register'
        className='text-primary hover:underline font-medium'
       >
        Register
       </Link>
      </p>
     </CardFooter>
    </Card>
   </div>
  </div>
 );
}
