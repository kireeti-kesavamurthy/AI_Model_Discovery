import React from 'react';
import { Layers, Briefcase, User } from 'lucide-react';

interface NavigationTabsProps {
  activeView: 'category' | 'business';
  onViewChange: (view: 'category' | 'business') => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeView,
  onViewChange
}) => {
  const tabs = [
    { id: 'category' as const, label: 'By Category', icon: Layers, color: 'indigo' },
    { id: 'business' as const, label: 'By Business Function', icon: Briefcase, color: 'green' }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
      {tabs.map((tab) => {
        const isActive = activeView === tab.id;
        const IconComponent = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              isActive
                ? `bg-${tab.color}-600 text-white shadow-sm`
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};