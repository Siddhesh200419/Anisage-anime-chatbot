export default function MangaBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none'
    }}>
      {/* Base gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 40%, #0a0a12 100%)'
      }} />

      {/* Halftone dots */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Speed lines emanating from top-right */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035 }}
        viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * Math.PI * 2;
          const cx = 1100, cy = -50;
          const r = 1800;
          return (
            <line key={i}
              x1={cx} y1={cy}
              x2={cx + Math.cos(angle) * r}
              y2={cy + Math.sin(angle) * r}
              stroke="white" strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          );
        })}
      </svg>

      {/* Large kanji watermark */}
      <div style={{
        position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)',
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: '420px', fontWeight: 700, lineHeight: 1,
        color: 'rgba(255,60,60,0.025)',
        userSelect: 'none', writingMode: 'vertical-rl'
      }}>
        漫画
      </div>

      {/* Bottom-left accent kanji */}
      <div style={{
        position: 'absolute', left: '-20px', bottom: '5%',
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: '200px', fontWeight: 700,
        color: 'rgba(245,200,66,0.03)',
        userSelect: 'none'
      }}>
        聖
      </div>

      {/* Ink splatter circles */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-80px',
        width: '320px', height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,60,60,0.06) 0%, transparent 70%)'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: '200px', height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(60,140,255,0.05) 0%, transparent 70%)'
      }} />

      {/* Panel border lines */}
      <div style={{
        position: 'absolute', inset: 0,
        boxShadow: 'inset 0 0 120px rgba(0,0,0,0.8)'
      }} />
    </div>
  );
}
