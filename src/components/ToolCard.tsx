import { ExternalLink } from "lucide-react";
import StarRating from "./StarRating";
import { Tool } from "../types/Tool";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const handleCardClick = () => {
    window.open(tool.url, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-gradient-card border border-card-border rounded-lg p-6 
                 transition-all duration-300 ease-out cursor-pointer
                 hover:bg-card-hover hover:shadow-card-hover hover:-translate-y-1
                 relative overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors duration-200">
            {tool.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm px-3 py-1 bg-secondary rounded-full text-secondary-foreground font-medium">
            {tool.category}
          </span>
          <StarRating rating={tool.rating} size="sm" />
        </div>
        
        <div className="text-xs text-muted-foreground">
          Added {new Date(tool.dateAdded).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;