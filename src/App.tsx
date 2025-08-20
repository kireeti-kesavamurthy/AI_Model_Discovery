import React, { useState, useEffect, useMemo } from 'react';
import { Brain, Sparkles, Filter, BarChart3, Layers } from 'lucide-react';
import { EnhancedModelCard } from './components/EnhancedModelCard';
import { NavigationTabs } from './components/NavigationTabs';
import { SearchBar } from './components/SearchBar';
import { StatsOverview } from './components/StatsOverview';
import { BusinessFunctionCard } from './components/BusinessFunctionCard';
import { LeftNavigation } from './components/LeftNavigation';
import { parseCSVData, parseBusinessFunctionData as parseJobRoleData, EnhancedModel, BusinessFunctionData } from './utils/csvParser';

function App() {
  const [models, setModels] = useState<EnhancedModel[]>([]);
  const [businessFunctionData, setBusinessFunctionData] = useState<BusinessFunctionData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBusinessFunction, setSelectedBusinessFunction] = useState('All');
  const [activeView, setActiveView] = useState<'category' | 'business'>('category');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all CSV files
        const [modelsResponse, businessFunctionResponse] = await Promise.all([
          fetch('/data/GenAI_Model_details.csv'),
          fetch('/data/Models_job_roles.csv')
        ]);
        
        const [modelsText, businessFunctionText] = await Promise.all([
          modelsResponse.text(),
          businessFunctionResponse.text()
        ]);
        
        const parsedModels = parseCSVData(modelsText);
        const parsedBusinessFunctions = parseJobRoleData(businessFunctionText);
        const enhancedModels = parsedModels.map(model => ({ ...model }));
        
        setModels(enhancedModels);
        setBusinessFunctionData(parsedBusinessFunctions);
        
        console.log('Loaded models:', enhancedModels.length);
        console.log('Loaded business functions:', parsedBusinessFunctions.length);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(models.map(model => model.category)));
    return ['All', ...uniqueCategories.filter(cat => cat && cat !== 'Other')];
  }, [models]);

  const businessFunctions = useMemo(() => {
    const uniqueFunctions = Array.from(new Set(businessFunctionData.map(item => item.businessFunction)));
    return ['All', ...uniqueFunctions.filter(func => func)];
  }, [businessFunctionData]);

  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const matchesSearch = !searchTerm || 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.suitableFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [models, searchTerm, selectedCategory]);

  const filteredBusinessFunctions = useMemo(() => {
    return businessFunctionData.filter(item => {
      const matchesSearch = !searchTerm || 
        item.businessFunction.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keyApplication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.recommendedTools.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBusinessFunction = selectedBusinessFunction === 'All' || 
        item.businessFunction === selectedBusinessFunction;
      
      return matchesSearch && matchesBusinessFunction;
    });
  }, [businessFunctionData, searchTerm, selectedBusinessFunction]);

  const stats = useMemo(() => {
    const openSourceCount = models.filter(model => 
      model.pricing.toLowerCase().includes('open source') || 
      model.pricing.toLowerCase().includes('free')
    ).length;
    
    const paidCount = models.filter(model => 
      model.pricing.toLowerCase().includes('paid')
    ).length;

    return {
      totalModels: models.length,
      categories: categories.length - 1,
      openSourceCount,
      paidCount
    };
  }, [models, categories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Model Discovery Portal</h1>
                <p className="text-gray-600">Explore the latest generative AI models and tools</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
              <span>2025 Edition</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Navigation */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <StatsOverview {...stats} />
            <NavigationTabs
              activeView={activeView}
              onViewChange={setActiveView}
            />
          </div>
          
          <LeftNavigation
            activeView={activeView}
            categories={categories}
            businessFunctions={businessFunctions}
            selectedCategory={selectedCategory}
            selectedBusinessFunction={selectedBusinessFunction}
            onCategoryChange={setSelectedCategory}
            onBusinessFunctionChange={setSelectedBusinessFunction}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-white">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              totalModels={activeView === 'business' ? businessFunctionData.length : models.length}
              filteredCount={activeView === 'business' ? filteredBusinessFunctions.length : filteredModels.length}
            />
          </div>

          <div className="flex-1 overflow-auto p-6">
            {/* Content Grid */}
            {(activeView === 'business' ? filteredBusinessFunctions.length === 0 : filteredModels.length === 0) ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeView === 'business' ? 'No business functions found' : 'No models found'}
                </h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeView === 'business' ? (
                  filteredBusinessFunctions.map((item, index) => (
                    <BusinessFunctionCard
                      key={`${item.businessFunction}-${item.keyApplication}-${index}`}
                      data={item}
                    />
                  ))
                ) : (
                  filteredModels.map((model, index) => (
                    <EnhancedModelCard
                      key={`${model.name}-${index}`}
                      model={model}
                    />
                  ))
                )}
              </div>
            )}

            {/* Footer */}
            <footer className="mt-16 py-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-600">Comprehensive AI Model Database</span>
                </div>
                <p className="text-sm text-gray-500">
                  Discover and compare the latest generative AI models across all categories
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;