import { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { projects } from '../../data/projects';
import SEO from '../../components/ui/SEO/SEO';
import ProjectCard from '../../components/ui/ProjectCard/ProjectCard';
import ProjectModal from '../../components/ui/ProjectModal/ProjectModal';
import styles from './Projects.module.css';

export default function Projects() {
  const { t, lang } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className={styles.projects}>
      <SEO title={t.projects.title}
        description={`${projects.length} proyectos: ${projects.map(p => p.title).join(', ')}`}
        lang={lang} />
      <h1 className="section-title green glow-text-green">{t.projects.title}</h1>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index}
            onOpenModal={setSelectedProject} />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} lang={lang} t={t}
          onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
