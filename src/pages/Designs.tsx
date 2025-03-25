import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import DesignCard from '@/components/DesignCard';
import { useDesigns } from '@/hooks/useDesigns';

const Designs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { designs, loading: isLoading, error } = useDesigns();
  const [displayedDesigns, setDisplayedDesigns] = useState<typeof designs>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(searchParams.get('category') || 'All Designs');
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);
  const perPage = 6;

  // Process URL parameters for filtering
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilter(category);
    }
  }, [searchParams]);

  // Filter designs based on selected category
  const filteredDesigns = React.useMemo(() => {
    if (!designs) return [];
    if (filter === 'All Designs') return designs;
    return designs.filter(design => design.category === filter);
  }, [designs, filter]);

  // Load initial designs
  useEffect(() => {
    setDisplayedDesigns(filteredDesigns.slice(0, perPage));
    setPage(1);
  }, [filteredDesigns]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && displayedDesigns.length < filteredDesigns.length) {
          loadMoreDesigns();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayedDesigns, loading, filteredDesigns]);

  const loadMoreDesigns = () => {
    setLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      const nextPage = page + 1;
      const newDesigns = filteredDesigns.slice(0, nextPage * perPage);
      setDisplayedDesigns(newDesigns);
      setPage(nextPage);
      setLoading(false);
    }, 800);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSearchParams({ category: newFilter === 'All Designs' ? '' : newFilter });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading designs</h2>
          <p className="text-gray-600">{error.message}</p>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Designs</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse through our collection of professionally crafted designs for various printing needs.
          </p>
        </div>
      </section>
      
      {/* Filter and Search Section */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <Button 
                variant={filter === 'All Designs' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('All Designs')}
              >
                <Filter className="h-4 w-4 mr-2" />
                All Designs
              </Button>
              <Button 
                variant={filter === 'Business Cards' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('Business Cards')}
              >
                Business Cards
              </Button>
              <Button 
                variant={filter === 'Brochures' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('Brochures')}
              >
                Brochures
              </Button>
              <Button 
                variant={filter === 'Posters' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('Posters')}
              >
                Posters
              </Button>
              <Button 
                variant={filter === 'Stationery' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('Stationery')}
              >
                Stationery
              </Button>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search designs..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Designs Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedDesigns.map((design) => (
                  <DesignCard 
                    key={design._id}
                    _id={design._id}
                    image={design.image}
                    title={design.title}
                    category={design.category}
                    price={design.price}
                    rating={design.rating}
                    reviewCount={design.reviewCount}
                    contributors={design.contributors}
                  />
                ))}
              </div>
              
              {/* Loading indicator and observer target */}
              <div 
                ref={observerTarget} 
                className="flex justify-center mt-12 h-16"
              >
                {loading && displayedDesigns.length < filteredDesigns.length && (
                  <div className="loader">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Designs;
