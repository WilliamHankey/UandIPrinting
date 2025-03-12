
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import DesignCard from '@/components/DesignCard';

// Sample design data
const DESIGNS_DATA = [
  {
    id: '1',
    image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&q=80",
    title: "Modern Business Card",
    category: "Business Cards",
    price: 49.99
  },
  {
    id: '2',
    image: "https://images.unsplash.com/photo-1622556498246-755f44ca76f3?auto=format&fit=crop&q=80",
    title: "Corporate Brochure",
    category: "Brochures",
    price: 89.99
  },
  {
    id: '3',
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80",
    title: "Event Promotion Poster",
    category: "Posters",
    price: 39.99
  },
  {
    id: '4',
    image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?auto=format&fit=crop&q=80",
    title: "Restaurant Menu",
    category: "Menus",
    price: 59.99
  },
  {
    id: '5',
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80",
    title: "Wedding Invitation",
    category: "Invitations",
    price: 69.99
  },
  {
    id: '6',
    image: "https://images.unsplash.com/photo-1611532736637-13a8bdf96a5f?auto=format&fit=crop&q=80",
    title: "Company Letterhead",
    category: "Stationery",
    price: 29.99
  },
  {
    id: '7',
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80",
    title: "Professional Flyer",
    category: "Flyers",
    price: 34.99
  },
  {
    id: '8',
    image: "https://images.unsplash.com/photo-1626785774573-5a4da723fe2b?auto=format&fit=crop&q=80",
    title: "Holiday Greeting Card",
    category: "Greeting Cards",
    price: 19.99
  },
  {
    id: '9',
    image: "https://images.unsplash.com/photo-1600775508114-5c30cf886418?auto=format&fit=crop&q=80",
    title: "Custom T-Shirt Design",
    category: "Apparel",
    price: 24.99
  }
];

const Designs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedDesigns, setDisplayedDesigns] = useState<typeof DESIGNS_DATA>([]);
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
    if (filter === 'All Designs') return DESIGNS_DATA;
    return DESIGNS_DATA.filter(design => design.category === filter);
  }, [filter]);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedDesigns.map((design, index) => (
              <DesignCard 
                key={design.id}
                id={design.id}
                image={design.image}
                title={design.title}
                category={design.category}
                price={design.price}
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
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Designs;
