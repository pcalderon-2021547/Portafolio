import { useState } from 'react';
import { useTranslation } from '../../../context/LanguageContext';
import styles from './LanguageSelector.module.css';

const LANGUAGES = [
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
];

export default function LanguageSelector() {
  const { lang, changeLang, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === lang);

  return (
    <div className={styles.wrapper}>
      <button className={styles.selector} onClick={() => setOpen(!open)}
        aria-label={t.language.label}>
        <span className={styles.flag}>{current.flag}</span>
        <span className={styles.code}>{current.code.toUpperCase()}</span>
        <span className={`${styles.arrow} ${open ? styles.arrowUp : ''}`}>▾</span>
      </button>
      {open && (
        <div className={styles.dropdown}>
          {LANGUAGES.filter(l => l.code !== lang).map(l => (
            <button key={l.code} className={styles.option}
              onClick={() => { changeLang(l.code); setOpen(false); }}>
              <span className={styles.flag}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </div>
  );
}
