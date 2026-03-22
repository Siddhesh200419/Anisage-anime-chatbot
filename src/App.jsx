import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MangaBackground from './components/MangaBackground';
import Header from './components/Header';
import EmptyState from './components/EmptyState';
import MessageBubble, { TypingIndicator } from './components/MessageBubble';
import InputBar from './components/InputBar';
import ErrorState from './components/ErrorState';

const SYSTEM_PROMPT = `You are AniSage, the ultimate anime and manga oracle. You are wise, passionate, and deeply knowledgeable about:

- All anime series, movies, and OVAs (mainstream and obscure)
- Manga, light novels, and visual novels  
- Anime studios (MAPPA, Ufotable, Kyoto Animation, etc.)
- Directors, voice actors, composers
- Anime history, genres (shonen, shojo, seinen, isekai, mecha, etc.)
- Characters, story arcs, themes, and symbolism
- Seasonal anime recommendations
- Manga-to-anime adaptations and their differences
- Otaku culture, conventions, merchandise

Your personality:
- Wise but enthusiastic — like a sensei who cannot hide their love for anime
- Use occasional Japanese words naturally (nani, sugoi, nakama, etc.) but not excessively  
- Express genuine opinions and favorites, but respect all tastes
- Give concrete, specific recommendations — never vague
- When discussing controversial anime topics, be thoughtful and balanced
- Use light manga/anime references in your speech patterns
- Keep responses concise but rich — no walls of plain text; use natural paragraph breaks

You ONLY discuss anime, manga, and directly related topics (Japanese animation culture, studios, creators). If asked about unrelated topics, gently redirect.

Be the knowledgeable friend every anime fan wishes they had.`;

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUserMessage, setLastUserMessage] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text, isRetry = false) => {
    setError(null);
    const userMessage = { role: 'user', content: text };
    const newMessages = isRetry ? messages : [...messages, userMessage];
    if (!isRetry) {
      setMessages(newMessages);
      setLastUserMessage(text);
    }
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          max_tokens: 500,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content }))
          ],
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Forgive me — the spirits were silent.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastUserMessage) sendMessage(lastUserMessage, true);
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
    setLastUserMessage(null);
    setIsLoading(false);
  };

  const isEmpty = messages.length === 0;

  return (
    <div style={{ position: 'relative', height: '100dvh', width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <MangaBackground />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '900px', width: '100%', margin: '0 auto', borderLeft: '1px solid rgba(42,42,58,0.5)', borderRight: '1px solid rgba(42,42,58,0.5)', background: 'rgba(10,10,15,0.4)', backdropFilter: 'blur(2px)' }}>
        <Header onNewChat={handleNewChat} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {isEmpty ? (
              <EmptyState key="empty" onSuggest={(text) => sendMessage(text)} />
            ) : (
              <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} index={i} />
                ))}
                <AnimatePresence>
                  {isLoading && <TypingIndicator key="typing" />}
                  {error && !isLoading && <ErrorState key="error" onRetry={handleRetry} />}
                </AnimatePresence>
                <div ref={bottomRef} style={{ height: '4px' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <InputBar onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
