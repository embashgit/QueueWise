import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  ClipboardListIcon,
  MenuAlt4Icon,
  CogIcon,
  ChevronLeftIcon,
  LogoutIcon,
} from '@heroicons/react/solid';
import { useAuth } from '@/components/Provider/AuthContext';

interface QueueSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const QueueSidebar: React.FC<QueueSidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const router = useRouter();
  const { user } = useAuth();

  // Define navigation items for each role
  const navItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    ...(user?.role === 'user'
      ? [{ name: 'Joined Queues', href: '/joined', icon: ClipboardListIcon }]
      : []),
    ...(user?.role === 'admin'
      ? [
          { name: 'Queue Control', href: '/[queueId]/control', icon: MenuAlt4Icon },
          { name: 'Queue Settings', href: '/settings', icon: CogIcon },
        ]
      : []),
    { name: 'Logout', href: '/logout', icon: LogoutIcon },
  ];

  // Automatically collapse the sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isCollapsed) {
        toggleSidebar(); // Collapse the sidebar
      } else if (window.innerWidth >= 768 && isCollapsed) {
        toggleSidebar(); // Expand the sidebar on larger screens
      }
    };

    // Set initial state based on the current window size
    handleResize();

    // Add event listener to monitor window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside
      className={`h-screen text-black flex flex-col border-r transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full ${
              isCollapsed ? 'w-10 h-10' : 'w-12 h-12'
            }`}
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/stability/07870228-95dd-4135-8df8-52fee4f8ea6f.png")',
            }}
          ></div>
          {!isCollapsed && (
            <div>
              <h1 className="text-[#0d151c] font-DM text-base font-medium leading-normal ">
                {user?.name}
              </h1>
              <p className="text-[#49779c] text-sm font-normal leading-normal">View Profile</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-4 py-9 space-y-6">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div aria-disabled={item.name === 'Queue Control'}
              className={`flex items-center p-4 text-base font-medium rounded-lg transition-colors ${
                router.pathname === item.href
                  ? 'bg-gray-300 text-black'
                  : 'text-gray-600 hover:bg-gray-300 hover:text-black'
              }`}
            >
              <item.icon className="h-6 w-6" />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Collapsible Toggle Button */}
      <div className="flex items-center justify-center p-4">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400 transition"
        >
          <ChevronLeftIcon
            className={`h-6 w-6 text-black transform ${
              isCollapsed ? 'rotate-180' : ''
            } transition-transform duration-300`}
          />
        </button>
      </div>
    </aside>
  );
};

export default QueueSidebar;
