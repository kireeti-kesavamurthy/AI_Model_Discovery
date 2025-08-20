import React, { useState } from 'react';
import { ExternalLink, Zap, Code, Image, Video, Music, Database, Cpu, Globe, Lock, DollarSign, ChevronDown, ChevronUp, Briefcase, User, Target } from 'lucide-react';
import { EnhancedModel } from '../utils/csvParser';

interface EnhancedModelCardProps {
  model: EnhancedModel;
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

export const EnhancedModelCard: React.FC<EnhancedModelCardProps> = ({ model }) => {
  const [showJobRoles, setShowJobRoles] = useState(false);
  const IconComponent = getCategoryIcon(model.category);
  const hasJobRoles = model.jobRoles && model.jobRoles.length > 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-indigo-200 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <IconComponent className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">{model.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{model.developer}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPricingColor(model.pricing)}`}>
            {model.pricing.includes('Open Source') ? 'Open Source' : 
             model.pricing.includes('Free') ? 'Free' : 
             model.pricing.includes('Paid') ? 'Paid' : 'Mixed'}
          </span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Best for:</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{model.suitableFor}</p>
        </div>
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
          {model.description}
        </p>

        {/* Business Functions */}
        {model.businessFunctions && model.businessFunctions.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              Business Functions:
            </h4>
            <div className="flex flex-wrap gap-1">
              {model.businessFunctions.map((func, index) => (
                <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md border border-green-200">
                  {func}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
            {model.category}
          </span>
          <div className="flex items-center space-x-2">
            {hasJobRoles && (
              <button
                onClick={() => setShowJobRoles(!showJobRoles)}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors"
              >
                <User className="w-3 h-3" />
                <span>Job Roles</span>
                {showJobRoles ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors">
              <span>Learn more</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Job Roles Expansion */}
      {showJobRoles && hasJobRoles && (
        <div className="border-t border-gray-100 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2 text-purple-600" />
            Relevant Job Roles & Use Cases
          </h4>
          <div className="space-y-3">
            {model.jobRoles!.map((jobRole, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900 text-sm">{jobRole.jobRole}</span>
                    <span className="text-xs text-gray-500 ml-2">• {jobRole.businessFunction}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{jobRole.useCase}</p>
                {jobRole.benefits && (
                  <p className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                    <strong>Benefits:</strong> {jobRole.benefits}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};