import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Printer, Palette, Sparkles, TrendingUp, Clock, Truck } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

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
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/designs?action=order">
                    Start Your Order <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/designs">
                    Explore Our Designs
                  </Link>
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

      {/* Services Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Our Premium Printing Services</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We provide a wide range of high-quality printing services tailored to meet your unique needs and requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Printer className="h-10 w-10" />}
              title="Business Cards"
              description="Make a lasting impression with our premium business cards. Choose from various paper stocks and finishes."
            />
            <ServiceCard 
              icon={<Palette className="h-10 w-10" />}
              title="Custom Brochures"
              description="Showcase your products and services with our professionally designed and printed brochures."
            />
            <ServiceCard 
              icon={<TrendingUp className="h-10 w-10" />}
              title="Marketing Materials"
              description="From flyers to posters, get high-quality marketing materials to promote your business."
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">The U&I Printing Advantage</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our commitment to quality, innovation, and customer satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6" />}
              title="Premium Quality"
              description="We use top-grade materials and state-of-the-art printing technology to ensure exceptional quality."
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6" />}
              title="Quick Turnaround"
              description="Get your prints delivered on time with our efficient production process and quick turnaround times."
            />
            <FeatureCard 
              icon={<Truck className="h-6 w-6" />}
              title="Free Delivery"
              description="Free delivery on all orders above $50 within the city. Nationwide shipping available."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-secondary text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">What Our Clients Say</h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              content="The quality of prints I received from U&I Printing was exceptional. Their attention to detail and customer service exceeded my expectations."
              author="Sarah Johnson"
              role="Marketing Director"
            />
            <TestimonialCard 
              content="Fast turnaround, professional service, and outstanding print quality. U&I Printing has been our go-to printing partner for all our marketing materials."
              author="David Chen"
              role="Small Business Owner"
            />
            <TestimonialCard 
              content="Their design team helped us create stunning business cards that perfectly represent our brand. Highly recommended for all your printing needs!"
              author="Emily Martinez"
              role="Graphic Designer"
            />
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Our Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Latest Articles & Tips</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights from the world of printing and design.
            </p>
          </div>
          
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
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" size="lg">
              View All Articles
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Printing Project?</h2>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">
            Get in touch with us today to discuss your printing needs and receive a free quote.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact?type=quote">
                Get a Free Quote
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
