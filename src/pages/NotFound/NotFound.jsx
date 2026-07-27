import { Link } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';
import SEO from '../../components/ui/SEO/SEO';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t, lang } = useTranslation();

  return (
    <section className={styles.notFound}>
      <SEO title={t.notFound.title} description={t.notFound.message} lang={lang} />
      <p className={styles.code}>{t.notFound.title}</p>
      <p className={styles.message}>{t.notFound.message}</p>
      <Link to="/" className={styles.link}>{t.notFound.link}</Link>
    </section>
  );
}
