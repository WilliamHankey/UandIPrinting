
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import DesignCard from '@/components/DesignCard';

const Designs = () => {
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">All Designs</Button>
              <Button variant="outline" size="sm">Business Cards</Button>
              <Button variant="outline" size="sm">Brochures</Button>
              <Button variant="outline" size="sm">Posters</Button>
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
            <DesignCard 
              image="https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&q=80"
              title="Modern Business Card"
              category="Business Cards"
              price={49.99}
            />
            <DesignCard 
              image="https://images.unsplash.com/photo-1622556498246-755f44ca76f3?auto=format&fit=crop&q=80"
              title="Corporate Brochure"
              category="Brochures"
              price={89.99}
            />
            <DesignCard 
              image="https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80"
              title="Event Promotion Poster"
              category="Posters"
              price={39.99}
            />
            <DesignCard 
              image="https://images.unsplash.com/photo-1634084462412-b54873c0a56d?auto=format&fit=crop&q=80"
              title="Restaurant Menu"
              category="Menus"
              price={59.99}
            />
            <DesignCard 
              image="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80"
              title="Wedding Invitation"
              category="Invitations"
              price={69.99}
            />
            <DesignCard 
              image="https://images.unsplash.com/photo-1611532736637-13a8bdf96a5f?auto=format&fit=crop&q=80"
              title="Company Letterhead"
              category="Stationery"
              price={29.99}
            />
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Designs
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Designs;
