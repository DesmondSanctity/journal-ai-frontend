import { Footer } from '@/components/shared/footer';
import { Nav } from '@/components/shared/nav';
import { PageWrapper } from '@/components/shared/page-wrapper';
import { Database, Lock, Shield } from 'lucide-react';

export default function PrivacyPage() {
 return (
  <PageWrapper>
   <div>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
     <div className='max-w-3xl mx-auto'>
      <div className='text-center mb-12'>
       <h1 className='text-4xl font-bold'>Privacy Policy</h1>
       <p className='mt-4 text-muted-foreground'>
        Your privacy is our top priority. Learn how we protect your data.
       </p>
      </div>

      <div className='prose prose-slate max-w-none'>
       <section className='mb-12 hover:bg-slate-50 rounded-lg p-6 transition-colors'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
         <Shield className='h-6 w-6 text-primary' />
         Data Protection
        </h2>
        <p className='text-muted-foreground mb-4'>
         We implement industry-standard security measures to protect your data:
        </p>
        <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
         <li>End-to-end encryption for all voice recordings</li>
         <li>Secure cloud storage with regular backups</li>
         <li>Regular security audits and updates</li>
        </ul>
       </section>

       <section className='mb-12 hover:bg-slate-50 rounded-lg p-6 transition-colors'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
         <Database className='h-6 w-6 text-primary' />
         Data Collection
        </h2>
        <p className='text-muted-foreground mb-4'>We collect and process:</p>
        <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
         <li>Voice recordings for transcription</li>
         <li>Journal entries and metadata</li>
         <li>Usage analytics to improve our service</li>
        </ul>
       </section>

       <section className='mb-12 hover:bg-slate-50 rounded-lg p-6 transition-colors'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
         <Lock className='h-6 w-6 text-primary' />
         Your Rights
        </h2>
        <p className='text-muted-foreground mb-4'>You have the right to:</p>
        <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
         <li>Access your personal data</li>
         <li>Request data deletion</li>
         <li>Export your journal entries</li>
        </ul>
       </section>
      </div>
     </div>
    </div>
   </div>
  </PageWrapper>
 );
}
