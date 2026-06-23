import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = 'https://basilecontractorsllc.com';
const description =
  'Basile Contractors LLC delivers premium residential and commercial roofing solutions with beautiful finishes, modern materials, and dependable project execution.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Basile Contractors LLC | Roofing Experts',
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Basile Contractors LLC | Roofing Experts',
    description,
    url: siteUrl,
    siteName: 'Basile Contractors LLC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basile Contractors LLC | Roofing Experts',
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/*
          Mark JS as available before first paint. Scroll-reveal styles are
          scoped to `.js` so that, without JavaScript, all content stays
          visible instead of being stuck at opacity:0.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
