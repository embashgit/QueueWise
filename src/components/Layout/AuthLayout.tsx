// src/components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer/Footer';
import QueueSidebar from '@/components/Layout/SideBar'; // Import the QueueSidebar

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } bg-gray-100 text-white z-10 transition-all duration-300`}
      >
        <QueueSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 left-0 bg-white right-0 h-16 text-black z-20">
          <Header type="auth" />
        </div>

        {/* Main content (scrollable) */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
