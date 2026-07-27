import { personalData } from '../../data/personal';
import { useTranslation } from '../../context/LanguageContext';
import SEO from '../../components/ui/SEO/SEO';
import SkillBar from '../../components/ui/SkillBar/SkillBar';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './About.module.css';

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { t, lang } = useTranslation();

  const aboutTexts = lang === 'es' ? personalData.aboutEs
    : lang === 'fr' ? personalData.aboutFr
    : lang === 'pt' ? personalData.aboutPt
    : lang === 'de' ? personalData.aboutDe
    : personalData.aboutEn;

  const qualitiesKey = `qualities${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const qualities = personalData[qualitiesKey] || personalData.qualitiesEs;

  const ageKey = `age${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const expKey = `yearsDeveloping${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const currKey = `currently${lang.charAt(0).toUpperCase() + lang.slice(1)}`;

  const ageVal = personalData.details[ageKey] || personalData.details.age;
  const expVal = personalData.details[expKey] || personalData.details.yearsDeveloping;
  const currVal = personalData.details[currKey] || personalData.details.currentlyEn;

  const details = [
    { label: t.about.details.age, value: ageVal },
    { label: t.about.details.yearsDeveloping, value: expVal },
    { label: t.about.details.email, value: personalData.details.email },
    { label: t.about.details.location, value: personalData.details.location },
    { label: t.about.details.currently, value: currVal },
  ];

  return (
    <section className={styles.about}>
      <SEO title={t.about.title}
        description={personalData.aboutEs?.[0] || personalData.aboutEn[0]}
        lang={lang} />
      <div className={`${styles.intro} ${isVisible ? 'animate-fade-in-up' : ''}`} ref={ref}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarGlow} />
          <img src={personalData.profileImage} alt={personalData.name} className={styles.avatar} />
        </div>
        <div className={styles.bio}>
          <h2>{personalData.name}</h2>
          <p className={styles.bioTitle}>{t.home.title}</p>
          {aboutTexts.map((p, i) => <p key={i}>{p}</p>)}
          <div className={styles.details}>
            {details.map(d => (
              <div key={d.label} className={styles.detailItem}>
                <span className={styles.detailLabel}>{d.label}</span>
                <span className={styles.detailValue}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <div className={styles.skillsHeader}>
          <h2 className="glow-text-green">{t.about.skillsTitle}</h2>
        </div>
        <div className={styles.skillsGrid}>
          {personalData.skills.map(skill => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>

      <div className={styles.qualitiesSection}>
        <div className={styles.qualitiesHeader}>
          <h2 className="glow-text-red">{t.about.qualities}</h2>
        </div>
        <div className={styles.qualitiesGrid}>
          {qualities.map(q => (
            <span key={q} className={styles.qualityTag}>{q}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
