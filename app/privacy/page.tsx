import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 - 운세키',
  description: '운세키 개인정보처리방침 안내'
};

const sectionStyle = {
  marginTop: '28px',
  padding: '24px',
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.035)',
  border: '1px solid rgba(255, 255, 255, 0.05)'
} as const;

export default function PrivacyPage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <span className="hero-eyebrow">Privacy Policy</span>
        <h1 className="hero-title">개인정보처리방침</h1>
        <p className="hero-copy">
          운세키(unse-key.vercel.app)는 서비스 운영 과정에서 필요한 최소한의 정보를 처리하며, 광고와
          방문 통계 분석을 위해 외부 서비스를 사용할 수 있습니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">1. 사이트 정보</h2>
        <p className="fortune-text">
          본 개인정보처리방침은 운세키(unse-key.vercel.app)에 적용됩니다. 작성일은 2026년
          3월입니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">2. 수집 및 처리 정보</h2>
        <p className="fortune-text">
          본 사이트는 구글 애드센스 광고 제공과 구글 애널리틱스 방문 통계 분석 과정에서 쿠키,
          광고 식별자, 접속 기기 정보, 브라우저 정보, 방문 페이지 정보 등을 처리할 수 있습니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">3. 제3자 광고 및 쿠키</h2>
        <p className="fortune-text">
          운세키는 제3자 광고 서비스인 구글 애드센스를 사용합니다. 구글을 포함한 제3자
          사업자는 쿠키를 활용하여 사용자의 이전 방문 기록을 바탕으로 맞춤형 광고를 제공할 수
          있습니다. 또한 사이트 이용 통계 분석을 위해 쿠키가 사용될 수 있습니다.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="section-title">4. 문의처</h2>
        <p className="fortune-text">
          개인정보처리방침 관련 문의는 contact@unse-key.kr 로 보내주세요.
        </p>
      </section>
    </main>
  );
}
