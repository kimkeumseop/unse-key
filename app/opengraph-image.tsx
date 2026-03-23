import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a1f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f0eeff'
        }}
      >
        <div style={{ fontSize: 80 }}>🔮</div>
        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 24 }}>운세키</div>
        <div style={{ fontSize: 28, color: '#c9b8ff', marginTop: 16 }}>
          월별 12띠 운세 · 매달 업데이트
        </div>
      </div>
    ),
    size
  );
}
