import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: 'flex', alignItems: 'flex-end', gap: '10px',
        padding: '2px 0',
      }}
    >
      <div style={{
        width: '32px', height: '32px', borderRadius: '10px',
        background: 'linear-gradient(135deg, #ff3c3c, #a01010)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', flexShrink: 0,
      }}>
        ⛩
      </div>

      <div style={{
        padding: '12px 16px',
        background: 'rgba(255,60,60,0.07)',
        border: '1px solid rgba(255,60,60,0.25)',
        borderRadius: '14px 14px 14px 4px',
        display: 'flex', flexDirection: 'column', gap: '8px',
        maxWidth: '420px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b6b' }}>
          <AlertTriangle size={14} />
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', letterSpacing: '0.5px'
          }}>
            Connection interrupted
          </span>
        </div>
        <p style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: '13px', color: 'rgba(200,200,220,0.7)',
          lineHeight: 1.6,
        }}>
          Even the wisest sensei stumbles sometimes. The spirits are being uncooperative — please try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,60,60,0.12)', border: '1px solid rgba(255,60,60,0.25)',
              borderRadius: '8px', padding: '6px 12px',
              cursor: 'pointer', color: '#ff6b6b',
              fontFamily: "'Space Mono', monospace", fontSize: '10px',
              letterSpacing: '1px', width: 'fit-content',
              transition: 'all 0.2s',
            }}
          >
            <RefreshCw size={11} /> RETRY
          </button>
        )}
      </div>
    </motion.div>
  );
}
