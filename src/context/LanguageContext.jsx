import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n/i18n.js'; // Initialize i18next

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { t, i18n } = useTranslation();

  // Dynamic DOM language mutation (from the a11y guide)
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en';
  }, [i18n.resolvedLanguage]);

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('sahayak_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language: i18n.resolvedLanguage || 'en', setLanguage, t }}>
      {/* React Suspense handles the loading state while the JSON chunks download */}
      <React.Suspense fallback={<div className="p-4 text-center">Loading language...</div>}>
        {children}
      </React.Suspense>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
