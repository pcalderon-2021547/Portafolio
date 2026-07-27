import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, lang, t, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);
  const len = project.images?.length ?? 0;
  const hasMultiple = len > 1;
  const desc = lang === 'es' ? project.descEs : project.descEn;
  const learnings = lang === 'es' ? project.learningsEs : project.learningsEn;

  const next = useCallback(() => setImgIndex(p => (p + 1) % len), [len]);
  const prev = useCallback(() => setImgIndex(p => (p - 1 + len) % len), [len]);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  const handleMouseMove = e => {
    if (!zoomed || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>

        <div className={styles.imageSection}>
          <div className={styles.imageContainer}
            onMouseMove={handleMouseMove}>
            <img ref={imgRef} src={project.images[imgIndex]} alt={`${project.title} ${imgIndex + 1}`}
              className={`${styles.mainImage} ${zoomed ? styles.zoomed : ''}`}
              style={zoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
              onClick={() => setZoomed(!zoomed)} />
            {!zoomed && <span className={styles.lupaHint}>🔍</span>}
          </div>
          {hasMultiple && (
            <div className={styles.thumbnails}>
              {project.images.map((src, i) => (
                <img key={i} src={src} alt={`${project.title} ${i + 1}`}
                  className={`${styles.thumb} ${i === imgIndex ? styles.activeThumb : ''}`}
                  onClick={() => setImgIndex(i)} />
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.description}>{desc}</p>

          <div className={styles.techs}>
            {project.tech.map(t => <span key={t} className={styles.tech}>{t}</span>)}
          </div>

          <div className={styles.learnings}>
            <h4 className={styles.learningsTitle}>{t.projects.learnings}</h4>
            {learnings.map(l => <p key={l} className={styles.learningItem}>{l}</p>)}
          </div>

          <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <span>&lt;/&gt;</span> {t.projects.github}
          </a>
        </div>
      </div>
    </div>
  );
}
