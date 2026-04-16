'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginRoute =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/student');

  return (
    <>
      {!isLoginRoute && <Navbar />}
      {children}
      {!isLoginRoute && <Footer />}
    </>
  );
}
