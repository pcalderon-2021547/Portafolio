import { Link } from 'react-router-dom';
import { personalData } from '../../data/personal';
import { useTranslation } from '../../context/LanguageContext';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import SEO from '../../components/ui/SEO/SEO';
import Terminal from '../../components/ui/Terminal/Terminal';
import TechIcons from '../../components/ui/TechIcons/TechIcons';
import CodeDecorations from '../../components/ui/CodeDecorations/CodeDecorations';
import styles from './Home.module.css';

export default function Home() {
  const { t, lang } = useTranslation();
  const phraseKey = `phrase${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const phrase = personalData[phraseKey] || personalData.phraseEn;
  const { displayedText } = useTypingEffect(phrase, 35, 1500);

  return (
    <main className={styles.home}>
      <SEO title="Inicio"
        description={`${personalData.name} — ${t.home.title}`}
        lang={lang} />
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <TechIcons />
        <CodeDecorations />
        <div className={styles.content}>
          <p className={styles.greeting}>{t.home.greeting}</p>
          <h1 className={styles.name}>{personalData.name}</h1>
          <p className={styles.title}>{t.home.title}</p>
          <p className={styles.phrase}>
            {displayedText}
            <span className={styles.cursor} />
          </p>
          <Link to="/projects" className={styles.cta}>{t.home.cta}</Link>
        </div>
        <div className={styles.scrollIndicator}>
          <span>{t.home.scroll}</span>
          <div className={styles.scrollDot} />
        </div>
      </section>

      <section className={styles.terminalSection}>
        <h2 className={styles.sectionLabel}>{t.home.terminal}</h2>
        <Terminal />
      </section>
    </main>
  );
}
