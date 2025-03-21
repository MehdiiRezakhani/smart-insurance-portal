import React, { useEffect } from 'react';
import { ApplicationList } from '../components/ApplicationList';
import { useQuery } from '@tanstack/react-query';
import { fetchApplications } from '../api/insurance';
import { useStore } from '../store/useStore';

export const Submissions: React.FC = () => {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications
  });

  const setColumns = useStore((state) => state.setColumns);

  useEffect(() => {
    if (applications?.columns) {
      setColumns(
        applications.columns.map((col) => ({
          id: col,
          label: col.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
          visible: true,
        }))
      );
    }
  }, [applications, setColumns]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading applications. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ApplicationList applications={applications?.data || []} />
      </div>
    </div>
  );
};