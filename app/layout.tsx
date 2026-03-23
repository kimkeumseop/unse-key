import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

import { ADSENSE_CLIENT } from '@/lib/adsense';

import './globals.css';

export const metadata: Metadata = {
  title: '운세키 - 월별 띠별 운세',
  description: '2026년 월별 12띠 운세를 확인하세요.',
  other: {
    'google-adsense-account': ADSENSE_CLIENT
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        style={{
          minHeight: '100vh',
          backgroundColor: '#0a0a1f',
          color: '#f0eeff',
          fontFamily: "'Noto Sans KR', sans-serif"
        }}
      >
        <Script
          id="adsense-script"
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
        />
        <div className="site-background" />
        <div className="site-shell">
          <header
            className="site-header"
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 20,
              backdropFilter: 'blur(18px)',
              background: 'rgba(10, 12, 31, 0.72)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
            }}
          >
            <div
              className="site-header__inner"
              style={{
                width: 'min(calc(100% - 32px), 1180px)',
                margin: '0 auto',
                padding: '18px 0'
              }}
            >
              <Link
                href="/"
                className="brand"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}
              >
                <span
                  className="brand__icon"
                  aria-hidden="true"
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    fontSize: '1.45rem',
                    background:
                      'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(249, 203, 66, 0.14))',
                    boxShadow: 'inset 0 0 0 1px rgba(201, 184, 255, 0.18)'
                  }}
                >
                  🔑
                </span>
                <span>
                  <strong
                    className="brand__title"
                    style={{
                      display: 'block',
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: '1.4rem',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    운세키
                  </strong>
                  <span
                    className="brand__subtitle"
                    style={{
                      display: 'block',
                      marginTop: '4px',
                      color: 'rgba(240, 238, 255, 0.6)',
                      fontSize: '0.92rem'
                    }}
                  >
                    월별 띠별 운세 · 매달 새롭게 업데이트
                  </span>
                </span>
              </Link>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
