import React from "react";

interface RatingStarsProps {
  rating: number;
  className?: string;
  showCount?: boolean;
  reviewCount?: number;
}

const RatingStars = ({ rating, className = "w-4 h-4", showCount = false, reviewCount }: RatingStarsProps) => {
  const normalized = Math.max(0, Math.min(5, Math.round(rating)));
  const emptyStars = 5 - normalized;

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(normalized)].map((_, i) => (
          <svg key={`filled-${i}`} className={`${className} text-yellow-400 inline-block`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className={`${className} text-gray-300 inline-block`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showCount && (
        <span className="ml-1 text-sm text-gray-500">
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
