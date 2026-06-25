import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Mr Clean Water - Delivered Fast',
  description: 'Reliable bulk water delivery for homes, businesses, construction sites, and institutions across Nakuru Town and surrounding areas.',
  openGraph: {
    title: 'Mr Clean Water - Delivered Fast',
    description: 'Reliable bulk water delivery across Nakuru Town.',
    url: 'https://mr-clean-water.vercel.app',
    siteName: 'Mr Clean Water',
    images: [
      {
        url: '/images/preview_image_url.webp',
        width: 1200,
        height: 630,
        alt: 'Mr Clean Water Preview',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr Clean Water - Delivered Fast',
    description: 'Reliable bulk water delivery across Nakuru Town.',
    images: ['/images/preview_image_url.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
