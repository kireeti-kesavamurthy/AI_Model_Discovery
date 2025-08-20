import React from 'react';
import { ExternalLink, Zap, Code, Image, Video, Music, Database, Cpu, Globe, Lock, DollarSign } from 'lucide-react';

interface ModelCardProps {
  name: string;
  developer: string;
  suitableFor: string;
  description: string;
  pricing: string;
  category: string;
}

const getCategoryIcon = (category: string) => {
  if (category.includes('LLM') || category.includes('Text')) return Code;
  if (category.includes('Image')) return Image;
  if (category.includes('Video') || category.includes('Audio')) return Video;
  if (category.includes('3D')) return Cpu;
  if (category.includes('Code')) return Code;
  if (category.includes('Data')) return Database;
  if (category.includes('Drug') || category.includes('Materials')) return Zap;
  if (category.includes('Browser')) return Globe;
  return Cpu;
};

const getPricingColor = (pricing: string) => {
  if (pricing.toLowerCase().includes('free') || pricing.toLowerCase().includes('open source')) {
    return 'bg-green-100 text-green-800 border-green-200';
  }
  if (pricing.toLowerCase().includes('paid')) {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  }
  return 'bg-gray-100 text-gray-800 border-gray-200';
};

export const ModelCard: React.FC<ModelCardProps> = ({
  name,
  developer,
  suitableFor,
  description,
  pricing,
  category
}) => {
  const IconComponent = getCategoryIcon(category);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-indigo-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
            <IconComponent className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">{developer}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPricingColor(pricing)}`}>
          {pricing.includes('Open Source') ? 'Open Source' : 
           pricing.includes('Free') ? 'Free' : 
           pricing.includes('Paid') ? 'Paid' : 'Mixed'}
        </span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Best for:</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{suitableFor}</p>
      </div>
      
      <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
          {category}
        </span>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors">
          <span>Learn more</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};