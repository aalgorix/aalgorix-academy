'use client';

import { usePathname } from 'next/navigation';
import TopBar from "./TopBar";
import Navbar from './navbar';
import Footer from './Footer';
import CollaborationsMarquee from "./CollaborationsMarquee";

/** Routes where the public navbar + footer should be hidden. */
const PORTAL_ROUTES = ['/login', '/dashboard', '/student', '/teacher'];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = PORTAL_ROUTES.some((r) => pathname?.startsWith(r));
  const isHome = pathname === "/";

  return (
    <>
      {!isPortal && (
        <>
          <TopBar />
          <Navbar />
          {/* Spacer prevents fixed header overlap. On home we want the navbar over the hero video. */}
          {!isHome && <div style={{ height: "calc(var(--aa-topbar-h) + var(--aa-navbar-h))" }} />}
        </>
      )}
      {children}
      {!isPortal && (
        <>
          <CollaborationsMarquee />
          <Footer />
        </>
      )}
    </>
  );
}
