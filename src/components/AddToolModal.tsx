import { useState, useEffect } from "react";
import { Plus, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StarRating from "./StarRating";
import { Tool } from "../types/Tool";
import PasswordModal from "./PasswordModal";  // Import PasswordModal

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTool: (tool: Omit<Tool, 'id' | 'dateAdded'>) => void;
  editingTool?: Tool | null;
}

const CATEGORIES = [
  "Text Generation",
  "Image Generation",
  "Code Assistant",
  "Video & Audio",
  "Productivity",
  "Speech Recognition",
  "3D Design",
  "Chatbots",
  "SEO",
  "Translation",
  "Health & Wellness",
  "Business Tools",
  "Education",
  "Writing Assistant",
  "Other"  // Added Other for manual input
];

const AddToolModal = ({ isOpen, onClose, onSaveTool, editingTool }: AddToolModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    rating: 0
  });

  const [customCategory, setCustomCategory] = useState("");  // State for manual category

  // Password modal state
  const [pwOpen, setPwOpen] = useState(false);

  useEffect(() => {
    if (editingTool) {
      setFormData({
        name: editingTool.name,
        url: editingTool.url,
        category: CATEGORIES.includes(editingTool.category) ? editingTool.category : "Other",
        rating: editingTool.rating
      });
      setCustomCategory(!CATEGORIES.includes(editingTool.category) ? editingTool.category : "");
    } else {
      setFormData({ name: '', url: '', category: '', rating: 0 });
      setCustomCategory("");
    }
  }, [editingTool, isOpen]);

  // This saves form data temporarily to be used after password submission
  const [pendingFormData, setPendingFormData] = useState<Omit<Tool, 'id' | 'dateAdded'> | null>(null);

  const handlePasswordSubmit = (entered: string) => {
    setPwOpen(false);
    if (entered === "durgaprasad" && pendingFormData) {
      onSaveTool(pendingFormData);
      setPendingFormData(null);
      setFormData({ name: '', url: '', category: '', rating: 0 });
      setCustomCategory("");
      onClose();
    } else {
      alert("Incorrect password!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.url || !formData.category || formData.rating === 0) {
      return;
    }

    // Determine which category to use - custom if "Other" is selected
    const categoryToSave = formData.category === "Other" && customCategory ? customCategory : formData.category;

    // Prepare form data with proper category
    const dataToSave = { ...formData, category: categoryToSave };

    // Open password modal with data
    setPendingFormData(dataToSave);
    setPwOpen(true);
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-card border border-card-border rounded-xl p-6 w-full max-w-md shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">
              {editingTool ? 'Edit AI Tool' : 'Add New AI Tool'}
            </h2>
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
            {/* Tool Name */}
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

            {/* URL */}
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

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-card-foreground font-medium">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, category: value }));
                  if (value !== "Other") setCustomCategory("");
                }}
                required
              >
                <SelectTrigger className="bg-input border-input-border focus:border-input-focus text-card-foreground">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Show input for custom category when "Other" is selected */}
              {formData.category === "Other" && (
                <Input
                  type="text"
                  placeholder="Enter custom category"
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value)}
                  className="mt-2"
                  required
                />
              )}
            </div>

            {/* Rating */}
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

            {/* Buttons */}
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
                {editingTool ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tool
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Password modal */}
      <PasswordModal
        open={pwOpen}
        onClose={() => setPwOpen(false)}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
};

export default AddToolModal;
