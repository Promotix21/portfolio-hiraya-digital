import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LeadTracker from '@/components/tracking/LeadTracker';
import ChatOrb from '@/components/chatbot/ChatOrb';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Hiraya Digital | Growth Engineering',
  description: 'Growth Engineering, Automation and Product Development partner.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <meta name="google-site-verification" content="S2QFKnnmRNjbNyzmy1OpiKhRNZtg4CbztMlcvPkeL0w" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2R1M2N7BY0" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2R1M2N7BY0');`}
        </Script>
      </head>
      <body className="bg-hiraya-light text-slate-900 antialiased selection:bg-hiraya-blue selection:text-white">
        <LeadTracker />
        {children}
        <ChatOrb />
      </body>
    </html>
  );
}
