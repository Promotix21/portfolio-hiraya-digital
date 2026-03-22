import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hiraya Digital | Growth Engineering & Automation',
  description:
    'We don\'t run marketing. We engineer growth. Growth engineering, automation, AI solutions, and custom development.',
  keywords: [
    'growth engineering',
    'marketing automation',
    'AI solutions',
    'custom development',
    'technical SEO',
  ],
  openGraph: {
    title: 'Hiraya Digital | Growth Engineering & Automation',
    description: 'We don\'t run marketing. We engineer growth.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-navy antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
