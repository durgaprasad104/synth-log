import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ rating, onRatingChange, interactive = false, size = "md" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} transition-all duration-200 ${
            star <= rating 
              ? "fill-primary text-primary" 
              : "text-muted-foreground"
          } ${
            interactive 
              ? "cursor-pointer hover:text-primary hover:scale-110" 
              : ""
          }`}
          onClick={interactive ? () => onRatingChange?.(star) : undefined}
        />
      ))}
    </div>
  );
};

export default StarRating;