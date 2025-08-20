import React from 'react';
import { TrendingUp, Zap, Globe, Users } from 'lucide-react';

interface StatsOverviewProps {
  totalModels: number;
  categories: number;
  openSourceCount: number;
  paidCount: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalModels,
  categories,
  openSourceCount,
  paidCount
}) => {
  const stats = [
    {
      label: 'Total Models',
      value: totalModels,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Categories',
      value: categories,
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Open Source',
      value: openSourceCount,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Commercial',
      value: paidCount,
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};