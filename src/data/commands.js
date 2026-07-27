import { personalData } from './personal';
import { projects } from './projects';
import { socialLinks } from './social';

function buildResponse(lang) {
  const isEs = lang === 'es';

  return {
    help: {
      title: isEs ? 'Comandos disponibles:' : 'Available commands:',
      lines: [
        { cmd: 'help', desc: isEs ? 'Muestra esta ayuda' : 'Shows this help' },
        { cmd: 'about', desc: isEs ? 'Información sobre mí' : 'About me' },
        { cmd: 'skills', desc: isEs ? 'Mis habilidades técnicas' : 'My technical skills' },
        { cmd: 'projects', desc: isEs ? 'Proyectos realizados' : 'My projects' },
        { cmd: 'contact', desc: isEs ? 'Información de contacto' : 'Contact information' },
        { cmd: 'social', desc: isEs ? 'Redes sociales' : 'Social links' },
        { cmd: 'game', desc: isEs ? 'Inicia Space Invaders' : 'Launch Space Invaders' },
        { cmd: 'clear', desc: isEs ? 'Limpia la terminal' : 'Clears terminal' },
      ],
    },
    about: isEs
      ? `Soy ${personalData.name}, estudiante de 6to grado de Perito en Informática en el Centro Educativo Técnico Laboral Kinal. Apasionado por la tecnología, la música y el deporte, con 1 año de experiencia en desarrollo full stack. Me gusta liderar, organizar y trabajar en equipo.`
      : `I'm ${personalData.name}, a 6th year Computer Science student at Kinal Technical Labor School. Passionate about technology, music and sports, with 1 year of full stack development experience. I enjoy leading, organizing and working in teams.`,
    skills: isEs
      ? [
          'JavaScript / React + Vite',
          'Java (JSP/Servlets / Spring Boot)',
          'HTML + CSS',
          'Node.js + Express',
          'MongoDB / PostgreSQL / SQL',
          'Git',
          'Redes y Soporte Técnico',
          'Office (Word, Excel, PowerPoint)',
        ]
      : [
          'JavaScript / React + Vite',
          'Java (JSP/Servlets / Spring Boot)',
          'HTML + CSS',
          'Node.js + Express',
          'MongoDB / PostgreSQL / SQL',
          'Git',
          'Networking & Technical Support',
          'Office (Word, Excel, PowerPoint)',
        ],
    projects: isEs
      ? projects.map((p, i) => `${i + 1}. ${p.title} — ${p.descEs}`).join('\n')
      : projects.map((p, i) => `${i + 1}. ${p.titleEn} — ${p.descEn}`).join('\n'),
    contact: isEs
      ? `📧 ${personalData.details.email}`
      : `📧 ${personalData.details.email}`,
    social: isEs
      ? `📸 Instagram: ${socialLinks.instagram.url}\n💬 WhatsApp: ${socialLinks.whatsapp.url}\n🔗 LinkedIn: ${socialLinks.linkedin.url}\n🐙 GitHub: ${socialLinks.github.url}`
      : `📸 Instagram: ${socialLinks.instagram.url}\n💬 WhatsApp: ${socialLinks.whatsapp.url}\n🔗 LinkedIn: ${socialLinks.linkedin.url}\n🐙 GitHub: ${socialLinks.github.url}`,
    game: isEs
      ? '🎮 Iniciando Space Invaders... Usa ← → para mover, SPACE para disparar, ESC para salir.'
      : '🎮 Launching Space Invaders... Use ← → to move, SPACE to shoot, ESC to exit.',
    unknown: isEs
      ? '⚠️ Comando no reconocido. Escribe "help" para ver los comandos disponibles.'
      : '⚠️ Unknown command. Type "help" to see available commands.',
    welcome: isEs
      ? ['╔══════════════════════════════════╗', '║  Bienvenido a TermOS v1.0         ║', '║  Portfolio interactivo de Pablo   ║', '║  Escribe "help" para empezar      ║', '╚══════════════════════════════════╝']
      : ['╔══════════════════════════════════╗', '║  Welcome to TermOS v1.0           ║', '║  Pablo\'s interactive portfolio    ║', '║  Type "help" to get started        ║', '╚══════════════════════════════════╝'],
  };
}

export function getCommandResponse(command, lang) {
  const r = buildResponse(lang);
  return r[command] || r.unknown;
}

export function getWelcome(lang) {
  return buildResponse(lang).welcome;
}
