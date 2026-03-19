import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Printer,
  Palette,
  Sparkles,
  TrendingUp,
  Clock,
  Truck,
  PencilRuler,
  Ratio,
  Columns3,
  Maximize,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useHomepage } from "@/hooks/useHomepage";
import { useBlog } from "@/hooks/useBlog";
import { Skeleton } from "@/components/ui/skeleton";

// Icon mapping for dynamic icons
const iconMap: { [key: string]: React.ReactNode } = {
  Maximize: <Maximize className="h-10 w-10" />,
  Columns3: <Columns3 className="h-10 w-10" />,
  Ratio: <Ratio className="h-10 w-10" />,
  Printer: <Printer className="h-10 w-10" />,
  PencilRuler: <PencilRuler className="h-10 w-10" />,
  Palette: <Palette className="h-10 w-10" />,
  TrendingUp: <TrendingUp className="h-10 w-10" />,
  Clock: <Clock className="h-10 w-10" />,
  Truck: <Truck className="h-10 w-10" />,
  Sparkles: <Sparkles className="h-10 w-10" />,
};

const Index = () => {
  const {
    data: homepage,
    isLoading: homepageLoading,
    error: homepageError,
  } = useHomepage();
  const { data: blogPosts, isLoading: blogLoading } = useBlog();

  if (homepageLoading) {
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

  if (homepageError) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-600">
              Error loading content
            </h1>
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
      <section className="pt-32 pb-16 px-4 md:pt-40 md:pb-24">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              {homepage?.heroSection?.badge && (
                <div className="inline-block">
                  <span className="bg-accent text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                    {homepage.heroSection.badge}
                  </span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {homepage?.heroSection?.heading ||
                  "Print Your Ideas, Bring Designs to Life!"}
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                {homepage?.heroSection?.subheading ||
                  "Transform your creative visions into stunning prints with our premium quality printing services. From business cards to large format prints, we've got you covered."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {homepage?.heroSection?.primaryButtonText && (
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link
                      to={
                        homepage.heroSection.primaryButtonLink ||
                        "/designs?action=order"
                      }
                    >
                      {homepage.heroSection.primaryButtonText}{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
                {homepage?.heroSection?.secondaryButtonText && (
                  <Button size="lg" variant="outline" asChild>
                    <Link
                      to={
                        homepage.heroSection.secondaryButtonLink || "/designs"
                      }
                    >
                      {homepage.heroSection.secondaryButtonText}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white p-6 rounded-3xl shadow-xl">
                <img
                  src={
                    homepage?.heroSection?.heroImage || "/assets/hero-image.png"
                  }
                  alt="Printing samples showcase"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {homepage?.servicesSection &&
        homepage.servicesSection.services &&
        homepage.servicesSection.services.length > 0 && (
          <section className="py-16 px-4 bg-accent">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary font-medium">What We Offer</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                  {homepage.servicesSection.title ||
                    "Our Premium Printing Services"}
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  {homepage.servicesSection.subtitle ||
                    "We provide a wide range of high-quality printing services tailored to meet your unique needs and requirements."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {homepage.servicesSection.services.map(
                  (service: any, index: number) => (
                    <ServiceCard
                      key={index}
                      icon={
                        iconMap[service.icon] || (
                          <Printer className="h-10 w-10" />
                        )
                      }
                      title={service.title || "Service"}
                      description={service.description || "Service description"}
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {/* Features Section */}
      {homepage?.featuresSection &&
        homepage.featuresSection.features &&
        homepage.featuresSection.features.length > 0 && (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary font-medium">Why Choose Us</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                  {homepage.featuresSection.title ||
                    "The U&I Printing Advantage"}
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  {homepage.featuresSection.subtitle ||
                    "Experience the difference with our commitment to quality, innovation, and customer satisfaction."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {homepage.featuresSection.features.map(
                  (feature: any, index: number) => (
                    <FeatureCard
                      key={index}
                      icon={
                        iconMap[feature.icon] || (
                          <Sparkles className="h-10 w-10" />
                        )
                      }
                      title={feature.title || "Feature"}
                      description={feature.description || "Feature description"}
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {/* Testimonials Section */}
      {homepage?.testimonialsSection &&
        homepage.testimonialsSection.testimonials &&
        homepage.testimonialsSection.testimonials.length > 0 && (
          <section className="py-16 px-4 bg-secondary">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary font-medium">Testimonials</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
                  {homepage.testimonialsSection.title || "What Our Clients Say"}
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-white/80">
                  {homepage.testimonialsSection.subtitle ||
                    "Don't just take our word for it. Here's what our satisfied clients have to say about our services."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {homepage.testimonialsSection.testimonials.map(
                  (testimonial: any, index: number) => (
                    <TestimonialCard
                      key={index}
                      name={testimonial.name || "Anonymous"}
                      role={testimonial.role || "Customer"}
                      content={testimonial.content || "Great service!"}
                      rating={testimonial.rating || 5}
                      avatar={testimonial.avatar}
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {/* Blog Section */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-medium">Latest News</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                From Our Blog
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest printing trends, tips, and industry
                insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post: any) => (
                <BlogCard
                  key={post._id}
                  title={post.title || "Untitled Post"}
                  excerpt={post.excerpt || "No excerpt available"}
                  image={post.featuredImage}
                  author={post.author?.name}
                  date={post.publishedAt}
                  slug={post.slug?.current}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link to="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
