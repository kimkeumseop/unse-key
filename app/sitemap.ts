import type { MetadataRoute } from 'next';

import { ZODIAC_ORDER } from '@/types/fortune';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unse-key.vercel.app';
  const currentMonth = new Date().getMonth() + 1;
  const urls: MetadataRoute.Sitemap = [];

  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1
  });

  urls.push(
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.3 }
  );

  for (let month = 1; month <= 12; month += 1) {
    const mm = String(month).padStart(2, '0');
    for (const zodiac of ZODIAC_ORDER) {
      urls.push({
        url: `${baseUrl}/2026/${mm}/${zodiac}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: month === currentMonth ? 0.9 : 0.7
      });
    }
  }

  return urls;
}
