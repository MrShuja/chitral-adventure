import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  UsersIcon,
  NewspaperIcon,
  ChartBarIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import BlogManager from './BlogManager';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');

  const navigation = [
    { name: 'Analytics', icon: ChartBarIcon, id: 'analytics' },
    { name: 'Blog Posts', icon: NewspaperIcon, id: 'blog' },
    { name: 'Subscribers', icon: UsersIcon, id: 'subscribers' },
    { name: 'Settings', icon: CogIcon, id: 'settings' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'blog':
        return <BlogManager />;
      case 'subscribers':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Subscribers</h2>
            {/* Subscriber management content */}
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            {/* Settings content */}
          </div>
        );
      case 'analytics':
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Analytics cards */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm font-medium">Total Views</h3>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm font-medium">Subscribers</h3>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm font-medium">Comments</h3>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col pt-5 pb-4">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
              </div>
              <nav className="mt-8 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.id)}
                    className={`${
                      activeTab === item.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                  >
                    <item.icon
                      className={`${
                        activeTab === item.id
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
