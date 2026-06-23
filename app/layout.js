import { Inter } from 'next/font/google';
import Script from 'next/script';
import business from '@/content/business.js';
import AnalyticsTracker from './components/AnalyticsTracker';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = business.url;
// 150–160 chars, keyword + location front-loaded (spec §5.2).
const description =
  'Licensed, insured roofing contractor serving Miami-Dade, Broward & Palm Beach. 24/7 emergency roof repair, replacement & storm damage. Free inspection — call today.';
// 50–60 chars, keyword + location (spec §5.2).
const title = 'South Florida Roofing Contractor | Basile Contractors';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: business.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const { ga4MeasurementId, googleAdsId } = business;
const analyticsEnabled = Boolean(ga4MeasurementId || googleAdsId);

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
      <body>
        {children}
        <AnalyticsTracker />

        {/*
          Google Analytics 4 / Google Ads (spec §8.1). Renders only once an ID
          is set in content/business.js, so it has zero impact until configured.
        */}
        {analyticsEnabled ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId || googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${ga4MeasurementId ? `gtag('config', '${ga4MeasurementId}');` : ''}
                ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ''}
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
