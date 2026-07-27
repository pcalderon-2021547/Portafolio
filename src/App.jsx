import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Duck from './components/ui/Duck/Duck';
import styles from './App.module.css';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Resume = lazy(() => import('./pages/Resume/Resume'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '60vh', color: 'var(--neon-green)', fontFamily: 'Fira Code, monospace',
      fontSize: '1.2rem'
    }}>
      <span>Cargando...</span>
    </div>
  );
}

export default function App() {
  return (
    <div className={styles.main}>
      <a href="#main-content" className={styles.skipLink}>
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className={styles.content}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Duck />
    </div>
  );
}
