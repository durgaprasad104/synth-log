import { useState, useEffect } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ToolCard from "../components/ToolCard";
import SearchAndFilter from "../components/SearchAndFilter";
import AddToolModal from "../components/AddToolModal";
import { Tool } from "../types/Tool";
import { toolService } from "../services/toolService";

const Index = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const { toast } = useToast();

  // Load tools on component mount
  useEffect(() => {
    toolService.initSampleData();
    const loadedTools = toolService.getTools();
    setTools(loadedTools);
    setFilteredTools(loadedTools);
  }, []);

  // Filter tools based on search and filters
  useEffect(() => {
    let filtered = tools;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(tool => tool.category === categoryFilter);
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const minRating = parseInt(ratingFilter);
      filtered = filtered.filter(tool => tool.rating >= minRating);
    }

    setFilteredTools(filtered);
  }, [tools, searchQuery, categoryFilter, ratingFilter]);

  const handleAddTool = (toolData: Omit<Tool, 'id' | 'dateAdded'>) => {
    try {
      const newTool = toolService.addTool(toolData);
      const updatedTools = toolService.getTools();
      setTools(updatedTools);
      
      toast({
        title: "Tool Added!",
        description: `${newTool.name} has been added to your discovery log.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const categories = toolService.getCategories();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-card-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground flex items-center gap-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                AI Tool Discovery Log
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover, rate, and organize your favorite AI tools
              </p>
            </div>
            
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 
                         w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Tool
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          categories={categories}
        />

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">
                Your AI Tools ({filteredTools.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-card border border-card-border rounded-lg inline-block mb-4">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              {searchQuery || categoryFilter !== "all" || ratingFilter !== "all" 
                ? "No tools match your filters" 
                : "No AI tools yet"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery || categoryFilter !== "all" || ratingFilter !== "all"
                ? "Try adjusting your search or filters to find more tools."
                : "Start building your AI tool collection by adding your first discovery!"}
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Tool
            </Button>
          </div>
        )}
      </main>

      {/* Add Tool Modal */}
      <AddToolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTool={handleAddTool}
      />
    </div>
  );
};

export default Index;
