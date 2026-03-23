import type { MetadataRoute } from 'next';

import { ZODIAC_ORDER } from '@/types/fortune';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unse-key.kr';
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    }
  ];

  for (let month = 1; month <= 12; month += 1) {
    for (const zodiac of ZODIAC_ORDER) {
      routes.push({
        url: `${baseUrl}/2026/${String(month).padStart(2, '0')}/${zodiac}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
      });
    }
  }

  return routes;
}
