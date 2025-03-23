import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Car, Home as HomeIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../store/LanguageContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedInsuranceType = useStore((state) => state.setSelectedInsuranceType);
  const { t } = useTranslation();
  const { direction } = useLanguage();

  const insuranceTypes = [
    {
      type: 'health_insurance_application',
      title: t('home.healthInsurance'),
      icon: Heart,
      description: t('home.healthDesc'),
      color: 'bg-rose-500',
      hoverColor: 'hover:bg-rose-600',
    },
    {
      type: 'car_insurance_application',
      title: t('home.carInsurance'),
      icon: Car,
      description: t('home.carDesc'),
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      type: 'home_insurance_application',
      title: t('home.homeInsurance'),
      icon: HomeIcon,
      description: t('home.homeDesc'),
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
    },
  ];

  const handleInsuranceSelect = (type: string) => {
    setSelectedInsuranceType(type);
    navigate(`/forms/${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('home.subtitle')}
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${direction === 'rtl' ? 'md:rtl:grid-flow-row-dense' : ''}`}>
          {insuranceTypes.map(({ type, title, icon: Icon, description, color, hoverColor }) => (
            <button
              key={type}
              onClick={() => handleInsuranceSelect(type)}
              className={`${color} ${hoverColor} transition-all transform hover:scale-105 text-white rounded-xl p-8 text-left rtl:text-right shadow-lg`}
            >
              <Icon className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-white/90">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};