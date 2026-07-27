import styles from './TechIcons.module.css';

const TECHS = [
  { name: 'React', color: '#61dafb', r: 150, speed: 14, delay: 0 },
  { name: 'Node.js', color: '#339933', r: 180, speed: 17, delay: -4 },
  { name: 'JavaScript', color: '#f7df1e', r: 140, speed: 12, delay: -6 },
  { name: 'Java', color: '#ed8b00', r: 170, speed: 15, delay: -8 },
  { name: 'HTML/CSS', color: '#e44d26', r: 160, speed: 13, delay: -3 },
  { name: 'MongoDB', color: '#47a248', r: 190, speed: 18, delay: -10 },
  { name: 'Git', color: '#f05032', r: 155, speed: 16, delay: -5 },
  { name: 'SQL', color: '#336791', r: 185, speed: 19, delay: -7 },
];

const ICON_SVGS = {
  React: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.8">
      <circle cx="12" cy="12" r="2.8" />
      <ellipse cx="12" cy="4" rx="8" ry="3" />
      <ellipse cx="12" cy="20" rx="8" ry="3" />
      <ellipse cx="4" cy="12" rx="3" ry="8" />
      <ellipse cx="20" cy="12" rx="3" ry="8" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="#339933">
      <path d="M12 1.5L1.5 7v10l10.5 5.5L22.5 17V7L12 1.5z" />
      <path d="M8.5 8h3.5v9H10v-7H8.5v7H7v-7H5.5v7H4V8h3.5zm5 0h4l1.5 2v5l-1.5 2h-4V8zm3 7.5v-5H14v5h2.5z" fill="#fff" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="#f7df1e">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M7 13.5l1.5 1V9h2v7.5h-2l-1.5-1zM13 14.5l1.5.5V13c0-1-2-1-2-2.5S15 8.5 16 10l-1.5 1c-.5-.5-1.5 0-1.5 1s2 1 2 2.5-2 2.5-2 2.5z" fill="#000" />
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="#ed8b00">
      <path d="M8.5 4s-4 2-3 9h1.5l-.5-5s2-1.5 4-.5l1 .5V7s-2-2-3-3zm0 0s-1.5-1-3 0c-1.5 1 0 2.5 0 2.5s1 1 5 .5l-2-3zm5 3v1.5s2 1 2 3-1 3-3 4l1 1s3-1.5 3-5-3-4.5-3-4.5zm-3 6s-2.5 1-4.5 4H7s2-2 3.5-2.5l1 .5s-1.5-1-2-2h1zm1 0l1 .5s-1 2.5-4 4h1.5s2-2 3.5-3l-2-1.5z" />
    </svg>
  ),
  'HTML/CSS': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#e44d26" strokeWidth="2">
      <path d="M4 2l1.5 18L12 22l6.5-2L20 2H4z" />
      <path d="M8 7h8l-.5 5.5L12 14l-3.5-1.5-.2-2H10l.1 1L12 12l1.9-.5.1-1.5H7.5L7 7z" fill="#e44d26" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="#47a248">
      <path d="M12 2C7 7.5 6 13.5 8 20l1 1 1-1c2-4 2-7 2-10 0 3 1 6 3 10l1 1 1-1c1.5-5 .5-11-5-18z" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f05032" strokeWidth="2">
      <path d="M12 2l10 10-10 10L2 12 12 2z" />
      <circle cx="12" cy="8" r="2" />
      <circle cx="12" cy="16" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <path d="M12 10v4" strokeWidth="1.5" />
    </svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" fill="#336791">
      <ellipse cx="12" cy="6" rx="9" ry="3" />
      <path d="M3 6v6c0 1.7 4 3 9 3s9-1.3 9-3V6" />
      <path d="M3 12v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  ),
};

export default function TechIcons() {
  return (
    <div className={styles.container} aria-hidden="true">
      {TECHS.map((tech) => (
        <div
          key={tech.name}
          className={styles.orbiter}
          style={{
            '--r': `${tech.r}px`,
            '--speed': `${tech.speed}s`,
            '--delay': `${tech.delay}s`,
          }}
        >
          <div className={styles.icon} style={{ '--color': tech.color }}>
            {ICON_SVGS[tech.name]}
          </div>
        </div>
      ))}
    </div>
  );
}
