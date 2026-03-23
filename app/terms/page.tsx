import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 - 운세키',
  description: '운세키 서비스 이용약관'
};

const sectionStyle = {
  marginTop: '28px',
  padding: '24px',
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.035)',
  border: '1px solid rgba(255, 255, 255, 0.05)'
} as const;

export default function TermsPage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <span className="hero-eyebrow">Terms Of Service</span>
        <h1 className="hero-title">이용약관</h1>
        <p className="hero-copy">
          운세키는 월별 12띠 운세 콘텐츠를 제공하는 정보 서비스입니다. 아래 약관은 사이트 이용
          시 적용됩니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">1. 서비스 목적</h2>
        <p className="fortune-text">
          운세키는 월별 띠별 운세 정보를 이용자에게 제공하기 위한 목적으로 운영됩니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">2. 참고용 정보 안내</h2>
        <p className="fortune-text">
          사이트에 제공되는 운세 정보는 참고용 콘텐츠이며 법적, 의학적, 재정적 효력을 갖지
          않습니다. 중요한 판단은 이용자 본인의 책임하에 진행되어야 합니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">3. 저작권</h2>
        <p className="fortune-text">
          운세키에 게시된 텍스트, 구조, 디자인 등은 별도 표시가 없는 한 운세키에 저작권이
          있습니다. 사전 동의 없는 무단 복제와 재배포를 금합니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">4. 면책조항</h2>
        <p className="fortune-text">
          운세키는 제공 정보의 정확성, 완전성, 최신성에 대해 보증하지 않으며, 사이트 이용으로
          인해 발생하는 직간접적 손해에 대해 책임을 지지 않습니다.
        </p>
      </section>
    </main>
  );
}
