import { PageWrapper } from '@/components/shared/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Check, FileText } from 'lucide-react';

export default function TermsPage() {
 return (
  <PageWrapper>
   <div>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
     <div className='max-w-3xl mx-auto'>
      <div className='text-center mb-12'>
       <h1 className='text-4xl font-bold'>Terms & Conditions</h1>
       <p className='mt-4 text-muted-foreground'>
        Please read these terms carefully before using Athene AI.
       </p>
      </div>

      <div className='space-y-8'>
       <Card>
        <CardHeader>
         <CardTitle className='flex items-center gap-2'>
          <Check className='h-5 w-5 text-primary' />
          Service Usage
         </CardTitle>
        </CardHeader>
        <CardContent className='text-muted-foreground'>
         <ul className='list-disc pl-6 space-y-2'>
          <li>Use the service for personal journaling purposes</li>
          <li>Maintain account security and confidentiality</li>
          <li>Comply with applicable laws and regulations</li>
         </ul>
        </CardContent>
       </Card>

       <Card>
        <CardHeader>
         <CardTitle className='flex items-center gap-2'>
          <FileText className='h-5 w-5 text-primary' />
          Content Ownership
         </CardTitle>
        </CardHeader>
        <CardContent className='text-muted-foreground'>
         <ul className='list-disc pl-6 space-y-2'>
          <li>You retain ownership of your journal entries</li>
          <li>We process content to provide our services</li>
          <li>Your data is protected and confidential</li>
         </ul>
        </CardContent>
       </Card>

       <Card>
        <CardHeader>
         <CardTitle className='flex items-center gap-2'>
          <AlertCircle className='h-5 w-5 text-primary' />
          Limitations
         </CardTitle>
        </CardHeader>
        <CardContent className='text-muted-foreground'>
         <ul className='list-disc pl-6 space-y-2'>
          <li>Service availability is not guaranteed</li>
          <li>We may modify features without notice</li>
          <li>Usage limits may apply to free accounts</li>
         </ul>
        </CardContent>
       </Card>
      </div>
     </div>
    </div>
   </div>
  </PageWrapper>
 );
}
