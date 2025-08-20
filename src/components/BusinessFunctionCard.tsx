import React from 'react';
import { Briefcase, Zap, ExternalLink } from 'lucide-react';
import { BusinessFunctionData } from '../utils/csvParser';

interface BusinessFunctionCardProps {
  data: BusinessFunctionData;
}

export const BusinessFunctionCard: React.FC<BusinessFunctionCardProps> = ({ data }) => {
  // Parse HTML content and convert <br> tags to line breaks
  const formatRecommendedTools = (tools: string) => {
    return tools
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '') // Remove other HTML tags
      .split('\n')
      .filter(line => line.trim())
      .map((line, index) => (
        <div key={index} className="mb-2 last:mb-0">
          {line.trim()}
        </div>
      ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-green-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
            <Briefcase className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{data.keyApplication}</h3>
          </div>
        </div>
        <div className="p-1 bg-green-100 rounded-full">
          <Zap className="w-4 h-4 text-green-600" />
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recommended AI Tools & Models:</h4>
        <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
          {formatRecommendedTools(data.recommendedTools)}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
          {data.keyApplication}
        </span>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1 hover:bg-green-50 px-2 py-1 rounded-md transition-colors">
          <span>Learn more</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};