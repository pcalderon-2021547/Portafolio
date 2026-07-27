import { useTranslation } from '../../context/LanguageContext';
import SocialIcon from '../../components/ui/SocialIcon/SocialIcon';
import SEO from '../../components/ui/SEO/SEO';
import { socialLinks } from '../../data/social';
import { personalData } from '../../data/personal';
import styles from './Contact.module.css';

export default function Contact() {
  const { t, lang } = useTranslation();

  return (
    <section className={styles.contact}>
      <SEO title={t.contact.title}
        description={t.contact.subtitle}
        lang={lang} />
      <h1 className="section-title red glow-text-red">{t.contact.title}</h1>
      <p className={styles.subtitle}>{t.contact.subtitle}</p>
      <div className={styles.socials}>
        {Object.entries(socialLinks).map(([name, data]) => (
          <SocialIcon key={name} name={name} url={data.url} size="large" />
        ))}
      </div>
      <a href={`mailto:${personalData.details.email}`} className={styles.email}>
        <span className={styles.emailIcon}>✉</span>
        {personalData.details.email}
      </a>
    </section>
  );
}
