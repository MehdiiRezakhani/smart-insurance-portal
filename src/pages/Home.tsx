import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Car, Home as HomeIcon } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedInsuranceType = useStore((state) => state.setSelectedInsuranceType);

  const insuranceTypes = [
    {
      type: 'health_insurance_application',
      title: 'Health Insurance',
      icon: Heart,
      description: 'Comprehensive health coverage for you and your family',
      color: 'bg-rose-500',
      hoverColor: 'hover:bg-rose-600',
    },
    {
      type: 'car_insurance_application',
      title: 'Car Insurance',
      icon: Car,
      description: 'Protect your vehicle with our comprehensive coverage',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      type: 'home_insurance_application',
      title: 'Home Insurance',
      icon: HomeIcon,
      description: 'Secure your home and belongings',
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
    },
  ];

  const handleInsuranceSelect = (type: string) => {
    setSelectedInsuranceType(type);
    navigate(`/forms/${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Insurance Plan
          </h1>
          <p className="text-lg text-gray-600">
            Select the type of insurance you're interested in
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insuranceTypes.map(({ type, title, icon: Icon, description, color, hoverColor }) => (
            <button
              key={type}
              onClick={() => handleInsuranceSelect(type)}
              className={`${color} ${hoverColor} transition-all transform hover:scale-105 text-white rounded-xl p-8 text-left shadow-lg`}
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