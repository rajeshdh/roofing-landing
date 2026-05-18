import './globals.css';

const siteUrl = 'https://basilecontractorsllc.com';
const description =
  'Basile Contractors LLC delivers premium residential and commercial roofing solutions with beautiful finishes, modern materials, and dependable project execution.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Basile Contractors LLC | Roofing Experts',
  description,
  keywords: [
    'Basile Contractors LLC',
    'roofing contractor',
    'roof replacement',
    'roof repair',
    'commercial roofing',
    'roofing portfolio',
    'emergency roofing',
  ],
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
