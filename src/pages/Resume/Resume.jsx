import { personalData } from '../../data/personal';
import { useTranslation } from '../../context/LanguageContext';
import SEO from '../../components/ui/SEO/SEO';
import styles from './Resume.module.css';

export default function Resume() {
  const { t, lang } = useTranslation();

  const getLocalizedField = (obj, field) => {
    const key = `${field}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    return obj[key] || obj[`${field}En`] || obj[field];
  };

  const techSkillsKey = `technicalSkills${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const technicalSkills = personalData[techSkillsKey] || personalData.technicalSkillsEs;

  const hobbiesKey = `hobbies${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const hobbies = personalData[hobbiesKey] || personalData.hobbiesEs;

  return (
    <section className={styles.resume}>
      <SEO title={t.resume.title}
        description={`${personalData.name} — ${t.resume.subtitle}`}
        lang={lang} />
      <div className={styles.header}>
        <h1 className="glow-text-red">{t.resume.title}</h1>
        <p>
          {personalData.name} · {personalData.details[`age${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || personalData.details.age} · {t.resume.subtitle}
        </p>
        <p>
          {t.resume.email}: <a href={`mailto:${personalData.details.email}`}>{personalData.details.email}</a>
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={`${styles.sectionTitle} glow-text-red`}>{t.resume.education}</h2>
        <div className={styles.cards}>
          {personalData.education.map(edu => (
            <div key={edu.id} className={styles.card}>
              <p className={styles.cardTitle}>{getLocalizedField(edu, 'title')}</p>
              <p className={styles.cardSub}>{edu.institution}</p>
              <p className={styles.cardYear}>{getLocalizedField(edu, 'year')}</p>
              <p className={styles.cardDesc}>{getLocalizedField(edu, 'description')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`${styles.sectionTitle} glow-text-green`}>{t.resume.certifications}</h2>
        <div className={styles.certCards}>
          {personalData.certifications.map(cert => (
            <div key={cert.id} className={styles.card}>
              <p className={styles.cardTitle}>{getLocalizedField(cert, 'title')}</p>
              <p className={styles.cardSub}>{cert.institution}</p>
              <p className={styles.cardYear}>{cert.year}</p>
              <p className={styles.cardDesc}>{getLocalizedField(cert, 'description')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`${styles.sectionTitle} glow-text-red`}>{t.resume.experience}</h2>
        <div className={styles.cards}>
          {personalData.experience.map(exp => (
            <div key={exp.id} className={styles.card}>
              <p className={styles.cardTitle}>{getLocalizedField(exp, 'title')}</p>
              <p className={styles.cardSub}>{getLocalizedField(exp, 'company')}</p>
              <p className={styles.cardYear}>{getLocalizedField(exp, 'year')}</p>
              <p className={styles.cardDesc}>{getLocalizedField(exp, 'description')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.technicalSection}>
        <h2 className={`${styles.sectionTitle} glow-text-red`}>{t.resume.technicalSkills}</h2>
        <h3 className={styles.skillsCategoryTitle}>{t.resume.skillsCategory}</h3>
        <div className={styles.skillsList}>
          {technicalSkills.map(s => (
            <span key={s} className={styles.skillTag}>{s}</span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`${styles.sectionTitle} glow-text-green`}>{t.resume.languages}</h2>
        <div className={styles.certCards}>
          {personalData.languages.map(langItem => (
            <div key={langItem.name} className={styles.card}>
              <p className={styles.cardTitle}>{langItem.name}</p>
              <p className={styles.cardSub}>{langItem.level}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={`${styles.sectionTitle} glow-text-red`}>{t.resume.hobbies}</h2>
        <div className={styles.skillsList}>
          {hobbies.map(h => (
            <span key={h} className={styles.skillTag}>{h}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
