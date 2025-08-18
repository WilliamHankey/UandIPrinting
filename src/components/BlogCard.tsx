
import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  image?: string;
  title: string;
  excerpt: string;
  date?: string;
  author?: string;
  slug?: string;
}

const BlogCard = ({ image, title, excerpt, date, author, slug }: BlogCardProps) => {
  // Ensure we have fallback values
  const displayTitle = title || 'Untitled Post';
  const displayExcerpt = excerpt || 'No excerpt available';
  const displayImage = image || '/placeholder.svg';
  const displayDate = date ? new Date(date).toLocaleDateString() : 'No date';
  const displayAuthor = author || 'Anonymous';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={displayImage} alt={displayTitle} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{displayDate}</span>
          </div>
          {author && (
            <span className="text-xs font-medium bg-accent text-primary px-3 py-1 rounded-full">
              {displayAuthor}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
          <Link to={slug ? `/blog/${slug}` : "/blog"}>{displayTitle}</Link>
        </h3>
        <p className="text-gray-600 mb-4">{displayExcerpt}</p>
        <Link to={slug ? `/blog/${slug}` : "/blog"} className="text-primary font-medium flex items-center hover:underline">
          Read more
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
