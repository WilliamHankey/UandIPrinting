
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Award, Clock, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About U&I Printing</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate printing professionals dedicated to delivering exceptional quality prints that bring your ideas to life.
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
                <img
                  src="https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?auto=format&fit=crop&q=80"
                  alt="Our printing facility"
                  className="relative rounded-3xl shadow-xl z-10"
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-primary font-medium">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold">Bringing Ideas to Life Since 2010</h2>
              <p className="text-gray-600">
                U&I Printing was founded with a simple mission: to provide high-quality printing services that help businesses and individuals express their creativity and professionalism through print.
              </p>
              <p className="text-gray-600">
                What started as a small shop with a single printer has grown into a full-service printing company with state-of-the-art equipment and a team of dedicated professionals. Throughout our journey, our commitment to quality, innovation, and customer satisfaction has remained unwavering.
              </p>
              <div className="pt-4">
                <Button>Learn More About Our Journey</Button>
              </div>
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
