import { useState, useEffect, useRef } from 'react';
import styles from './CodeDecorations.module.css';

const SNIPPETS = [
  {
    id: 1,
    lines: [
      { text: 'const portfolio = {', color: '#c792ea' },
      { text: '  role: "Full Stack",', color: '#82aaff' },
      { text: '  passion: "Code"', color: '#82aaff' },
      { text: '};', color: '#c792ea' },
    ],
    top: '18%',
    left: '5%',
    speed: 45,
  },
  {
    id: 2,
    lines: [
      { text: 'import { createApp }', color: '#c792ea' },
      { text: "  from 'react'", color: '#89ddff' },
      { text: '', color: 'transparent' },
      { text: 'createApp(<Portfolio />)', color: '#f78c6c' },
    ],
    top: '55%',
    right: '5%',
    left: 'auto',
    speed: 50,
  },
  {
    id: 3,
    lines: [
      { text: '.hero {', color: '#f78c6c' },
      { text: '  glow: neon-red;', color: '#82aaff' },
      { text: '  display: flex;', color: '#82aaff' },
      { text: '}', color: '#f78c6c' },
    ],
    top: '35%',
    right: 'auto',
    left: '3%',
    speed: 55,
  },
];

function CodeSnippet({ lines, speed = 50, pause = 4000, style }) {
  const [displayed, setDisplayed] = useState(lines.map(() => ''));
  const [activeLine, setActiveLine] = useState(0);
  const [activeChar, setActiveChar] = useState(0);
  const [phase, setPhase] = useState('typing');
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase === 'typing') {
      if (activeLine >= lines.length) {
        timerRef.current = setTimeout(() => setPhase('erasing'), pause);
        return;
      }
      const line = lines[activeLine].text;
      if (activeChar < line.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(prev => {
            const next = [...prev];
            next[activeLine] = line.slice(0, activeChar + 1);
            return next;
          });
          setActiveChar(c => c + 1);
        }, speed);
      } else {
        setActiveLine(l => l + 1);
        setActiveChar(0);
      }
    } else if (phase === 'erasing') {
      if (activeLine < 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(lines.map(() => ''));
          setActiveLine(0);
          setActiveChar(0);
          setPhase('typing');
        }, 500);
        return;
      }
      const line = lines[activeLine]?.text || '';
      if (activeChar < line.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(prev => {
            const next = [...prev];
            next[activeLine] = line.slice(0, line.length - activeChar - 1);
            return next;
          });
          setActiveChar(c => c + 1);
        }, speed * 0.6);
      } else {
        setActiveLine(l => l - 1);
        setActiveChar(0);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, activeLine, activeChar, lines, speed, pause]);

  const isComplete = activeLine >= lines.length && phase === 'typing';
  const isErasing = phase === 'erasing';
  const showCursor = (i) => {
    if (isComplete && i === lines.length - 1) return true;
    if (phase === 'typing' && i === activeLine && activeChar > 0) return true;
    if (isErasing && i === activeLine) return true;
    return false;
  };

  return (
    <div className={styles.snippet} style={style}>
      {displayed.map((line, i) => (
        <div key={i} className={styles.line} style={{ color: lines[i].color }}>
          <span>{line}</span>
          {showCursor(i) && <span className={styles.cursor} />}
        </div>
      ))}
    </div>
  );
}

export default function CodeDecorations() {
  return (
    <div className={styles.container} aria-hidden="true">
      {SNIPPETS.map(s => (
        <CodeSnippet
          key={s.id}
          lines={s.lines}
          speed={s.speed}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
          }}
        />
      ))}
    </div>
  );
}
