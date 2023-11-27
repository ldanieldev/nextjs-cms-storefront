import Footer from '@/components/footer';
import NavBar from '@/components/nav-bar';
import ModalProvider from '@/providers/modal-provider';
import { Toaster } from 'sonner';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

const font = Poppins({
  weight: ['200', '400'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'NextJS E-Commerce Example Store - LDanielDev',
  description: 'An example store created using NextJS by Le-Andris Daniel'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <Toaster richColors position='top-center' />
        <ModalProvider />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
