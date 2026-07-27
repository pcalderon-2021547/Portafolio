import { createContext, useContext, useState, useEffect } from 'react';
import es from '../data/translations/es';
import en from '../data/translations/en';
import fr from '../data/translations/fr';
import pt from '../data/translations/pt';
import de from '../data/translations/de';

const translations = { es, en, fr, pt, de };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const changeLang = (newLang) => setLang(newLang);

  return (
    <LanguageContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
}
