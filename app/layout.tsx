import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SMA Ganesha',
  description: 'Website resmi SMA Ganesha Nusantara'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="container-main py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
