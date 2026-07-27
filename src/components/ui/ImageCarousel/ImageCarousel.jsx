import { useState, useEffect, useCallback } from 'react';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({ images, title, onImageClick }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const len = images?.length ?? 0;
  const hasMultiple = len > 1;

  const next = useCallback(() => setCurrent(p => (p + 1) % len), [len]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + len) % len), [len]);

  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [hasMultiple, isPaused, next]);

  if (!len) return null;

  return (
    <div className={styles.carousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`${title} ${i + 1}`}
            className={styles.image} loading="lazy"
            onClick={() => onImageClick?.(i)} />
        ))}
      </div>

      {hasMultiple && (
        <>
          <button className={`${styles.arrow} ${styles.prev}`} onClick={prev} aria-label="Imagen anterior">◀</button>
          <button className={`${styles.arrow} ${styles.next}`} onClick={next} aria-label="Siguiente imagen">▶</button>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <button key={i}
                className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
                aria-label={`Ir a imagen ${i + 1}`}
                onClick={() => setCurrent(i)} />
            ))}
          </div>

          <span className={styles.counter}>{current + 1}/{len}</span>
        </>
      )}
    </div>
  );
}
