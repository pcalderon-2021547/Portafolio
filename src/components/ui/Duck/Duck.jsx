import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../../context/LanguageContext';
import styles from './Duck.module.css';

const PX = 3;

const C = {
  0: 'transparent', 1: '#ffffff', 2: '#e2e8f0', 3: '#2a9d8f',
  4: '#e63946', 5: '#f4a261', 6: '#1d3557', 7: '#1b263b',
};

const RAW = `
12 0 #1b263b 13 0 #1b263b 14 0 #1b263b 15 0 #1b263b 16 0 #1b263b 17 0 #1b263b
11 1 #1b263b 12 1 #ffffff 13 1 #ffffff 14 1 #e63946 15 1 #e63946 16 1 #e63946 17 1 #e63946 18 1 #1b263b
10 2 #1b263b 11 2 #ffffff 12 2 #ffffff 13 2 #1b263b 14 2 #e63946 15 2 #e63946 16 2 #e63946 17 2 #e63946 18 2 #e63946 19 2 #1b263b
10 3 #1b263b 11 3 #1b263b 12 3 #1b263b 13 3 #e63946 14 3 #e63946 15 3 #e63946 16 3 #e63946 17 3 #e63946 18 3 #1b263b 19 3 #2a9d8f 20 3 #1b263b
9 4 #1b263b 10 4 #1b263b 11 4 #1b263b 12 4 #1b263b 13 4 #1b263b 14 4 #1b263b 15 4 #1b263b 16 4 #1b263b 17 4 #1b263b 18 4 #2a9d8f 19 4 #2a9d8f 20 4 #2a9d8f 21 4 #1b263b
10 5 #1b263b 11 5 #1b263b 12 5 #1b263b 13 5 #1b263b 14 5 #1b263b 15 5 #1b263b 16 5 #1b263b 17 5 #2a9d8f 18 5 #2a9d8f 19 5 #2a9d8f 20 5 #2a9d8f 21 5 #1b263b
11 6 #1b263b 18 6 #1b263b 19 6 #1b263b 20 6 #1b263b
12 6 #ffffff 13 6 #ffffff 14 6 #ffffff 15 6 #ffffff 16 6 #1b263b 17 6 #ffffff
11 7 #1b263b 12 7 #ffffff 13 7 #ffffff 14 7 #ffffff 15 7 #ffffff 16 7 #1d3557 17 7 #ffffff 18 7 #1b263b
11 8 #1b263b 12 8 #ffffff 13 8 #ffffff 14 8 #ffffff 15 8 #ffffff 16 8 #ffffff 17 8 #ffffff 18 8 #1b263b
8 9 #1b263b 9 9 #1b263b 10 9 #1b263b 11 9 #1b263b 12 9 #ffffff 13 9 #ffffff 14 9 #ffffff 15 9 #ffffff 16 9 #ffffff 17 9 #ffffff 18 9 #1b263b
7 10 #1b263b 8 10 #f4a261 9 10 #f4a261 10 10 #f4a261 11 10 #1b263b 12 10 #ffffff 13 10 #ffffff 14 10 #ffffff 15 10 #ffffff 16 10 #ffffff 17 10 #1b263b
6 11 #1b263b 7 11 #f4a261 8 11 #f4a261 9 11 #f4a261 10 11 #f4a261 11 11 #1b263b 12 11 #ffffff 13 11 #ffffff 14 11 #ffffff 15 11 #ffffff 16 11 #1b263b
7 12 #1b263b 8 12 #1b263b 9 12 #1b263b 10 12 #1b263b 11 12 #1b263b 12 12 #ffffff 13 12 #ffffff 14 12 #ffffff 15 12 #ffffff 16 12 #1b263b
12 13 #1b263b 13 13 #ffffff 14 13 #ffffff 15 13 #ffffff 16 13 #1b263b
12 14 #1b263b 13 14 #ffffff 14 14 #ffffff 15 14 #ffffff 16 14 #1b263b
11 15 #1b263b 12 15 #ffffff 13 15 #ffffff 14 15 #ffffff 15 15 #ffffff 16 15 #1b263b
10 16 #1b263b 11 16 #ffffff 12 16 #ffffff 13 16 #ffffff 14 16 #ffffff 15 16 #ffffff 16 16 #1b263b 20 16 #1b263b 21 16 #1b263b
9 17 #1b263b 10 17 #ffffff 11 17 #ffffff 12 17 #ffffff 13 17 #ffffff 14 17 #ffffff 15 17 #ffffff 16 17 #1b263b 19 17 #1b263b 20 17 #ffffff 21 17 #1b263b
8 18 #1b263b 9 18 #ffffff 10 18 #ffffff 11 18 #ffffff 12 18 #ffffff 13 18 #ffffff 14 18 #ffffff 15 18 #ffffff 16 18 #1b263b 18 18 #1b263b 19 18 #ffffff 20 18 #ffffff 21 18 #1b263b 22 18 #1b263b
7 19 #1b263b 8 19 #ffffff 9 19 #ffffff 10 19 #ffffff 11 19 #ffffff 12 19 #ffffff 13 19 #ffffff 14 19 #ffffff 15 19 #ffffff 16 19 #1b263b 17 19 #1b263b 18 19 #ffffff 19 19 #ffffff 20 19 #e2e8f0 21 19 #ffffff 22 19 #1b263b
6 20 #1b263b 7 20 #ffffff 8 20 #ffffff 9 20 #ffffff 10 20 #ffffff 11 20 #ffffff 12 20 #ffffff 13 20 #ffffff 14 20 #ffffff 15 20 #ffffff 16 20 #ffffff 17 20 #ffffff 18 20 #ffffff 19 20 #e2e8f0 20 20 #e2e8f0 21 20 #1b263b 22 20 #1b263b
5 21 #1b263b 6 21 #ffffff 7 21 #ffffff 8 21 #ffffff 9 21 #ffffff 10 21 #ffffff 11 21 #ffffff 12 21 #ffffff 13 21 #ffffff 14 21 #ffffff 15 21 #ffffff 16 21 #ffffff 17 21 #ffffff 18 21 #e2e8f0 19 21 #e2e8f0 20 21 #1b263b 21 21 #ffffff 22 21 #1b263b
5 22 #1b263b 6 22 #ffffff 7 22 #ffffff 8 22 #ffffff 9 22 #ffffff 10 22 #ffffff 11 22 #ffffff 12 22 #ffffff 13 22 #ffffff 14 22 #ffffff 15 22 #ffffff 16 22 #ffffff 17 22 #e2e8f0 18 22 #e2e8f0 19 22 #1b263b 20 22 #ffffff 21 22 #e2e8f0 22 22 #1b263b
5 23 #1b263b 6 23 #ffffff 7 23 #ffffff 8 23 #ffffff 9 23 #ffffff 10 23 #ffffff 11 23 #ffffff 12 23 #ffffff 13 23 #ffffff 14 23 #ffffff 15 23 #ffffff 16 23 #e2e8f0 17 23 #e2e8f0 18 23 #1b263b 19 23 #1b263b 20 23 #1b263b 21 23 #1b263b
6 24 #1b263b 7 24 #ffffff 8 24 #ffffff 9 24 #ffffff 10 24 #ffffff 11 24 #ffffff 12 24 #ffffff 13 24 #ffffff 14 24 #ffffff 15 24 #e2e8f0 16 24 #e2e8f0 17 24 #1b263b
7 25 #1b263b 8 25 #1b263b 9 25 #ffffff 10 25 #ffffff 11 25 #ffffff 12 25 #ffffff 13 25 #ffffff 14 25 #e2e8f0 15 25 #1b263b 16 25 #1b263b
10 26 #1b263b 11 26 #1b263b 12 26 #1b263b 13 26 #1b263b 14 26 #1b263b
10 27 #1b263b 11 27 #f4a261 12 27 #1b263b
10 28 #1b263b 11 28 #f4a261 12 28 #1b263b
8 29 #1b263b 9 29 #1b263b 10 29 #f4a261 11 29 #f4a261 12 29 #1b263b
8 30 #1b263b 9 30 #f4a261 10 30 #f4a261 11 30 #f4a261 12 30 #1b263b
8 31 #1b263b 9 31 #1b263b 10 31 #1b263b 11 31 #1b263b 12 31 #1b263b
18 24 #1b263b 19 24 #f4a261 20 24 #1b263b
18 25 #1b263b 19 25 #f4a261 20 25 #f4a261 21 25 #1b263b
19 26 #1b263b 20 26 #f4a261 21 26 #f4a261 22 26 #1b263b
19 27 #1b263b 20 27 #1b263b 21 27 #1b263b 22 27 #1b263b
`;

const MIN_X = 5;
const W = 18;
const H = 32;

const COLOR_MAP = {
  '#1b263b': 7, '#ffffff': 1, '#e2e8f0': 2,
  '#2a9d8f': 3, '#e63946': 4, '#f4a261': 5, '#1d3557': 6,
};

function parseSprite(raw, w, h, minX) {
  const grid = Array.from({ length: h }, () => Array(w).fill(0));
  const parts = raw.trim().split(/\s+/);
  for (let i = 0; i + 2 < parts.length; i += 3) {
    const x = parseInt(parts[i]) - minX;
    const y = parseInt(parts[i + 1]);
    const color = parts[i + 2];
    const code = COLOR_MAP[color];
    if (code && x >= 0 && x < w && y >= 0 && y < h) {
      grid[y][x] = code;
    }
  }
  return grid;
}

const SPRITE = parseSprite(RAW, W, H, MIN_X);

const SPRITE_D1 = SPRITE.map(row => [...row]);
SPRITE_D1[20][12] = 2;
SPRITE_D1[21][12] = 2;

const SPRITE_D2 = SPRITE.map(row => [...row]);
SPRITE_D2[20][14] = 2;
SPRITE_D2[21][14] = 2;

const FRAMES = [SPRITE, SPRITE_D1, SPRITE, SPRITE_D2];

const GLOW_COLORS = [
  { bg: 'rgba(57, 255, 20, 0.12)', hover: 'rgba(255, 7, 58, 0.2)' },
  { bg: 'rgba(72, 149, 239, 0.12)', hover: 'rgba(230, 57, 70, 0.2)' },
  { bg: 'rgba(230, 57, 70, 0.12)', hover: 'rgba(42, 157, 143, 0.2)' },
  { bg: 'rgba(42, 157, 143, 0.12)', hover: 'rgba(157, 78, 221, 0.2)' },
  { bg: 'rgba(157, 78, 221, 0.12)', hover: 'rgba(112, 224, 0, 0.2)' },
  { bg: 'rgba(112, 224, 0, 0.12)', hover: 'rgba(57, 255, 20, 0.2)' },
];

function Sprite({ frame }) {
  return (
    <div className={styles.sprite}>
      {frame.map((row, ri) =>
        row.map((cell, ci) =>
          cell !== 0 ? (
            <div
              key={`${ri}-${ci}`}
              className={styles.pixel}
              style={{
                width: PX, height: PX,
                background: C[cell],
                boxShadow: cell >= 4 ? `0 0 3px ${C[cell]}` : 'none',
              }}
            />
          ) : (
            <div key={`${ri}-${ci}`} style={{ width: PX, height: PX }} />
          )
        )
      )}
    </div>
  );
}

export default function Duck() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [state, setState] = useState('idle');
  const [frameIdx, setFrameIdx] = useState(0);
  const [glowIdx, setGlowIdx] = useState(0);
  const [bubble, setBubble] = useState('');
  const idleTimerRef = useRef(null);
  const jokeTimeoutRef = useRef(null);
  const hasWelcomed = useRef(false);

  const showBubble = (content) => {
    clearTimeout(idleTimerRef.current);
    clearTimeout(jokeTimeoutRef.current);
    setBubble(content);
    setState('joke');
    jokeTimeoutRef.current = setTimeout(() => {
      setState('idle');
      setBubble('');
    }, 6000);
  };

  const speed = state === 'idle' ? 500 : state === 'hover' ? 100 : state === 'sleep' ? 800 : 400;

  useEffect(() => {
    if (state === 'joke') return;
    const interval = setInterval(() => setFrameIdx(i => (i + 1) % FRAMES.length), speed);
    return () => clearInterval(interval);
  }, [state, speed]);

  useEffect(() => {
    if (state === 'idle' || state === 'joke') {
      const interval = setInterval(() => {
        setGlowIdx(i => (i + 1) % GLOW_COLORS.length);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    if (state === 'idle') {
      idleTimerRef.current = setTimeout(() => setState('sleep'), 10000);
    }
    return () => clearTimeout(idleTimerRef.current);
  }, [state]);

  useEffect(() => {
    if (t.duck && t.duck.welcome) {
      const timer = setTimeout(() => {
        if (!hasWelcomed.current) {
          hasWelcomed.current = true;
          showBubble(t.duck.welcome);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [t]);

  const handleClick = () => {
    clearTimeout(jokeTimeoutRef.current);
    const jokes = t.duck && t.duck.jokes;
    const msgs = t.duck && t.duck.messages ? (t.duck.messages[pathname] || [t.duck.idle]) : [];
    const hasJokes = jokes && jokes.length;
    const hasMsgs = msgs && msgs.length;
    if (hasJokes || hasMsgs) {
      const pickJoke = hasJokes && hasMsgs ? Math.random() < 0.25 : hasJokes;
      const text = pickJoke
        ? jokes[Math.floor(Math.random() * jokes.length)]
        : msgs[Math.floor(Math.random() * msgs.length)];
      showBubble(text);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(idleTimerRef.current);
    clearTimeout(jokeTimeoutRef.current);
    setBubble('');
    setState('hover');
  };

  const handleMouseLeave = () => {
    setState('idle');
  };

  const animClass = state === 'sleep' ? styles.sleep
    : state === 'hover' ? styles.hop
    : state === 'joke' ? styles.sway
    : styles.sway;

  const glowColors = GLOW_COLORS[state === 'sleep' ? 1 : glowIdx];

  return (
    <div className={styles.wrapper}>
      {state === 'joke' && bubble && (
        <div className={styles.tooltip} key={bubble}>
          <span>{bubble}</span>
          <div className={styles.arrow} />
        </div>
      )}

      {state === 'sleep' && <span className={styles.zzz}>Zzz</span>}

      <div className={styles.flipWrapper}>
        <div
          className={`${styles.container} ${animClass}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="Mascota del portafolio"
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          <div
            className={styles.glow}
            style={{
              background: `radial-gradient(circle, ${state === 'hover' ? glowColors.hover : glowColors.bg}, transparent 70%)`,
            }}
          />

          <Sprite frame={FRAMES[frameIdx]} />
        </div>
      </div>

      <div className={`${styles.shadow} ${state === 'sleep' ? styles.shadowSleep : ''}`} />
    </div>
  );
}
