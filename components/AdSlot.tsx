'use client';

import { useEffect } from 'react';

import { ADSENSE_CLIENT } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  style?: React.CSSProperties;
}

export default function AdSlot({ slot, style }: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      return;
    }
  }, []);

  return (
    <div className="ad-slot" style={{ textAlign: 'center', margin: '16px 0', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
