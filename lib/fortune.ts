import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { type FortuneData, type Zodiac, ZODIAC_ORDER } from '@/types/fortune';

export async function getFortune(
  year: number,
  month: number,
  zodiac: Zodiac
): Promise<FortuneData | null> {
  if (!db) {
    return null;
  }

  const id = `${year}-${String(month).padStart(2, '0')}-${zodiac}`;
  const ref = doc(db, 'fortune', id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return { id: snap.id, ...snap.data() } as FortuneData;
}

export async function getMonthlyFortunes(year: number, month: number): Promise<FortuneData[]> {
  if (!db) {
    return [];
  }

  const fortunesQuery = query(
    collection(db, 'fortune'),
    where('year', '==', year),
    where('month', '==', month)
  );
  const snap = await getDocs(fortunesQuery);
  const results = snap.docs.map((fortuneDoc) => ({
    id: fortuneDoc.id,
    ...fortuneDoc.data()
  })) as FortuneData[];

  return ZODIAC_ORDER.map((zodiac) => results.find((item) => item.zodiac === zodiac)).filter(
    Boolean
  ) as FortuneData[];
}

export function starsToString(n: number): string {
  const normalized = Math.min(5, Math.max(0, Math.round(n)));
  return '★'.repeat(normalized) + '☆'.repeat(5 - normalized);
}
