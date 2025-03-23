import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('notFound.title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('notFound.message')}
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          {t('notFound.goHome')}
        </button>
      </div>
    </div>
  );
};