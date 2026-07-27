import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './SkillBar.module.css';

export default function SkillBar({ name, level }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div className={styles.skillBar} ref={ref}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.percentage}>{isVisible ? level : 0}%</span>
      </div>
      <div className={styles.track}>
        <div className={`${styles.fill} ${isVisible ? styles.animate : ''}`}
          style={{ width: isVisible ? `${level}%` : '0%' }} />
      </div>
    </div>
  );
}
