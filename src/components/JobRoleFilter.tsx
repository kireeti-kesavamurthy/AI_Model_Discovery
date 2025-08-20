import React from 'react';
import { Users, TrendingUp, Shield, Cog, PieChart, Building, Zap, Briefcase } from 'lucide-react';

interface JobRoleFilterProps {
  functions: string[];
  selectedFunction: string;
  onFunctionChange: (func: string) => void;
}

const functionIcons: { [key: string]: any } = {
  'All': Building,
  'Marketing & Sales': TrendingUp,
  'Customer Service': Shield,
  'Human Resources': Users,
  'Finance & Accounting': PieChart,
  'Supply Chain & Operations': Cog,
  'Research & Development': Zap,
  'Drug Discovery & Design': Zap,
  'Preclinical & Clinical Trials': Shield,
  'Manufacturing & Operations': Cog,
  'Post-Market & Commercial': TrendingUp,
  'Planning & Sourcing': PieChart,
  'Manufacturing & Production': Cog,
  'Logistics & Fulfillment': Cog,
  'Reverse Logistics & Returns': Cog,
  'Financial Analysis & Planning': PieChart,
  'Investment & Portfolio Management': TrendingUp,
  'Risk Management & Compliance': Shield,
  'Accounting & Auditing': PieChart,
  'Customer Service & Banking': Users,
  'Underwriting & Risk Assessment': Shield,
  'Claims Processing & Management': Cog,
  'Customer Service & Engagement': Users,
  'Marketing & Product Development': TrendingUp,
  'Compliance & Regulation': Shield,
  'Lending & Credit Scoring': PieChart,
  'Product Development & Innovation': Briefcase,
  'Content Creation & Curriculum Design': Briefcase,
  'Personalized Tutoring & Student Support': Users,
  'Assessment & Grading': Shield,
  'Corporate & Professional Training': Briefcase,
};

export const JobRoleFilter: React.FC<JobRoleFilterProps> = ({
  functions,
  selectedFunction,
  onFunctionChange
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-purple-600" />
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
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:bg-purple-50'
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