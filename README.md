# AniSage

**AniSage** is a chatbot dedicated to everything anime and manga. It’s designed with a dark, high-contrast manga-panel aesthetic, moving away from the usual "clean/flat" AI chat interfaces.

The project was built as a software engineering assignment for Thinkly Labs, focusing on both domain-specific AI prompting and custom UI/UX.

---

## The Aesthetic

Instead of a generic chat bubble layout, I went for a **manga-panel feel**:
- **Ink-Black Theme**: A deep, dark background with high-contrast red accents (#ff3c3c).
- **Manga Details**: Halftone dot patterns, speed lines, and kanji watermarks to ground it in the medium.
- **Motion**: Everything is animated using **Framer Motion**—from the staggered message reveals to the pulsing "SENSEI ONLINE" indicator.
- **Typography**: Uses the *Bangers* display font for that classic comic-book punch, paired with *Noto Sans JP* and *Space Mono* for readability.

## The "Sensei" Brain

The bot isn't just a generic Claude wrapper. It’s tuned to be **AniSage Sensei**:
- **Expertise**: Deep knowledge of studios (MAPPA, Ufotable, etc.), directors, seasonal shifts, and niche manga.
- **Personality**: Enthusiastic but wise. It weaves in Japanese terms (like *nakama* or *sugoi*) without overdoing it.
- **Focus**: It stays in its lane. If you ask about quantum physics, it’ll gently redirect you back to the world of anime.
- **Tech**: Powered by **Claude 3.5 Sonnet** via the OpenRouter API.

## Tech Stack

- **Frontend**: React + Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Express (as a proxy to handle API calls securely)
- **AI**: Claude 3.5 Sonnet (OpenRouter)

---

## Running it Locally

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the `anisage/` directory:
   ```env
   Openrouter_API_KEY=your_key_here
   ```

3. **Start the Proxy Server**
   The proxy handles the API requests to OpenRouter.
   ```bash
   node server.js
   ```

4. **Start the Frontend**
   In another terminal:
   ```bash
   npm run dev
   ```

## Deployment

The project is configured for **Vercel**. The `vercel.json` file handles routing for both the React app and the server-side proxy.

---
*Created with passion for the medium.*
