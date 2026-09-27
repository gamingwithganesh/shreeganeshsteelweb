import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsultationCartModal from '@/components/ConsultationCartModal';
import AuthModal from '@/components/AuthModal';
import FreshArrivalCleaner from '@/components/FreshArrivalCleaner';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shreeganeshsteel.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Shree Ganesh Steel & Welding Workshop | Best Metal Fabrication & Steel Workshop in Vidarbha',
    template: '%s | Shree Ganesh Steel and Welding Workshop',
  },
  description:
    'Shree Ganesh Steel and Welding Workshop (Shri Ganesh Welding Workshop) - Leading steel workshop & metal fabrication serving Ghatanji, Yavatmal, Pandharkawada, Nagpur, Wardha, Akola, Amravati, Chandrapur & all Vidarbha. Specializing in custom steel gates, SS railings, PEB industrial sheds, structural welding, agro equipment & laser cutting.',
  keywords: [
    'steel work shop',
    'fabrication shop',
    'steel and fabrication',
    'shree ganesh',
    'shree ganesh steel and fabrication',
    'shri ganesh welding work shop',
    'shree ganesh welding workshop',
    'shri ganesh steel',
    'steel workshop in ghatanji',
    'welding workshop in yavatmal',
    'metal fabrication in nagpur',
    'steel fabrication pandharkawada',
    'steel and fabrication wardha',
    'welding workshop akola',
    'fabrication shop amravati',
    'steel workshop chandrapur',
    'welding shop near me',
    'best steel fabrication maharashtra',
    'stainless steel railings',
    'custom laser cut gates',
    'industrial peb sheds',
    'agricultural steel equipment',
    'vidarbha steel fabricators',
  ],
  authors: [{ name: 'Shree Ganesh Steel & Welding Workshop', url: baseUrl }],
  creator: 'Shree Ganesh Steel & Welding Workshop',
  publisher: 'Shree Ganesh Steel & Welding Workshop',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'Shree Ganesh Steel & Welding Workshop',
    title: 'Shree Ganesh Steel and Fabrication | Top Welding & Metal Workshop in Vidarbha',
    description:
      'Precision welding, custom steel gates, stainless railings, heavy industrial structural steel, and custom metal fabrication in Ghatanji, Yavatmal, Pandharkawada, Nagpur, Wardha, Akola.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shree Ganesh Steel and Welding Workshop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Ganesh Steel & Welding Workshop',
    description:
      'Best steel workshop & custom metal fabrication across Ghatanji, Yavatmal, Pandharkawada, Nagpur, Wardha, Akola, Vidarbha.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-sgwwsp',
  },
};

const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService', 'HomeAndConstructionBusiness'],
  '@id': 'https://shreeganeshsteel.com/#organization',
  name: 'Shree Ganesh Steel and Welding Workshop',
  alternateName: [
    'Shri Ganesh Welding Work Shop',
    'Shree Ganesh Steel and Fabrication',
    'Shree Ganesh Welding Works Shop Ghatanji',
    'SGWWSP',
    'Shri Ganesh Steel Workshop',
  ],
  url: baseUrl,
  logo: `${baseUrl}/favicon.ico`,
  image: `${baseUrl}/og-image.jpg`,
  description:
    'Premier steel workshop and metal fabrication center specializing in custom architectural gates, stainless steel railings, PEB industrial structures, laser cutting, and agro machinery.',
  telephone: '+91-9423032182',
  email: 'contact@shreeganeshsteel.com',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ghatanji Road, Near Main Market',
    addressLocality: 'Ghatanji',
    addressRegion: 'Maharashtra',
    postalCode: '445301',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 20.1441838,
    longitude: 78.3148374,
  },
  hasMap:
    'https://www.google.com/maps/place/Shri+Ganesh+Welding+Works+shop+Ghatanji/@20.1441888,78.3122625,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd3b9157d1d648b:0x1efbfee1ed30f59e!8m2!3d20.1441838!4d78.3148374!16s%2Fg%2F11gm87w9rv',
  areaServed: [
    { '@type': 'City', name: 'Ghatanji' },
    { '@type': 'City', name: 'Yavatmal' },
    { '@type': 'City', name: 'Pandharkawada' },
    { '@type': 'City', name: 'Nagpur' },
    { '@type': 'City', name: 'Wardha' },
    { '@type': 'City', name: 'Akola' },
    { '@type': 'City', name: 'Amravati' },
    { '@type': 'City', name: 'Pusad' },
    { '@type': 'City', name: 'Chandrapur' },
    { '@type': 'City', name: 'Wani' },
    { '@type': 'AdministrativeArea', name: 'Vidarbha' },
    { '@type': 'AdministrativeArea', name: 'Maharashtra' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:30',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '128',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.google.com/maps/place/Shri+Ganesh+Welding+Works+shop+Ghatanji/@20.1441888,78.3122625,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd3b9157d1d648b:0x1efbfee1ed30f59e!8m2!3d20.1441838!4d78.3148374!16s%2Fg%2F11gm87w9rv',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
      </head>
      <body>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <ConsultationCartModal />
            <AuthModal />
            <FreshArrivalCleaner />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
