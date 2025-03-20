import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileSpreadsheet, ClipboardList } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            className="flex items-center"
          >
            <FileSpreadsheet className="w-8 h-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Insurance Portal
            </span>
          </NavLink>
          
          <nav className="flex space-x-8">
            <NavLink
              to="/forms"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              <ClipboardList className="w-5 h-5" />
              <span>Forms</span>
            </NavLink>
            
            <NavLink
              to="/submissions"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              <FileSpreadsheet className="w-5 h-5" />
              <span>Submissions</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};