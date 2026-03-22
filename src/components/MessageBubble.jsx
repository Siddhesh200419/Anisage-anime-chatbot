import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      style={{
        display: 'flex', alignItems: 'flex-end', gap: '10px',
        padding: '4px 0',
      }}
    >
      {/* Bot avatar */}
      <div style={{
        width: '32px', height: '32px', borderRadius: '10px',
        background: 'linear-gradient(135deg, #ff3c3c, #a01010)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', flexShrink: 0,
        boxShadow: '0 0 14px rgba(255,60,60,0.3)',
      }}>
        ⛩
      </div>

      <div style={{
        padding: '12px 16px',
        background: 'rgba(22,22,31,0.9)',
        border: '1px solid rgba(42,42,58,0.9)',
        borderRadius: '14px 14px 14px 4px',
        display: 'flex', gap: '5px', alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#ff3c3c',
              boxShadow: '0 0 6px rgba(255,60,60,0.6)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function MessageBubble({ message, index }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: '10px',
        padding: '2px 0',
      }}
    >
      {/* Avatar */}
      {!isUser && (
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #ff3c3c, #a01010)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', flexShrink: 0,
          boxShadow: '0 0 14px rgba(255,60,60,0.25)',
        }}>
          ⛩
        </div>
      )}

      <div style={{
        maxWidth: 'min(72%, 560px)',
        display: 'flex', flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        gap: '4px',
      }}>
        {/* Bubble */}
        <div style={{
          padding: '12px 16px',
          background: isUser
            ? 'linear-gradient(135deg, rgba(255,60,60,0.18), rgba(180,20,20,0.12))'
            : 'rgba(22,22,31,0.9)',
          border: isUser
            ? '1px solid rgba(255,60,60,0.3)'
            : '1px solid rgba(42,42,58,0.9)',
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          ...(isUser ? {} : { boxShadow: '0 2px 16px rgba(0,0,0,0.3)' })
        }}>
          {/* Red accent bar for bot messages */}
          {!isUser && (
            <div style={{
              position: 'absolute', left: 0, top: '20%', bottom: '20%',
              width: '2px', borderRadius: '0 2px 2px 0',
              background: 'linear-gradient(180deg, #ff3c3c, transparent)',
              opacity: 0.6,
            }} />
          )}

          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: '14px',
            lineHeight: 1.75,
            color: isUser ? 'rgba(240,240,240,0.95)' : 'rgba(220,220,235,0.95)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {message.content}
          </p>
        </div>

        {/* Timestamp */}
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          color: 'rgba(136,136,160,0.4)',
          letterSpacing: '0.5px',
          paddingLeft: isUser ? 0 : '4px',
          paddingRight: isUser ? '4px' : 0,
        }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}
