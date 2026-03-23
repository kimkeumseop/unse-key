'use client';

import { useEffect, useId } from 'react';

import { ADSENSE_CLIENT } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  label?: string;
  className?: string;
}

export function AdSlot({ slot, label = '광고 영역', className }: AdSlotProps) {
  const adClient = ADSENSE_CLIENT;
  const adId = useId();

  useEffect(() => {
    if (!adClient) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      return;
    }
  }, [adClient, adId]);

  return (
    <div className={`ad-slot ${className ?? ''}`.trim()}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
