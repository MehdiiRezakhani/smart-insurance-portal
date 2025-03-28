import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './store/ThemeContext';
import { LanguageProvider } from './store/LanguageContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Forms } from './pages/Forms';
import { Submissions } from './pages/Submissions';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/forms/:type" element={<Forms />} />
                <Route path="/submissions" element={<Submissions />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;