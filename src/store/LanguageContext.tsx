import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isRTL } from '../i18n';

type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: string;
  direction: Direction;
  changeLanguage: (lang: string) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [direction, setDirection] = useState<Direction>(isRTL(i18n.language) ? 'rtl' : 'ltr');

  // Update direction when language changes
  useEffect(() => {
    const dir = isRTL(language) ? 'rtl' : 'ltr';
    setDirection(dir);
    
    // Update HTML dir attribute
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Add appropriate font for Persian
    if (language === 'fa') {
      document.documentElement.classList.add('font-persian');
    } else {
      document.documentElement.classList.remove('font-persian');
    }
  }, [language]);

  // Change language
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  // Toggle between English and Persian
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fa' : 'en';
    changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 