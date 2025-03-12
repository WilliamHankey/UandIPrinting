
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:pt-40 md:pb-24">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <div className="inline-block">
                <span className="bg-accent text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                  Professional Printing Services
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Print Your Ideas,{" "}
                <span className="text-primary">Bring Designs to Life!</span>
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Transform your creative visions into stunning prints with our premium quality printing services. From business cards to large format prints, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Your Order <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Explore Our Designs
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white p-6 rounded-3xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80"
                  alt="Printing samples showcase"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
