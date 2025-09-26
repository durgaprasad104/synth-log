import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StarRating from "./StarRating";
import { Tool } from "../types/Tool";

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (tool: Omit<Tool, 'id' | 'dateAdded'>) => void;
}

const AddToolModal = ({ isOpen, onClose, onAddTool }: AddToolModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    rating: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.url || !formData.category || formData.rating === 0) {
      return;
    }

    onAddTool(formData);
    setFormData({ name: '', url: '', category: '', rating: 0 });
    onClose();
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-card-border rounded-xl p-6 w-full max-w-md shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-card-foreground">Add New AI Tool</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-card-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-card-foreground font-medium">
              Tool Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., ChatGPT, Claude, etc."
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-input border-input-border focus:border-input-focus text-card-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-card-foreground font-medium">
              URL
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="bg-input border-input-border focus:border-input-focus text-card-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-card-foreground font-medium">
              Category
            </Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Text Generation, Image AI, etc."
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="bg-input border-input-border focus:border-input-focus text-card-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-card-foreground font-medium">Rating</Label>
            <div className="flex items-center gap-3">
              <StarRating 
                rating={formData.rating} 
                onRatingChange={handleRatingChange}
                interactive
                size="lg"
              />
              <span className="text-sm text-muted-foreground">
                {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tool
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToolModal;