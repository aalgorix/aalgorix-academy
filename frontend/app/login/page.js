/**
 * app/login/page.js — Server component wrapper.
 * useSearchParams() inside LoginClient requires a Suspense boundary.
 */

import { Suspense }   from 'react';
import LoginClient    from './LoginClient';

export const metadata = {
  title: 'Sign In | Aalgorix World Academy',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse 130% 85% at 55% -5%, #0d2a50 0%, #060f1f 50%, #020810 100%)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 36, height: 36,
                border: '3px solid rgba(58,176,255,0.3)',
                borderTopColor: '#3AB0FF',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
                margin: '0 auto',
              }}
            />
          </div>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
