import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from '../../../context/LanguageContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button className={styles.toggle} onClick={toggleTheme}
      aria-label={theme === 'dark' ? t.theme.dark : t.theme.light}>
      <span className={`${styles.icon} ${theme === 'light' ? styles.rotate : ''}`}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
