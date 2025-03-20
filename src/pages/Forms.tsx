import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { DynamicForm } from '../components/DynamicForm';
import { useQuery } from '@tanstack/react-query';
import { fetchFormStructure, submitForm } from '../api/insurance';
import { useStore } from '../store/useStore';
import { ArrowLeft } from 'lucide-react';

export const Forms: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const selectedType = useStore((state) => state.selectedInsuranceType);
  const setSelectedInsuranceType = useStore((state) => state.setSelectedInsuranceType);
  
  const { data: forms, isLoading } = useQuery({
    queryKey: ['forms'],
    queryFn: fetchFormStructure
  });

  const handleReturnHome = () => {
    // Clear the selected insurance type
    setSelectedInsuranceType(null);
    // Navigate back to home
    navigate('/');
  };

  if (!type && !selectedType) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!forms) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">No forms available</p>
        </div>
      </div>
    );
  }

  const currentType = type || selectedType;
  const filteredForms = forms.filter(form => 
    form.formId && currentType && 
    form.formId.toLowerCase() === currentType.toLowerCase()
  );
  
  if (filteredForms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600">No forms found for {currentType} insurance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={handleReturnHome}
          className="mb-8 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 group"
          aria-label="Return to home page"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          Return to Home
        </button>
        
        <div className="space-y-8">
          {filteredForms.map((form, index) => (
            <DynamicForm key={index} form={form} onSubmit={submitForm} />
          ))}
        </div>
      </div>
    </div>
  );
};