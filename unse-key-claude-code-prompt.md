# 운세키 (unse-key.kr) — Claude Code 마스터 프롬프트

아래 내용을 Claude Code에 그대로 붙여넣어서 프로젝트를 시작하세요.

---

## 프로젝트 개요

**사이트명**: 운세키 (unse-key.kr)  
**목적**: 월별 12띠 운세 콘텐츠 사이트 (Google AdSense 수익화)  
**스택**: Next.js 14 (App Router) + Firebase Firestore + Vercel 배포  
**기존 환경**: Firebase 프로젝트 및 Vercel 계정 이미 보유

---

## 지시사항

다음 구조로 Next.js 프로젝트를 세팅하고 코드를 작성해줘.

---

## 1. 프로젝트 구조

```
unse-key/
├── app/
│   ├── layout.tsx              ← 전체 레이아웃 (헤더, 애드센스 스크립트)
│   ├── page.tsx                ← 메인 페이지 (띠 선택 그리드)
│   ├── [year]/
│   │   └── [month]/
│   │       └── [zodiac]/
│   │           └── page.tsx   ← 운세 상세 페이지
│   └── globals.css
├── lib/
│   ├── firebase.ts             ← Firebase 초기화
│   └── fortune.ts              ← Firestore 데이터 fetch 함수
├── types/
│   └── fortune.ts              ← TypeScript 타입 정의
└── public/
```

---

## 2. TypeScript 타입 (types/fortune.ts)

```typescript
export type Zodiac =
  | 'rat' | 'ox' | 'tiger' | 'rabbit' | 'dragon' | 'snake'
  | 'horse' | 'goat' | 'monkey' | 'rooster' | 'dog' | 'pig';

export const ZODIAC_INFO: Record<Zodiac, { ko: string; emoji: string; years: number[] }> = {
  rat:     { ko: '쥐띠',    emoji: '🐭', years: [1936,1948,1960,1972,1984,1996,2008,2020] },
  ox:      { ko: '소띠',    emoji: '🐮', years: [1937,1949,1961,1973,1985,1997,2009,2021] },
  tiger:   { ko: '호랑이띠', emoji: '🐯', years: [1938,1950,1962,1974,1986,1998,2010,2022] },
  rabbit:  { ko: '토끼띠',  emoji: '🐰', years: [1939,1951,1963,1975,1987,1999,2011,2023] },
  dragon:  { ko: '용띠',    emoji: '🐲', years: [1940,1952,1964,1976,1988,2000,2012,2024] },
  snake:   { ko: '뱀띠',    emoji: '🐍', years: [1941,1953,1965,1977,1989,2001,2013,2025] },
  horse:   { ko: '말띠',    emoji: '🐴', years: [1942,1954,1966,1978,1990,2002,2014,2026] },
  goat:    { ko: '양띠',    emoji: '🐑', years: [1943,1955,1967,1979,1991,2003,2015] },
  monkey:  { ko: '원숭이띠', emoji: '🐒', years: [1944,1956,1968,1980,1992,2004,2016] },
  rooster: { ko: '닭띠',    emoji: '🐓', years: [1945,1957,1969,1981,1993,2005,2017] },
  dog:     { ko: '개띠',    emoji: '🐶', years: [1946,1958,1970,1982,1994,2006,2018] },
  pig:     { ko: '돼지띠',  emoji: '🐷', years: [1947,1959,1971,1983,1995,2007,2019] },
};

export const ZODIAC_ORDER: Zodiac[] = [
  'rat','ox','tiger','rabbit','dragon','snake',
  'horse','goat','monkey','rooster','dog','pig'
];

export interface FortuneData {
  id: string;               // e.g. "2026-04-rat"
  year: number;
  month: number;
  zodiac: Zodiac;
  title: string;            // e.g. "2026년 4월 쥐띠 운세"
  stars_overall: number;    // 1~5
  stars_love: number;
  stars_money: number;
  stars_health: number;
  content_overall: string;
  content_love: string;
  content_money: string;
  content_health: string;
  lucky_color: string;
  lucky_numbers: number[];
  caution_dates: number[];
  created_at?: string;
}
```

---

## 3. Firebase 초기화 (lib/firebase.ts)

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
```

---

## 4. Firestore fetch 함수 (lib/fortune.ts)

```typescript
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { FortuneData, Zodiac, ZODIAC_ORDER } from '@/types/fortune';

// 단일 운세 조회
export async function getFortune(
  year: number, month: number, zodiac: Zodiac
): Promise<FortuneData | null> {
  const id = `${year}-${String(month).padStart(2,'0')}-${zodiac}`;
  const ref = doc(db, 'fortune', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as FortuneData;
}

// 같은 달 전체 12띠 조회 (메인 페이지용)
export async function getMonthlyFortunes(
  year: number, month: number
): Promise<FortuneData[]> {
  const q = query(
    collection(db, 'fortune'),
    where('year', '==', year),
    where('month', '==', month)
  );
  const snap = await getDocs(q);
  const results = snap.docs.map(d => ({ id: d.id, ...d.data() } as FortuneData));
  return ZODIAC_ORDER.map(z => results.find(r => r.zodiac === z)).filter(Boolean) as FortuneData[];
}

// 별점 → ★ 문자열 변환
export function starsToString(n: number): string {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}
```

---

## 5. 메인 페이지 (app/page.tsx)

메인 페이지 요구사항:
- 현재 연월 기준으로 12띠 그리드 표시 (4열 × 3행)
- 각 카드: 이모지 + 띠 이름 + 대표 출생연도 2개
- 상단에 월 선택 탭 (이전달 / 이번달 / 다음달)
- 각 카드 클릭 시 `/2026/04/rat` 형식으로 이동
- 다크 네이비(#0f0f2e) 배경의 신비로운 운세 사이트 분위기
- 구글 애드센스 광고 슬롯 1개 (그리드 하단)
- 반응형 (모바일 우선)

헤더:
- 로고: "운세키" (한글) + 자색 키 아이콘
- 서브타이틀: "월별 띠별 운세 · 매달 새롭게 업데이트"

SEO:
```typescript
export const metadata = {
  title: '운세키 - 월별 띠별 운세',
  description: '2026년 월별 12띠 운세를 확인하세요. 쥐띠, 소띠, 호랑이띠 등 띠별 총운, 애정운, 재물운, 건강운 정보를 제공합니다.',
};
```

---

## 6. 운세 상세 페이지 (app/[year]/[month]/[zodiac]/page.tsx)

```typescript
// generateStaticParams로 2026년 전체 144페이지 정적 생성
export async function generateStaticParams() {
  const params = [];
  for (let month = 1; month <= 12; month++) {
    for (const zodiac of ZODIAC_ORDER) {
      params.push({
        year: '2026',
        month: String(month).padStart(2, '0'),
        zodiac,
      });
    }
  }
  return params;
}
```

페이지 구성 (위에서 아래 순서):
1. 헤더 (← 뒤로가기 + 페이지 제목)
2. 띠 이모지 + 제목 + 출생연도
3. 별점 4개 항목 카드 (총운/애정운/재물운/건강운)
4. 총운 본문
5. **애드센스 광고 슬롯 #1** (총운 본문 바로 아래)
6. 애정운 / 재물운 / 건강운 본문 (h2 태그로 각 섹션)
7. 행운 정보 (색상, 숫자, 주의 날짜) 배지
8. **애드센스 광고 슬롯 #2** (페이지 하단)
9. 다른 띠 바로가기 (12띠 링크 그리드)

데이터가 없을 경우 (콘텐츠 미작성): "이달의 운세를 준비 중입니다" 안내 표시

SEO 동적 메타데이터:
```typescript
export async function generateMetadata({ params }) {
  const zodiacInfo = ZODIAC_INFO[params.zodiac];
  return {
    title: `${params.year}년 ${Number(params.month)}월 ${zodiacInfo.ko} 운세 - 운세키`,
    description: `${params.year}년 ${Number(params.month)}월 ${zodiacInfo.ko} 운세를 확인하세요. 총운, 애정운, 재물운, 건강운과 이달의 행운 정보를 제공합니다.`,
  };
}
```

---

## 7. 디자인 스타일 가이드

```css
/* 전체 색상 팔레트 */
--bg-primary: #0f0f2e;        /* 메인 배경 (다크 네이비) */
--bg-card: #1a1a3e;           /* 카드 배경 */
--bg-card-hover: #22224a;     /* 카드 호버 */
--accent: #8B5CF6;            /* 메인 보라 */
--accent-light: #c9b8ff;      /* 밝은 보라 */
--text-primary: #f0eeff;      /* 기본 텍스트 */
--text-secondary: rgba(240,238,255,0.6);
--border: rgba(139,92,246,0.2);
--gold: #F9CB42;              /* 별점 색상 */

/* 폰트 */
font-family: 'Noto Serif KR', serif;  /* 헤딩 */
font-family: 'Noto Sans KR', sans-serif; /* 본문 */
/* Google Fonts에서 import */
```

---

## 8. Firestore 데이터 입력 스크립트 (scripts/seed.ts)

관리자가 콘텐츠를 쉽게 넣을 수 있도록 seed 스크립트 작성:

```typescript
// 사용법: npx ts-node scripts/seed.ts
// 아래 sampleData를 실제 콘텐츠로 교체해서 실행

const sampleData: Omit<FortuneData, 'id'> = {
  year: 2026,
  month: 4,
  zodiac: 'rat',
  title: '2026년 4월 쥐띠 운세',
  stars_overall: 4,
  stars_love: 3,
  stars_money: 4,
  stars_health: 3,
  content_overall: '4월은 쥐띠에게 새로운 시작의 달입니다...',
  content_love: '중순 이후 새로운 인연이 생길 수 있습니다...',
  content_money: '투자보다 저축에 유리한 달입니다...',
  content_health: '과로에 주의하고 규칙적인 수면을 취하세요...',
  lucky_color: '보라',
  lucky_numbers: [3, 7],
  caution_dates: [9, 18],
};

// Firestore에 저장: fortune/{year}-{mm}-{zodiac}
```

---

## 9. 환경변수 (.env.local)

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

---

## 10. 사이트맵 (app/sitemap.ts)

```typescript
// 전체 운세 페이지 URL을 사이트맵으로 자동 생성
// unse-key.kr/sitemap.xml
```

---

## 11. robots.txt (public/robots.txt)

```
User-agent: *
Allow: /
Sitemap: https://unse-key.kr/sitemap.xml
```

---

## 작업 우선순위

1. `types/fortune.ts` 타입 정의
2. `lib/firebase.ts` + `lib/fortune.ts`
3. `app/layout.tsx` (전체 레이아웃, 폰트 로드, 애드센스 스크립트)
4. `app/globals.css` (색상 변수, 기본 스타일)
5. `app/page.tsx` (메인 페이지)
6. `app/[year]/[month]/[zodiac]/page.tsx` (상세 페이지)
7. `scripts/seed.ts` (데이터 입력 스크립트)
8. `app/sitemap.ts`

---

## 패키지 설치

```bash
npx create-next-app@latest unse-key --typescript --tailwind --app
cd unse-key
npm install firebase
npm install -D ts-node
```

---

기존 Firebase 프로젝트의 환경변수 값은 Firebase 콘솔 → 프로젝트 설정 → 앱에서 확인 후 .env.local에 입력하면 됩니다.
