import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

export default function InputBar({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    }
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div style={{
      padding: '12px 16px 16px',
      borderTop: '1px solid rgba(42,42,58,0.6)',
      background: 'linear-gradient(0deg, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.8) 100%)',
      backdropFilter: 'blur(16px)',
      flexShrink: 0,
      position: 'relative', zIndex: 10,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: '8px',
        background: 'rgba(18,18,26,0.9)',
        border: '1px solid rgba(42,42,58,0.9)',
        borderRadius: '14px',
        padding: '8px 10px 8px 14px',
        transition: 'border-color 0.2s',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        outline: 'none',
      }}
        onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,60,60,0.35)'}
        onBlur={e => e.currentTarget.style.borderColor = 'rgba(42,42,58,0.9)'}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask your sensei anything about anime or manga..."
          rows={1}
          style={{
            flex: 1, resize: 'none', border: 'none', outline: 'none',
            background: 'transparent',
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: '14px', lineHeight: 1.6,
            color: 'rgba(240,240,240,0.95)',
            maxHeight: '140px',
            overflowY: 'auto',
            '::placeholder': { color: 'rgba(136,136,160,0.5)' },
          }}
          disabled={isLoading}
        />

        {/* Send button */}
        <motion.button
          whileTap={canSend ? { scale: 0.9 } : {}}
          onClick={handleSend}
          disabled={!canSend}
          style={{
            width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
            border: 'none', cursor: canSend ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: canSend
              ? 'linear-gradient(135deg, #ff3c3c, #c41c1c)'
              : 'rgba(42,42,58,0.5)',
            color: canSend ? 'white' : 'rgba(136,136,160,0.4)',
            transition: 'all 0.2s ease',
            boxShadow: canSend ? '0 0 16px rgba(255,60,60,0.35)' : 'none',
          }}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              </motion.div>
            ) : (
              <motion.div key="send"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}>
                <Send size={15} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Hint */}
      <p style={{
        textAlign: 'center', marginTop: '8px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '9px', color: 'rgba(136,136,160,0.3)',
        letterSpacing: '0.5px',
      }}>
        ENTER to send · SHIFT+ENTER for new line
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea::placeholder { color: rgba(136,136,160,0.45); }
      `}</style>
    </div>
  );
}
