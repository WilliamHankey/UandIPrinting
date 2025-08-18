
import React, { useState, useEffect } from 'react';
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
