
import React from 'react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
}

const TestimonialCard = ({ content, author, role }: TestimonialCardProps) => {
  return (
    <div className="bg-secondary-foreground/5 p-6 rounded-xl border border-white/10 hover:bg-secondary-foreground/10 transition-colors duration-300">
      <div className="mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 inline-block text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-white/90 italic mb-4">"{content}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-white/70 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
