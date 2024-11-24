import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const geistSans = localFont({
 src: './fonts/GeistVF.woff',
 variable: '--font-geist-sans',
 weight: '100 900',
});
const geistMono = localFont({
 src: './fonts/GeistMonoVF.woff',
 variable: '--font-geist-mono',
 weight: '100 900',
});

export const metadata: Metadata = {
 title: 'Journal AI - Voice Journaling Assistant',
 description:
  'Transform your spoken thoughts into organized journal entries with AI',
 openGraph: {
  title: 'Journal AI - Voice Journaling Assistant',
  description:
   'Transform your spoken thoughts into organized journal entries with AI',
  images: ['/og-image.jpg'],
  url: 'https://athene-ai.vercel.app',
 },
 twitter: {
  card: 'summary_large_image',
  title: 'Journal AI - Voice Journaling Assistant',
  description:
   'Transform your spoken thoughts into organized journal entries with AI',
  images: ['/og-image.jpg'],
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang='en'>
   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {children}
    <Toaster position='top-right' />
   </body>
  </html>
 );
}
