import 'dotenv/config';

import { getApps, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import type { FortuneData } from '../types/fortune';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const sampleData: Omit<FortuneData, 'id'> = {
  year: 2026,
  month: 4,
  zodiac: 'rat',
  title: '2026년 4월 쥐띠 운세',
  stars_overall: 4,
  stars_love: 3,
  stars_money: 4,
  stars_health: 3,
  content_overall: '4월은 쥐띠에게 새로운 시작의 달입니다. 미뤄두었던 계획을 다시 꺼내어 천천히 실행에 옮기면 좋은 흐름을 만들 수 있습니다.',
  content_love: '중순 이후 새로운 인연이 가까이 다가올 수 있습니다. 이미 관계가 있다면 솔직한 대화가 분위기를 부드럽게 바꿉니다.',
  content_money: '투자보다 저축에 유리한 달입니다. 큰 지출은 한 번 더 점검하고 실속 있는 선택을 우선하세요.',
  content_health: '과로와 수면 부족을 조심하세요. 몸이 보내는 작은 신호를 가볍게 넘기지 않는 편이 좋습니다.',
  lucky_color: '보라',
  lucky_numbers: [3, 7],
  caution_dates: [9, 18]
};

async function main() {
  if (!Object.values(firebaseConfig).every(Boolean)) {
    throw new Error('.env.local에 Firebase 환경변수가 모두 필요합니다.');
  }

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);
  const id = `${sampleData.year}-${String(sampleData.month).padStart(2, '0')}-${sampleData.zodiac}`;

  await setDoc(doc(db, 'fortune', id), sampleData);

  console.log(`Saved fortune/${id}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
