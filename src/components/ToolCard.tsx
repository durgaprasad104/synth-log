import { ExternalLink, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { Tool } from "../types/Tool";

interface ToolCardProps {
  tool: Tool;
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
}

const ToolCard = ({ tool, onEdit, onDelete }: ToolCardProps) => {
  const handleVisitTool = () => {
    window.open(tool.url, '_blank');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(tool);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(tool.id);
  };

  return (
    <div className="group bg-gradient-card border border-card-border rounded-lg p-6 
                   transition-all duration-300 ease-out
                   hover:bg-card-hover hover:shadow-card-hover hover:-translate-y-1
                   relative overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors duration-200">
            {tool.name}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVisitTool}
            className="text-muted-foreground hover:text-primary transition-colors duration-200 p-1"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm px-3 py-1 bg-secondary rounded-full text-secondary-foreground font-medium">
            {tool.category}
          </span>
          <StarRating rating={tool.rating} size="sm" />
        </div>
        
        <div className="text-xs text-muted-foreground mb-4">
          Added {new Date(tool.dateAdded).toLocaleDateString()}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="flex-1"
          >
            <Edit2 className="w-3 h-3 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;