import { Tool } from '../types/Tool';

const STORAGE_KEY = 'ai-tools-discovery-log';

export const toolService = {
  // Get all tools from localStorage
  getTools: (): Tool[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading tools:', error);
      return [];
    }
  },

  // Save tools to localStorage
  saveTools: (tools: Tool[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
    } catch (error) {
      console.error('Error saving tools:', error);
    }
  },

  // Add a new tool
  addTool: (toolData: Omit<Tool, 'id' | 'dateAdded'>): Tool => {
    const newTool: Tool = {
      ...toolData,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };
    
    const tools = toolService.getTools();
    tools.push(newTool);
    toolService.saveTools(tools);
    
    return newTool;
  },

  // Get unique categories
  getCategories: (): string[] => {
    const tools = toolService.getTools();
    const categories = new Set(tools.map(tool => tool.category));
    return Array.from(categories).sort();
  },

  // Update an existing tool
  updateTool: (id: string, toolData: Omit<Tool, 'id' | 'dateAdded'>): Tool | null => {
    const tools = toolService.getTools();
    const toolIndex = tools.findIndex(tool => tool.id === id);
    
    if (toolIndex === -1) return null;
    
    const updatedTool: Tool = {
      ...tools[toolIndex],
      ...toolData,
    };
    
    tools[toolIndex] = updatedTool;
    toolService.saveTools(tools);
    
    return updatedTool;
  },

  // Delete a tool
  deleteTool: (id: string): boolean => {
    const tools = toolService.getTools();
    const filteredTools = tools.filter(tool => tool.id !== id);
    
    if (filteredTools.length === tools.length) return false;
    
    toolService.saveTools(filteredTools);
    return true;
  },

  // Initialize with sample data if empty
  initSampleData: (): void => {
    const tools = toolService.getTools();
    if (tools.length === 0) {
      const sampleTools = [
        {
          name: 'ChatGPT',
          category: 'Text Generation',
          url: 'https://chat.openai.com',
          rating: 5,
        },
        {
          name: 'Claude',
          category: 'Text Generation', 
          url: 'https://claude.ai',
          rating: 5,
        },
        {
          name: 'Midjourney',
          category: 'Image Generation',
          url: 'https://midjourney.com',
          rating: 4,
        },
        {
          name: 'GitHub Copilot',
          category: 'Code Assistant',
          url: 'https://copilot.github.com',
          rating: 4,
        }
      ];
      
      sampleTools.forEach(toolData => toolService.addTool(toolData));
    }
  }
};