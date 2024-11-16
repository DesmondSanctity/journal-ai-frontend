import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';

export default function RegisterPage() {
 return (
  <div className='min-h-screen flex items-center justify-center bg-gray-50'>
   <div className='w-full max-w-md px-4'>
    <div className='text-center mb-8'>
     <h1 className='text-3xl font-bold'>Journal AI</h1>
     <p className='text-muted-foreground mt-2'>Start your journaling journey</p>
    </div>
    <Card className='w-full transition-all duration-200 hover:shadow-lg'>
     <CardHeader>
      <CardTitle>Create account</CardTitle>
      <CardDescription>Enter your details to get started</CardDescription>
     </CardHeader>
     <CardContent>
      <RegisterForm />
     </CardContent>
     <CardFooter className='flex justify-center'>
      <p className='text-sm text-muted-foreground'>
       Already have an account?{' '}
       <Link
        href='/auth/login'
        className='text-primary hover:underline font-medium'
       >
        Login
       </Link>
      </p>
     </CardFooter>
    </Card>
   </div>
  </div>
 );
}
