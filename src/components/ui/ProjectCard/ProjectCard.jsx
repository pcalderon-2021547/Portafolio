import { useTranslation } from '../../../context/LanguageContext';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index, onOpenModal }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const { t, lang } = useTranslation();

  const desc = lang === 'es' ? project.descEs : project.descEn;
  const learnings = lang === 'es' ? project.learningsEs : project.learningsEn;

  return (
    <article className={`${styles.card} ${isVisible ? styles.visible : ''}`} ref={ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onClick={() => onOpenModal(project)}>
      <ImageCarousel images={project.images} title={project.title} onImageClick={() => onOpenModal(project)} />
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{desc}</p>
        <div className={styles.techs}>
          {project.tech.map(t => <span key={t} className={styles.tech}>{t}</span>)}
        </div>
        <div className={styles.learnings}>
          <p className={styles.learningsTitle}>{t.projects.learnings}</p>
          {learnings.map(l => <p key={l} className={styles.learningItem}>{l}</p>)}
        </div>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <span className={styles.linkIcon}>&lt;/&gt;</span>
          {t.projects.github}
        </a>
      </div>
    </article>
  );
}
