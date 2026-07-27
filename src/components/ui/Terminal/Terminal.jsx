import { useRef, useEffect } from 'react';
import { useTerminal } from '../../../hooks/useTerminal';
import { useTranslation } from '../../../context/LanguageContext';
import SpaceInvaders from '../SpaceInvaders/SpaceInvaders';
import styles from './Terminal.module.css';

export default function Terminal() {
  const { lang } = useTranslation();
  const { history, input, setInput, isGameMode, handleCommand, exitGame } = useTerminal(lang);
  const endRef = useRef(null);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.bar}>
        <span className={styles.dot} style={{ background: '#FF5F56' }} />
        <span className={styles.dot} style={{ background: '#FFBD2E' }} />
        <span className={styles.dot} style={{ background: '#27C93F' }} />
        <span className={styles.title}>TermOS v1.0</span>
      </div>

      <div className={styles.screen} onClick={handleContainerClick}>
        <div className={styles.scanlines} />

        {isGameMode ? (
          <SpaceInvaders onExit={exitGame} />
        ) : (
          <div className={styles.output} ref={outputRef}>
            {history.map((entry, i) => (
              <div key={i} className={styles.line}>
                {entry.input && (
                  <div className={styles.inputLine}>
                    <span className={styles.prompt}>&gt;</span>
                    <span className={styles.command}>{entry.input}</span>
                  </div>
                )}
                {typeof entry.output === 'string' && (
                  <div className={styles.outputText}>{entry.output}</div>
                )}
                {Array.isArray(entry.output) && (
                  <div className={styles.outputBlock}>
                    {entry.output.map((line, j) => (
                      <div key={j} className={styles.outputText}>{line}</div>
                    ))}
                  </div>
                )}
                {entry.output && entry.output.lines && (
                  <div className={styles.outputBlock}>
                    <div className={styles.helpTitle}>{entry.output.title}</div>
                    {entry.output.lines.map((line, j) => (
                      <div key={j} className={styles.helpLine}>
                        <span className={styles.helpCmd}>{line.cmd.padEnd(10)}</span>
                        <span className={styles.helpDesc}>{line.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}

        {!isGameMode && (
          <div className={styles.inputArea}>
            <span className={styles.prompt}>&gt;</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        )}
      </div>
    </div>
  );
}
