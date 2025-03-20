import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InsuranceForm, FormField } from '../types/insurance';
import { ClipboardCheck, X, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  form: InsuranceForm;
  onSubmit: (data: any) => Promise<void>;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export const DynamicForm: React.FC<Props> = ({ form, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
  const watchedValues = watch();

  const shouldShowField = (field: FormField): boolean => {
    if (!field.dependsOn) return true;
    return watchedValues[field.dependsOn.field] === field.dependsOn.value;
  };

  const onSubmitHandler = async (data: any) => {
    try {
      setStatus({ type: null, message: '' });
      await onSubmit(data);
      setStatus({
        type: 'success',
        message: 'Form submitted successfully!'
      });
      reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred while submitting the form. Please try again.'
      });
    }
  };

  const dismissStatus = () => {
    setStatus({ type: null, message: '' });
  };

  const renderField = (field: FormField) => {
    if (!shouldShowField(field)) return null;

    const fieldError = errors[field.id];
    const errorMessage = fieldError?.message as string;

    const commonClasses = clsx(
      'w-full p-2 border rounded-md transition-colors duration-200',
      'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      {
        'border-red-300': fieldError,
        'border-gray-300': !fieldError
      }
    );

    switch (field.type) {
      case 'select':
        return (
          <div className="space-y-1">
            <select
              {...register(field.id, {
                required: field.required ? 'This field is required' : false
              })}
              className={commonClasses}
              aria-invalid={!!fieldError}
              aria-describedby={fieldError ? `${field.id}-error` : undefined}
            >
              <option value="">Select...</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldError && (
              <p
                id={`${field.id}-error`}
                className="text-sm text-red-600"
                role="alert"
              >
                {errorMessage}
              </p>
            )}
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register(field.id, {
                    required: field.required ? 'This field is required' : false
                  })}
                  value={option}
                  className="text-blue-500 focus:ring-blue-500"
                  aria-invalid={!!fieldError}
                  aria-describedby={fieldError ? `${field.id}-error` : undefined}
                />
                <span>{option}</span>
              </label>
            ))}
            {fieldError && (
              <p
                id={`${field.id}-error`}
                className="text-sm text-red-600"
                role="alert"
              >
                {errorMessage}
              </p>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-1">
            <input
              type={field.type}
              {...register(field.id, {
                required: field.required ? 'This field is required' : false
              })}
              className={commonClasses}
              aria-invalid={!!fieldError}
              aria-describedby={fieldError ? `${field.id}-error` : undefined}
            />
            {fieldError && (
              <p
                id={`${field.id}-error`}
                className="text-sm text-red-600"
                role="alert"
              >
                {errorMessage}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-6">
          <ClipboardCheck className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">{form.title}</h2>
        </div>

        {status.type && (
          <div
            className={clsx(
              'mb-6 p-4 rounded-md flex justify-between items-center',
              {
                'bg-green-50 text-green-800': status.type === 'success',
                'bg-red-50 text-red-800': status.type === 'error'
              }
            )}
            role="alert"
          >
            <span>{status.message}</span>
            <button
              type="button"
              onClick={dismissStatus}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Dismiss message"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="space-y-4">
          {form.fields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-1" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            'mt-6 w-full flex items-center justify-center',
            'py-2 px-4 rounded-md text-white transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            {
              'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500': !isSubmitting,
              'bg-blue-400 cursor-not-allowed': isSubmitting
            }
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  );
};