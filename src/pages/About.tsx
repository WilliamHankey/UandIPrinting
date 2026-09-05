
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Award, Clock, Users } from 'lucide-react';
import { useAbout } from '@/hooks/useAbout';
import { Skeleton } from '@/components/ui/skeleton';

// Icon mapping for dynamic icons
const iconMap: { [key: string]: React.ReactNode } = {
  CheckCircle2: <CheckCircle2 className="h-10 w-10" />,
  Award: <Award className="h-10 w-10" />,
  Clock: <Clock className="h-10 w-10" />,
  Users: <Users className="h-10 w-10" />,
};

const About = () => {
  const { data: about, isLoading, error } = useAbout();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = about?.storySection?.images || [
    {
      src: "/assets/hero-image.png",
      alt: "Our printing facility"
    },
    {
      src: "/assets/hero-image.png",
      alt: "Printing equipment and workspace"
    },
    {
      src: "/assets/hero-image.png",
      alt: "Quality control and finishing"
    }
  ];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

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
            <h1 className="text-2xl font-bold text-red-600">Error loading content</h1>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {about?.heroSection?.heading || "About U&I Printing"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {about?.heroSection?.description || "Based in the heart of Cape Town, U&I Printing has been transforming creative visions into stunning printed reality since 2015. We specialize in business branding, personalized printing, marketing materials, and everything in between - from professional business cards to eye-catching posters and banners. Our commitment to quality, quick turnaround times, and personalized service has made us the trusted printing partner for businesses and individuals across South Africa."}
          </p>
        </div>
      </section>
      
      {/* Story Section */}
      {about?.storySection && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-6"></div>
                  <div className="relative rounded-3xl shadow-xl z-10 overflow-hidden h-96 w-full">
                    {images.map((image: any, index: number) => (
                      <img
                        key={index}
                        src={image.src || image}
                        alt={image.alt || `Story image ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                    {/* Image indicator */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_: any, index: number) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <span className="text-primary font-medium">
                  {about.storySection.title || "Our Story"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {about.storySection.heading || "Bringing Ideas to Life Since 2015"}
                </h2>
                <div className="text-gray-600">
                  {about.storySection.description ? (
                    <div dangerouslySetInnerHTML={{ __html: about.storySection.description }} />
                  ) : (
                    <>
                      <p>
                        U&I Printing was founded with a simple mission: to provide high-quality printing services that help businesses and individuals express their creativity and professionalism through print.
                      </p>
                      <p>
                        What started as a small shop with a single printer has grown into a full-service printing company with state-of-the-art equipment and a team of dedicated professionals. Throughout our journey, our commitment to quality, innovation, and customer satisfaction has remained unwavering.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Values Section */}
      {about?.valuesSection && (
        <section className="py-16 px-4 bg-accent">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-medium">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {about.valuesSection.title || "What Drives Us"}
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                {about.valuesSection.subtitle || "We strive for excellence in everything we do, from customer service to the final printed product."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {about.valuesSection.values?.map((value: any, index: number) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    {iconMap[value.icon] || <CheckCircle2 className="h-10 w-10" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
        {/* What We Offer Section */}
      {about?.statsSection && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We Offer
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From everyday essentials to large format projects, we cover a comprehensive range of printing services designed to meet the needs of businesses and individuals alike.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Business Cards & Stationery", desc: "Premium card stock, spot UV, foil finishing and elegant designs that make a lasting first impression." },
                { title: "Business Branding", desc: "Logos, letterheads, compliment slips and complete corporate identity packages." },
                { title: "Brochures & Flyers", desc: "Informative and eye-catching marketing collateral to promote your products and services." },
                { title: "Posters & Banners", desc: "Large format printing for events, promotions, storefronts and exhibitions." },
                { title: "Personalised & Gifting Printing", desc: "Custom mugs, t-shirts, caps, hoodies and unique keepsakes for every occasion." },
                { title: "Marketing Materials", desc: "Full suite of promotional products designed to grow your brand and reach new customers." },
              ].map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">The U&I Printing Advantage</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "High-Quality Output", desc: "State-of-the-art printers and premium materials for crisp, durable results every time." },
              { title: "Fast Turnaround", desc: "We understand deadlines matter. Most orders are completed within 24-48 hours." },
              { title: "Affordable Pricing", desc: "Competitive rates without compromising on quality, with bulk order discounts." },
              { title: "Personal Service", desc: "A dedicated team that works closely with you from concept to final print." },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-4">{iconMap[index === 0 ? 'Award' : index === 1 ? 'Clock' : index === 2 ? 'CheckCircle2' : 'Users']}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {about?.statsSection && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {about.statsSection.title || "Our Numbers"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {about.statsSection.stats?.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {iconMap[stat.icon] || <Award className="h-10 w-10" />}
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Our Simple Process</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Getting your printing done has never been easier. Follow our simple step-by-step process.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse Designs", desc: "Explore our collection of professionally crafted templates and designs." },
              { step: "02", title: "Customize", desc: "Select your options, add your specifications and personalize to your needs." },
              { step: "03", title: "Place Your Order", desc: "Add to cart, send us your requirements and confirm your details." },
              { step: "04", title: "Print & Deliver", desc: "We produce your order with premium quality and deliver it to your door." },
            ].map((item, index) => (
              <div key={index} className="relative p-6 text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Project?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Whether you need a single business card or bulk marketing materials, we're here to help. Get in touch today for a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/designs">Browse Designs</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {about?.teamSection && (
        <section className="py-16 px-4 bg-accent">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-medium">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {about.teamSection.title || "Meet the Team"}
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                {about.teamSection.subtitle || "The dedicated professionals behind U&I Printing's success."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {about.teamSection.teamMembers?.map((member: any, index: number) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        Email
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default About;
