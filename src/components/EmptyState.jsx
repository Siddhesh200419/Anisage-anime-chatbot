import { motion } from 'framer-motion';

const SUGGESTED = [
  { emoji: '⚔️', text: 'What anime should I watch if I loved Attack on Titan?' },
  { emoji: '🌸', text: 'Explain the Big 3 of shonen anime' },
  { emoji: '📚', text: 'What\'s the difference between shonen, seinen, and shojo?' },
  { emoji: '🎌', text: 'Recommend underrated manga that deserve an anime adaptation' },
  { emoji: '🔥', text: 'Who is the strongest anime character ever and why?' },
  { emoji: '🎭', text: 'What makes Neon Genesis Evangelion so culturally significant?' },
];

export default function EmptyState({ onSuggest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        flex: 1, padding: '32px 24px', gap: '32px',
        overflowY: 'auto',
      }}
    >
      {/* Hero graphic */}
      <div style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '90px', height: '90px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #1e1e2e, #12121a)',
            border: '1.5px solid rgba(255,60,60,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '44px', margin: '0 auto 20px',
            boxShadow: '0 0 40px rgba(255,60,60,0.12), 0 20px 60px rgba(0,0,0,0.5)',
            position: 'relative',
          }}
        >
          ⛩️
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: '-8px',
              borderRadius: '30px',
              border: '1px solid transparent',
              borderTopColor: 'rgba(255,60,60,0.4)',
              borderRightColor: 'rgba(245,200,66,0.2)',
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(32px, 5vw, 48px)',
            letterSpacing: '4px',
            lineHeight: 1.1,
            marginBottom: '10px',
          }}
        >
          KONNICHIWA,{' '}
          <span style={{
            color: '#ff3c3c',
            textShadow: '0 0 30px rgba(255,60,60,0.5)'
          }}>OTAKU</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: 'rgba(136,136,160,0.9)',
            fontSize: '13px',
            lineHeight: 1.7,
            maxWidth: '380px',
            margin: '0 auto',
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Ask me anything about anime, manga, characters, studios, genres, history — your wise sensei awaits.
        </motion.p>
      </div>

      {/* Suggested questions */}
      <div style={{ width: '100%', maxWidth: '620px' }}>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px', letterSpacing: '2px',
          color: 'rgba(136,136,160,0.5)', textTransform: 'uppercase',
          marginBottom: '12px', textAlign: 'center'
        }}>
          ── Try asking ──
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '8px'
        }}>
          {SUGGESTED.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,60,60,0.4)', background: 'rgba(30,30,46,0.9)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggest(s.text)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '12px 14px',
                background: 'rgba(22,22,31,0.7)',
                border: '1px solid rgba(42,42,58,0.8)',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{s.emoji}</span>
              <span style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: '12px', color: 'rgba(200,200,220,0.85)',
                lineHeight: 1.5,
              }}>
                {s.text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
