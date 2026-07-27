import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../../context/LanguageContext';
import { personalData } from '../../../data/personal';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import LanguageSelector from '../../ui/LanguageSelector/LanguageSelector';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/resume', label: t.nav.resume },
    { to: '/projects', label: t.nav.projects },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <img src={personalData.profileImage} alt={personalData.name} className={styles.logoImg} />
        </NavLink>
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              onClick={() => setIsOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.right}>
          <LanguageSelector />
          <ThemeToggle />
          <button className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setIsOpen(!isOpen)} aria-label={t.nav.menu}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
