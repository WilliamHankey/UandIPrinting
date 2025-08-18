
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { sendOrderNotifications } from '@/lib/notifications';
import { useContact } from '@/hooks/useContact';
import { Skeleton } from '@/components/ui/skeleton';

const Contact = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isQuoteRequest = searchParams.get('type') === 'quote';
  
  const { cartItems, totalPrice } = useCart();
  const { toast } = useToast();
  const { data: contact, isLoading, error } = useContact();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: isQuoteRequest ? 'Quote Request' : '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Send WhatsApp notification
      await sendOrderNotifications(cartItems, totalPrice, formData);
      
      // Form will be submitted to FormSubmit
      // We don't prevent default here, let the form submit naturally
      setSubmitted(true);
      
      // Show success message
      toast({
        title: "Message Sent",
        description: "Your message has been sent. We'll get back to you shortly!",
      });
      
      // Reset form (will happen after redirect back from formsubmit)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Notification error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

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

  // If already submitted, show thank you message
  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {contact?.contactForm?.successMessage || "Your message has been sent successfully. We'll get back to you shortly."}
            </p>
            <Button className="mt-8" onClick={() => setSubmitted(false)}>Send Another Message</Button>
          </div>
        </section>
        <Footer />
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
            {contact?.heroSection?.heading || "Contact Us"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {contact?.heroSection?.description || "We're here to answer any questions you may have about our printing services. Reach out to us and we'll respond as soon as we can."}
          </p>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Ready to start your next printing project? We'd love to hear from you. Contact us using any of the methods below.
                </p>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-6">
                {contact?.contactInfo?.email && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a 
                        href={`mailto:${contact.contactInfo.email}`}
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {contact.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {contact?.contactInfo?.phone && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <a 
                        href={`tel:${contact.contactInfo.phone}`}
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {contact.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {contact?.contactInfo?.whatsapp && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <a 
                        href={`https://wa.me/${contact.contactInfo.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {contact.contactInfo.whatsapp}
                      </a>
                    </div>
                  </div>
                )}
                
                {contact?.contactInfo?.address && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">{contact.contactInfo.address}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Office Hours */}
              {contact?.officeHours && contact.officeHours.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    {contact.officeHours.map((day: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-gray-600">{day.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {contact?.contactForm?.title || "Send us a Message"}
                </h2>
                <p className="text-gray-600">
                  {contact?.contactForm?.description || "Fill out the form below and we'll get back to you as soon as possible."}
                </p>
              </div>
              
              <form 
                onSubmit={handleSubmit}
                action={contact?.contactForm?.formSubmitUrl || "https://formsubmit.co/uandiprinting@outlook.com"}
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
