import type { Metadata } from 'next';
import Link from 'next/link';

import { AdSlot } from '@/components/ad-slot';
import { getMonthlyFortunes } from '@/lib/fortune';
import { ZODIAC_INFO, ZODIAC_ORDER } from '@/types/fortune';

export const metadata: Metadata = {
  title: '운세키 - 월별 띠별 운세',
  description:
    '2026년 월별 12띠 운세를 확인하세요. 쥐띠, 소띠, 호랑이띠 등 띠별 총운, 애정운, 재물운, 건강운 정보를 제공합니다.'
};

export const revalidate = 3600;

function getSeoulYearMonth() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric'
  });
  const parts = formatter.formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === 'year')?.value ?? '2026');
  const month = Number(parts.find((part) => part.type === 'month')?.value ?? '1');

  return { year, month };
}

function formatMonthLabel(year: number, month: number) {
  return `${year}년 ${month}월`;
}

export default async function HomePage() {
  const current = getSeoulYearMonth();
  const monthlyFortunes = await getMonthlyFortunes(current.year, current.month);
  const availableZodiacs = new Set(monthlyFortunes.map((fortune) => fortune.zodiac));
  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#0a0a1f',
    color: '#f0eeff',
    fontFamily: "'Noto Sans KR', sans-serif",
    width: 'min(calc(100% - 32px), 1180px)',
    margin: '0 auto',
    padding: '36px 16px 80px'
  } as const;
  const heroStyle = {
    borderRadius: '32px',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)), #1a1a3e',
    boxShadow: '0 24px 80px rgba(6, 8, 30, 0.42)',
    padding: '28px'
  } as const;
  const metaStripStyle = {
    display: 'grid',
    gap: '14px',
    marginTop: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
  } as const;
  const contentCardStyle = {
    borderRadius: '24px',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)), #1a1a3e',
    boxShadow: '0 24px 80px rgba(6, 8, 30, 0.42)',
    padding: '20px'
  } as const;
  const sectionStyle = { marginTop: '28px' } as const;
  const monthTabsStyle = {
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
  } as const;
  const monthTabBaseStyle = {
    display: 'block',
    padding: '16px 18px',
    borderRadius: '18px',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    background: 'rgba(255, 255, 255, 0.03)',
    boxShadow: '0 24px 80px rgba(6, 8, 30, 0.42)'
  } as const;
  const fortuneGridStyle = {
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))'
  } as const;
  const zodiacCardStyle = {
    backgroundColor: '#1a1a3e',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    borderRadius: '24px',
    padding: '22px 20px',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    boxShadow: '0 24px 80px rgba(6, 8, 30, 0.42)'
  } as const;
  const badgeBaseStyle = {
    display: 'inline-flex',
    marginTop: '18px',
    padding: '7px 10px',
    borderRadius: '999px',
    fontSize: '0.82rem',
    fontWeight: 700
  } as const;

  return (
    <main className="page-shell" style={pageStyle}>
      <section className="hero-card" style={heroStyle}>
        <span className="hero-eyebrow">Mystic Monthly Reading</span>
        <h1
          className="hero-title"
          style={{
            marginTop: '14px',
            fontFamily: "'Noto Serif KR', serif",
            fontSize: 'clamp(2.2rem, 5vw, 4.25rem)',
            lineHeight: 1.08,
            wordBreak: 'keep-all',
            overflowWrap: 'break-word'
          }}
        >
          띠별 흐름을 한눈에 보는 월간 운세
        </h1>
        <p className="hero-copy">
          선택한 달의 12띠 운세를 한눈에 확인하세요. 총운부터 애정운, 재물운, 건강운까지
          항목별로 깔끔하게 정리했습니다.
        </p>
        <div className="meta-strip" style={metaStripStyle}>
          <div className="content-card" style={contentCardStyle}>
            <strong>{formatMonthLabel(current.year, current.month)}</strong>
            <p className="section-copy">홈에서는 서울 기준 현재 월 운세를 자동으로 보여줍니다.</p>
          </div>
          <div className="content-card" style={contentCardStyle}>
            <strong>12띠 전체 제공</strong>
            <p className="section-copy">쥐띠부터 돼지띠까지 한 화면에서 찾고 바로 이동할 수 있어요.</p>
          </div>
          <div className="content-card" style={contentCardStyle}>
            <strong>매달 업데이트</strong>
            <p className="section-copy">운세 데이터가 등록되면 띠별 카드에 바로 표시됩니다.</p>
          </div>
        </div>
      </section>

      <section className="section" style={sectionStyle}>
        <div className="section-head">
          <div>
            <h2 className="section-title">이번달 기준</h2>
            <p className="section-copy">이전달과 다음달 이동 없이, 현재 월 운세만 자동으로 표시합니다.</p>
          </div>
        </div>
        <div className="month-tabs" style={monthTabsStyle}>
          <div
            className="month-tab month-tab--active"
            style={{
              ...monthTabBaseStyle,
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.28), rgba(255, 255, 255, 0.06))',
              borderColor: 'rgba(139, 92, 246, 0.5)'
            }}
          >
            <span className="month-tab__label">현재 표시 월</span>
            <span className="month-tab__value">{formatMonthLabel(current.year, current.month)}</span>
          </div>
        </div>
      </section>

      <section className="section" style={sectionStyle}>
        <div className="section-head">
          <div>
            <h2 className="section-title">{formatMonthLabel(current.year, current.month)} 12띠 운세</h2>
            <p className="section-copy">원하는 띠를 선택하면 해당 월의 상세 운세 페이지로 이동합니다.</p>
          </div>
        </div>
        <div className="fortune-grid" style={fortuneGridStyle}>
          {ZODIAC_ORDER.map((zodiac) => {
            const info = ZODIAC_INFO[zodiac];
            const sampleYears = info.years.slice(-2);
            const hasContent = availableZodiacs.has(zodiac);

            return (
              <Link
                key={zodiac}
                href={`/${current.year}/${String(current.month).padStart(2, '0')}/${zodiac}`}
                className="zodiac-card"
                style={zodiacCardStyle}
              >
                <div className="zodiac-card__emoji" aria-hidden="true">
                  {info.emoji}
                </div>
                <h3 className="zodiac-card__title">{info.ko}</h3>
                <p className="zodiac-card__meta">대표 출생연도 {sampleYears.join(' · ')}</p>
                <span
                  className={`zodiac-card__badge ${hasContent ? '' : 'zodiac-card__badge--muted'}`.trim()}
                  style={{
                    ...badgeBaseStyle,
                    background: hasContent ? 'rgba(249, 203, 66, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                    color: hasContent ? '#ffe18c' : 'rgba(240, 238, 255, 0.6)'
                  }}
                >
                  {hasContent ? '콘텐츠 준비 완료' : '운세 준비 중'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section" style={sectionStyle}>
        <AdSlot slot="1000000001" />
      </section>
    </main>
  );
}
