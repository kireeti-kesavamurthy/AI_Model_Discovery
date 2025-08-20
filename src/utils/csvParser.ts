export interface AIModel {
  name: string;
  developer: string;
  suitableFor: string;
  description: string;
  pricing: string;
  category: string;
}

export interface JobRoleModel {
  modelName: string;
  businessFunction: string;
  jobRole: string;
  useCase: string;
  description: string;
  benefits: string;
}

export interface BusinessFunctionData {
  businessFunction: string;
  keyApplication: string;
  recommendedTools: string;
}

export interface EnhancedModel extends AIModel {
  jobRoles?: JobRoleModel[];
  businessFunctions?: string[];
}

export const parseCSVData = (csvText: string): AIModel[] => {
  const lines = csvText.split('\n');
  const models: AIModel[] = [];
  let currentCategory = '';
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line with proper comma handling
    const columns = parseCSVLine(line);
    
    if (columns.length >= 5) {
      // Check if this is a category header
      if (columns[0] && !columns[1] && !columns[2] && !columns[3] && !columns[4]) {
        currentCategory = columns[0];
        continue;
      }
      
      // Skip empty rows or headers
      if (!columns[0] || columns[0] === 'Model Name (Latest Notable Version)') {
        continue;
      }
      
      models.push({
        name: columns[0] || '',
        developer: columns[1] || '',
        suitableFor: columns[2] || '',
        description: columns[3] || '',
        pricing: columns[4] || '',
        category: currentCategory || 'Other'
      });
    }
  }
  
  return models.filter(model => model.name && model.developer);
};

export const parseJobRolesData = (csvText: string): JobRoleModel[] => {
  const lines = csvText.split('\n');
  const jobRoles: JobRoleModel[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = parseCSVLine(line);
    
    if (columns.length >= 6 && columns[0] && columns[0] !== 'Model Name') {
      jobRoles.push({
        modelName: columns[0] || '',
        businessFunction: columns[1] || '',
        jobRole: columns[2] || '',
        useCase: columns[3] || '',
        description: columns[4] || '',
        benefits: columns[5] || ''
      });
    }
  }
  
  return jobRoles;
};

export const parseBusinessFunctionData = (csvText: string): BusinessFunctionData[] => {
  const lines = csvText.split('\n');
  const businessFunctions: BusinessFunctionData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = parseCSVLine(line);
    
    if (columns.length >= 3 && columns[0] && columns[0] !== 'Business Function') {
      businessFunctions.push({
        businessFunction: columns[0] || '',
        keyApplication: columns[1] || '',
        recommendedTools: columns[2] || ''
      });
    }
  }
  
  return businessFunctions;
};

export const combineModelData = (models: AIModel[], jobRoles: JobRoleModel[]): EnhancedModel[] => {
  return models.map(model => {
    const relatedJobRoles = jobRoles.filter(jr => 
      jr.modelName.toLowerCase().includes(model.name.toLowerCase()) ||
      model.name.toLowerCase().includes(jr.modelName.toLowerCase())
    );
    
    const businessFunctions = Array.from(new Set(relatedJobRoles.map(jr => jr.businessFunction)));
    
    return {
      ...model,
      jobRoles: relatedJobRoles,
      businessFunctions
    };
  });
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};