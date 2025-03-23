import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileSpreadsheet, ClipboardList, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../store/ThemeContext';
import { useLanguage } from '../store/LanguageContext';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/20 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            className="flex items-center"
          >
            <FileSpreadsheet className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              {t('common.appName')}
            </span>
          </NavLink>
          
          <div className="flex items-center">
            <nav className="flex space-x-8 mr-6 rtl:space-x-reverse">
              <NavLink
                to="/forms"
                className={({ isActive }) =>
                  `flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`
                }
              >
                <ClipboardList className="w-5 h-5" />
                <span>{t('common.forms')}</span>
              </NavLink>
              
              <NavLink
                to="/submissions"
                className={({ isActive }) =>
                  `flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`
                }
              >
                <FileSpreadsheet className="w-5 h-5" />
                <span>{t('common.submissions')}</span>
              </NavLink>
            </nav>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle language"
              >
                <Languages className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};