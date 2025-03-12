
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import BlogCard from '@/components/BlogCard';

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the latest trends, tips, and insights from the world of printing and design.
          </p>
        </div>
      </section>
      
      {/* Search and Categories */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Button variant="outline" size="sm" className="whitespace-nowrap">All Categories</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">Design Tips</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">Printing Technology</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">Marketing Insights</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">Case Studies</Button>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-accent rounded-2xl overflow-hidden shadow-md">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Featured Article</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-4">The Future of Sustainable Printing: Eco-Friendly Practices for 2024</h2>
                <p className="text-gray-600 mt-4">
                  Discover how the printing industry is embracing sustainable practices to reduce environmental impact while maintaining high-quality outputs.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-gray-500 text-sm">Oct 20, 2023 • 8 min read</p>
                  </div>
                </div>
                <Button className="mt-6 bg-primary hover:bg-primary/90">Read Article</Button>
              </div>
              <div className="h-64 md:h-full">
                <img 
                  src="https://images.unsplash.com/photo-1581077105098-488fdc76b3a8?auto=format&fit=crop&q=80" 
                  alt="Sustainable printing" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard 
              image="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80"
              title="5 Tips for Creating Eye-Catching Business Cards"
              excerpt="Learn how to design business cards that make a lasting impression and effectively represent your brand."
              date="Oct 15, 2023"
              category="Design Tips"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1616070698578-e5e634af7e8e?auto=format&fit=crop&q=80"
              title="The Impact of Color Psychology in Marketing Materials"
              excerpt="Discover how different colors can influence customer perception and behavior when used in your marketing materials."
              date="Sep 28, 2023"
              category="Marketing Insights"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1561303460-dcd9acb0bc1d?auto=format&fit=crop&q=80"
              title="Digital vs. Offset Printing: Which One is Right for You?"
              excerpt="Understand the differences between digital and offset printing to make the right choice for your next printing project."
              date="Sep 10, 2023"
              category="Printing Technology"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&q=80"
              title="Preparing Your Artwork for Print: A Complete Guide"
              excerpt="Follow this step-by-step guide to ensure your digital artwork is properly prepared for high-quality printing results."
              date="Aug 22, 2023"
              category="Design Tips"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&q=80"
              title="How to Choose the Right Paper for Your Printing Project"
              excerpt="Learn about different paper types, weights, and finishes to select the best option for your specific printing needs."
              date="Aug 5, 2023"
              category="Printing Technology"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1551150441-3f3828204ef0?auto=format&fit=crop&q=80"
              title="Print Marketing in the Digital Age: Why It Still Matters"
              excerpt="Explore how traditional print marketing can complement your digital strategy and help your business stand out."
              date="Jul 18, 2023"
              category="Marketing Insights"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
