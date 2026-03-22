import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

export default function Header({ onNewChat }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px',
        borderBottom: '1px solid rgba(42,42,58,0.8)',
        background: 'linear-gradient(180deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.7) 100%)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}
    >
      {/* Left: logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Mascot icon */}
        <div style={{
          width: '36px', height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #ff3c3c, #c41c1c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
          boxShadow: '0 0 20px rgba(255,60,60,0.4)',
          border: '1px solid rgba(255,60,60,0.3)',
          flexShrink: 0,
        }}>
          ⛩
        </div>

        <div>
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '24px',
            letterSpacing: '2px',
            lineHeight: 1,
            color: '#f0f0f0',
            display: 'flex', alignItems: 'baseline', gap: '4px'
          }}>
            ANI
            <span style={{ color: '#ff3c3c' }}>SAGE</span>
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '8px',
            color: 'rgba(136,136,160,0.7)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginTop: '1px',
            display: 'block'
          }}>
            Your Anime Oracle
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewChat}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px',
            borderRadius: '12px',
            background: 'rgba(255,60,60,0.15)',
            border: '1px solid rgba(255,60,60,0.3)',
            color: '#ff3c3c',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <PlusCircle size={16} />
          <span className="hide-mobile">New Chat</span>
        </motion.button>

        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 10px',
            borderRadius: '20px',
            background: 'rgba(22,22,31,0.9)',
            border: '1px solid rgba(42,42,58,0.9)',
            fontSize: '10px',
            fontFamily: "'Space Mono', monospace",
            color: '#4ade80',
            letterSpacing: '0.5px',
          }}
          className="hide-mobile"
        >
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 6px #4ade80'
          }} />
          ONLINE
        </motion.div>
      </div>
    </motion.header>
  );
}
