import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AdSlot } from '@/components/ad-slot';
import { getFortune, starsToString } from '@/lib/fortune';
import { type Zodiac, ZODIAC_INFO, ZODIAC_ORDER } from '@/types/fortune';

interface FortuneDetailPageProps {
  params: {
    year: string;
    month: string;
    zodiac: string;
  };
}

function isZodiac(value: string): value is Zodiac {
  return value in ZODIAC_INFO;
}

export async function generateStaticParams() {
  const params: Array<{ year: string; month: string; zodiac: Zodiac }> = [];

  for (let month = 1; month <= 12; month += 1) {
    for (const zodiac of ZODIAC_ORDER) {
      params.push({
        year: '2026',
        month: String(month).padStart(2, '0'),
        zodiac
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params
}: FortuneDetailPageProps): Promise<Metadata> {
  if (!isZodiac(params.zodiac)) {
    return {
      title: '운세를 찾을 수 없습니다 - 운세키'
    };
  }

  const zodiacInfo = ZODIAC_INFO[params.zodiac];

  return {
    title: `${params.year}년 ${Number(params.month)}월 ${zodiacInfo.ko} 운세 - 운세키`,
    description: `${params.year}년 ${Number(params.month)}월 ${zodiacInfo.ko} 운세를 확인하세요. 총운, 애정운, 재물운, 건강운과 이달의 행운 정보를 제공합니다.`
  };
}

export default async function FortuneDetailPage({ params }: FortuneDetailPageProps) {
  if (!isZodiac(params.zodiac)) {
    notFound();
  }

  const year = Number(params.year);
  const month = Number(params.month);
  const zodiac = params.zodiac;
  const zodiacInfo = ZODIAC_INFO[zodiac];
  const fortune = await getFortune(year, month, zodiac);
  const title = fortune?.title ?? `${year}년 ${month}월 ${zodiacInfo.ko} 운세`;

  return (
    <main className="page-shell">
      <div className="detail-layout">
        <Link href="/" className="back-link">
          <span aria-hidden="true">←</span>
          메인으로 돌아가기
        </Link>

        <section className="fortune-card">
          <div className="fortune-card__hero">
            <div className="fortune-card__emoji" aria-hidden="true">
              {zodiacInfo.emoji}
            </div>
            <div>
              <h1 className="detail-title">{title}</h1>
              <p className="meta-line">
                출생연도 {zodiacInfo.years.join(' · ')}
              </p>
            </div>
          </div>
        </section>

        {fortune ? (
          <>
            <section className="score-grid">
              <article className="score-card">
                <span className="score-card__label">총운</span>
                <span className="score-card__value">{starsToString(fortune.stars_overall)}</span>
              </article>
              <article className="score-card">
                <span className="score-card__label">애정운</span>
                <span className="score-card__value">{starsToString(fortune.stars_love)}</span>
              </article>
              <article className="score-card">
                <span className="score-card__label">재물운</span>
                <span className="score-card__value">{starsToString(fortune.stars_money)}</span>
              </article>
              <article className="score-card">
                <span className="score-card__label">건강운</span>
                <span className="score-card__value">{starsToString(fortune.stars_health)}</span>
              </article>
            </section>

            <section className="fortune-section">
              <h2>총운</h2>
              <p className="fortune-text">{fortune.content_overall}</p>
            </section>

            <AdSlot slot="1000000002" />

            <section className="fortune-section">
              <h2>애정운</h2>
              <p className="fortune-text">{fortune.content_love}</p>
            </section>

            <section className="fortune-section">
              <h2>재물운</h2>
              <p className="fortune-text">{fortune.content_money}</p>
            </section>

            <section className="fortune-section">
              <h2>건강운</h2>
              <p className="fortune-text">{fortune.content_health}</p>
            </section>

            <section className="fortune-section">
              <h2>행운 정보</h2>
              <div className="chips">
                <div className="chip">
                  <strong>행운 색상</strong> {fortune.lucky_color}
                </div>
                <div className="chip">
                  <strong>행운 숫자</strong> {fortune.lucky_numbers.join(', ')}
                </div>
                <div className="chip">
                  <strong>주의 날짜</strong> {fortune.caution_dates.map((date) => `${date}일`).join(', ')}
                </div>
              </div>
            </section>

            <AdSlot slot="1000000003" />
          </>
        ) : (
          <section className="empty-state">
            <h2>이달의 운세를 준비 중입니다</h2>
            <p>
              아직 {year}년 {month}월 {zodiacInfo.ko} 콘텐츠가 등록되지 않았어요. 곧 업데이트될 수
              있도록 자리만 먼저 열어두었습니다.
            </p>
          </section>
        )}

        <section className="fortune-section">
          <h2>다른 띠 바로가기</h2>
          <div className="link-grid">
            {ZODIAC_ORDER.map((item) => {
              const info = ZODIAC_INFO[item];

              return (
                <Link key={item} href={`/${year}/${String(month).padStart(2, '0')}/${item}`}>
                  <span>
                    {info.emoji} {info.ko}
                  </span>
                  <span>상세 보기</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
