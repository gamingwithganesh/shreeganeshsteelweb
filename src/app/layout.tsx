import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsultationCartModal from '@/components/ConsultationCartModal';
import AuthModal from '@/components/AuthModal';
import FreshArrivalCleaner from '@/components/FreshArrivalCleaner';

export const metadata: Metadata = {
  title: 'Shree Ganesh Steel and Welding Workshop | Precision Fabrication & Metal Craft',
  description: 'Precision welding, modern custom gates, stainless railings, heavy industrial structural steel works, and custom metal fabrication.',
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
