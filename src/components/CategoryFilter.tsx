import React from 'react';
import { Code, Image, Video, Cpu, Database, Zap, Globe, Layers } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
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

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => {
        const IconComponent = categoryIcons[category] || Cpu;
        const isSelected = selectedCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{category}</span>
          </button>
        );
      })}
    </div>
  );
};