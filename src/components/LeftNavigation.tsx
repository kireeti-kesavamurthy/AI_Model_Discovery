import React from 'react';
import { Layers, Briefcase, Code, Image, Video, Cpu, Database, Zap, Globe, Building, TrendingUp, Shield, Cog, PieChart, Users } from 'lucide-react';

interface LeftNavigationProps {
  activeView: 'category' | 'business';
  categories: string[];
  businessFunctions: string[];
  selectedCategory: string;
  selectedBusinessFunction: string;
  onCategoryChange: (category: string) => void;
  onBusinessFunctionChange: (func: string) => void;
}

const categoryIcons: { [key: string]: any } = {
  'All': Layers,
  'Large Language Models': Code,
  'Image Generation': Image,
  'Audio & Video Generation': Video,
  'Code Generation': Code,
  '3D Asset Generation': Cpu,
  'Synthetic Data Generation': Database,
  'Drug Discovery': Zap,
  'Materials Science': Zap,
  'AI Model Building': Cpu,
  'App, Web, and Code Generation': Globe,
  'Conversational AI': Code,
  'AI-Powered Code Generation': Code,
  'Automation & Business Processes': Zap,
  'AI-Powered Web Browsers': Globe,
};

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

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
  activeView,
  categories,
  businessFunctions,
  selectedCategory,
  selectedBusinessFunction,
  onCategoryChange,
  onBusinessFunctionChange
}) => {
  const items = activeView === 'category' ? categories : businessFunctions;
  const selectedItem = activeView === 'category' ? selectedCategory : selectedBusinessFunction;
  const onItemChange = activeView === 'category' ? onCategoryChange : onBusinessFunctionChange;
  const icons = activeView === 'category' ? categoryIcons : functionIcons;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          {activeView === 'category' ? (
            <>
              <Layers className="w-4 h-4 mr-2 text-indigo-600" />
              Categories
            </>
          ) : (
            <>
              <Briefcase className="w-4 h-4 mr-2 text-green-600" />
              Business Functions
            </>
          )}
        </h3>
        
        <div className="space-y-1">
          {items.map((item) => {
            const IconComponent = icons[item] || (activeView === 'category' ? Cpu : Building);
            const isSelected = selectedItem === item;
            const baseColor = activeView === 'category' ? 'indigo' : 'green';
            
            return (
              <button
                key={item}
                onClick={() => onItemChange(item)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                  isSelected
                    ? `bg-${baseColor}-100 text-${baseColor}-900 border-l-4 border-${baseColor}-600`
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent className={`w-4 h-4 flex-shrink-0 ${
                  isSelected ? `text-${baseColor}-600` : 'text-gray-400'
                }`} />
                <span className="truncate">{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};