
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Award, Clock, Users } from 'lucide-react';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: "/assests/hero-image.png",
      alt: "Our printing facility"
    },
    {
      src: "/assests/hero-image.png",
      alt: "Printing equipment and workspace"
    },
    {
      src: "/assests/hero-image.png",
      alt: "Quality control and finishing"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Debug: log current image index
  console.log('Current image index:', currentImageIndex);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About U&I Printing</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Based in the heart of Cape Town, U&I Printing has been transforming creative visions into stunning printed reality since 2015. We specialize in business branding, personalized printing, marketing materials, and everything in between - from professional business cards to eye-catching posters and banners. Our commitment to quality, quick turnaround times, and personalized service has made us the trusted printing partner for businesses and individuals across South Africa.
          </p>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-6"></div>
                <div className="relative rounded-3xl shadow-xl z-10 overflow-hidden h-96 w-full">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  {/* Image indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-primary font-medium">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold">Bringing Ideas to Life Since 2015</h2>
              <p className="text-gray-600">
                U&I Printing was founded with a simple mission: to provide high-quality printing services that help businesses and individuals express their creativity and professionalism through print.
              </p>
              <p className="text-gray-600">
                What started as a small shop with a single printer has grown into a full-service printing company with state-of-the-art equipment and a team of dedicated professionals. Throughout our journey, our commitment to quality, innovation, and customer satisfaction has remained unwavering.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">What Drives Us</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our core values shape our approach to business and guide our interactions with clients, partners, and each other.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-primary mb-4 flex justify-center">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">
                We are committed to delivering the highest quality prints using premium materials and cutting-edge technology.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-primary mb-4 flex justify-center">
                <Award className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from customer service to the final printed product.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-primary mb-4 flex justify-center">
                <Clock className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-gray-600">
                We deliver on our promises, meeting deadlines and exceeding expectations with consistent reliability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-primary mb-4 flex justify-center">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer-Focused</h3>
              <p className="text-gray-600">
                Our clients are at the heart of everything we do. We listen, adapt, and deliver solutions that meet their needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section Placeholder */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <span className="text-primary font-medium">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Meet the Experts Behind U&I Printing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Our team of printing professionals brings years of experience, creativity, and dedication to every project.
          </p>
          
          {/* Team members would go here */}
          <div className="bg-accent p-8 rounded-xl">
            <p className="text-lg font-medium">Team section content coming soon!</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
