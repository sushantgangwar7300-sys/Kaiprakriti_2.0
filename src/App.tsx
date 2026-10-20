/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GeminiChatbot } from './components/GeminiChatbot';

// 5 Main Pages + Admin Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  // Current page state
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [prefilledServiceId, setPrefilledServiceId] = useState<string>('ghg-accounting');
  const [targetBlogSlug, setTargetBlogSlug] = useState<string | undefined>(undefined);

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kai_prakriti_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Ensure clean, business-friendly light styling on document element
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Track Google Analytics pageviews on route/page state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      const pagePath = currentPage === 'home' ? '/' : `/${currentPage}`;
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', 'G-KKZN6CKBR3', {
        page_path: pagePath,
        page_title: `Kai Prakriti — ${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`,
      });
    }
  }, [currentPage]);

  const handleNavigate = (page: PageId, extraParam?: string) => {
    if (page === 'contact' && extraParam) {
      setPrefilledServiceId(extraParam);
    }
    if (page === 'blog' && extraParam) {
      setTargetBlogSlug(extraParam);
    } else if (page === 'blog') {
      setTargetBlogSlug(undefined);
    }
    if (page === 'services' && extraParam) {
      setPrefilledServiceId(extraParam);
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      localStorage.setItem('kai_prakriti_admin_auth', 'true');
    } catch (e) {}
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('kai_prakriti_admin_auth');
    } catch (e) {}
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#2F3020] font-sans selection:bg-[#D96846]/30 selection:text-[#2F3020] flex flex-col">
      
      {/* 1. Primary Navigation Bar (Centric Consulting Style) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* 2. Dynamic Page View Routing */}
      <main className="w-full max-w-full flex-1 overflow-x-hidden min-h-[70vh]">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            theme="verdant"
            mode="light"
            onNavigate={handleNavigate}
            preselectedServiceId={prefilledServiceId}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            theme="verdant"
            mode="light"
            onNavigate={handleNavigate}
            targetPostSlug={targetBlogSlug}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            theme="verdant"
            mode="light"
            onNavigate={handleNavigate}
            prefilledServiceId={prefilledServiceId}
          />
        )}

        {currentPage === 'admin-login' && (
          <AdminLoginPage
            theme="verdant"
            mode="light"
            onLoginSuccess={handleAdminLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin' && (
          isAdminAuthenticated ? (
            <AdminDashboardPage
              theme="verdant"
              mode="light"
              onLogout={handleAdminLogout}
              onNavigate={handleNavigate}
            />
          ) : (
            <AdminLoginPage
              theme="verdant"
              mode="light"
              onLoginSuccess={handleAdminLoginSuccess}
              onNavigate={handleNavigate}
            />
          )
        )}
      </main>

      {/* 3. Executive AI ESG Copilot Assistant */}
      <GeminiChatbot
        theme="verdant"
        mode="light"
        onNavigateToService={(serviceId) => handleNavigate('services', serviceId)}
      />

      {/* 4. Business-Friendly Footer with Ashutosh Rathor Attribution */}
      <Footer
        onNavigate={handleNavigate}
      />

    </div>
  );
}
