import { useState, useEffect } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ToolCard from "../components/ToolCard";
import SearchAndFilter from "../components/SearchAndFilter";
import AddToolModal from "../components/AddToolModal";
import { Tool } from "../types/Tool";
import { fetchTools, addTool, updateTool, deleteTool } from "../firebaseTools";

const Index = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const allTools = await fetchTools();
        setTools(allTools);
        setFilteredTools(allTools);
      } catch (error) {
        toast({
          title: "Error loading tools",
          description: "Could not load AI tools from database.",
          variant: "destructive",
        });
      }
    })();
  }, [toast]);

  useEffect(() => {
    let filtered = tools;

    if (searchQuery.trim()) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(tool => tool.category === categoryFilter);
    }

    if (ratingFilter !== "all") {
      const minRating = parseInt(ratingFilter, 10);
      filtered = filtered.filter(tool => tool.rating >= minRating);
    }

    setFilteredTools(filtered);
  }, [tools, searchQuery, categoryFilter, ratingFilter]);

  const handleSaveTool = async (toolData: Omit<Tool, "id" | "dateAdded">) => {
    try {
      if (editingTool) {
        await updateTool(editingTool.id, toolData);
        toast({
          title: "Tool Updated!",
          description: `${editingTool.name} has been updated.`,
        });
      } else {
        await addTool(toolData);
        toast({
          title: "Tool Added!",
          description: `${toolData.name} has been added.`,
        });
      }
      const updatedTools = await fetchTools();
      setTools(updatedTools);
      setEditingTool(null);
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsModalOpen(true);
  };

  const handleDeleteTool = async (id: string) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      try {
        await deleteTool(id);
        const updatedTools = await fetchTools();
        setTools(updatedTools);
        toast({
          title: "Tool Deleted!",
          description: "The tool has been removed.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete tool. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddNewTool = () => {
    setEditingTool(null);
    setIsModalOpen(true);
  };

  // Derive unique categories for filter dropdown
  const categories = Array.from(new Set(tools.map(t => t.category))).sort();

  return (
    <div className="min-h-screen bg-background">
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
              onClick={handleAddNewTool}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Tool
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          categories={categories}
        />

        {filteredTools.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">
                Your AI Tools ({filteredTools.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onEdit={handleEditTool}
                  onDelete={handleDeleteTool}
                />
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
              onClick={handleAddNewTool}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Tool
            </Button>
          </div>
        )}
      </main>

      <AddToolModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTool(null);
        }}
        onSaveTool={handleSaveTool}
        editingTool={editingTool}
      />
    </div>
  );
};

export default Index;
