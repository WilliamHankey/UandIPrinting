
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { useBlog } from '@/hooks/useBlog';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
  const { data: blogPosts, isLoading, error } = useBlog();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="container mx-auto">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-600">Error loading blog posts</h1>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

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
      {blogPosts && blogPosts.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="bg-accent rounded-2xl overflow-hidden shadow-md">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Featured Article</span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-4">
                    {blogPosts[0].title || "Featured Article"}
                  </h2>
                  <p className="text-gray-600 mt-4">
                    {blogPosts[0].excerpt || "Article excerpt"}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      {blogPosts[0].author?.name?.charAt(0)?.toUpperCase() || "A"}
                    </div>
                    <div>
                      <p className="font-semibold">{blogPosts[0].author?.name || "Anonymous"}</p>
                      <p className="text-gray-500 text-sm">
                        {blogPosts[0].publishedAt ? new Date(blogPosts[0].publishedAt).toLocaleDateString() : "No date"} • 5 min read
                      </p>
                    </div>
                  </div>
                  <Button className="mt-6 bg-primary hover:bg-primary/90">
                    Read Article
                  </Button>
                </div>
                <div className="h-64 md:h-full">
                  <img 
                    src={blogPosts[0].featuredImage || "/placeholder.svg"} 
                    alt={blogPosts[0].title || "Featured article"} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          
          {blogPosts && blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post: any) => (
                <BlogCard 
                  key={post._id}
                  image={post.featuredImage}
                  title={post.title || "Untitled Post"}
                  excerpt={post.excerpt || "No excerpt available"}
                  date={post.publishedAt}
                  author={post.author?.name}
                  slug={post.slug?.current}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available yet.</p>
            </div>
          )}
          
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
