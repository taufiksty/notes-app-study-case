import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'Notes App Study Case',
  description: 'Assignment for internship at dibimbing.id',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
