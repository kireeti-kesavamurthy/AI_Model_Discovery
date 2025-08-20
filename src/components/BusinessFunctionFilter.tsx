import React from 'react';
import { Briefcase, Users, TrendingUp, Shield, Cog, PieChart, Building, Zap } from 'lucide-react';

interface BusinessFunctionFilterProps {
  functions: string[];
  selectedFunction: string;
  onFunctionChange: (func: string) => void;
}

const functionIcons: { [key: string]: any } = {
  'All': Building,
  'Marketing': TrendingUp,
  'Sales': Users,
  'Customer Service': Shield,
  'Operations': Cog,
  'Finance': PieChart,
  'HR': Users,
  'IT': Zap,
  'Product Management': Briefcase,
  'Content Creation': TrendingUp,
  'Data Analysis': PieChart,
  'Software Development': Cog,
  'Research': Shield,
  'Design': Briefcase,
  'Legal': Shield,
  'Education': Users,
  'Healthcare': Shield,
};

export const BusinessFunctionFilter: React.FC<BusinessFunctionFilterProps> = ({
  functions,
  selectedFunction,
  onFunctionChange
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
        Filter by Business Function
      </h3>
      <div className="flex flex-wrap gap-2">
        {functions.map((func) => {
          const IconComponent = functionIcons[func] || Building;
          const isSelected = selectedFunction === func;
          
          return (
            <button
              key={func}
              onClick={() => onFunctionChange(func)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{func}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};