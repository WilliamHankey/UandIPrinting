
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { sendOrderNotifications } from '@/lib/notifications';

const Contact = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isQuoteRequest = searchParams.get('type') === 'quote';
  
  const { cartItems, totalPrice } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: isQuoteRequest ? 'Quote Request' : '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      // Send email and WhatsApp notifications
      await sendOrderNotifications(cartItems, totalPrice, formData);
      
      // Show success message
      toast({
        title: "Message Sent",
        description: "Your message has been sent. We'll get back to you shortly!",
      });
      
      // Reset form
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isQuoteRequest ? 'Get a Free Quote' : 'Contact Us'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isQuoteRequest 
              ? 'Tell us about your project and we\'ll provide you with a custom quote.' 
              : 'Have questions or ready to start your printing project? Reach out to our team for assistance.'}
          </p>
        </div>
      </section>
      
      {/* Contact Information and Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to answer any questions you may have about our printing services. Reach out to us and we'll respond as soon as we can.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full text-primary mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-gray-600">123 Print Avenue, Design District, New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full text-primary mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-gray-600">info@uiprinting.com</p>
                    <p className="text-gray-600">support@uiprinting.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full text-primary mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-gray-600">(123) 456-7890</p>
                    <p className="text-gray-600">(098) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full text-primary mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-accent hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-primary">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-accent hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-primary">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="bg-accent hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-primary">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-accent hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-primary">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.992 11.115h-2.866V9.01c0-.71.082-1.23 1.562-1.23h1.27V5.01c-.623-.09-1.251-.133-1.879-.13-2.696 0-4.586 1.09-4.586 3.95v2.3H10.5v3.6h2.994V24h3.632V14.7h2.866l.6-3.6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">
                {isQuoteRequest ? 'Request a Quote' : 'Send Us a Message'}
              </h2>
              
              {cartItems.length > 0 && (
                <div className="mb-6 p-4 bg-accent rounded-lg">
                  <h3 className="font-semibold mb-2">Items in Your Cart ({cartItems.length})</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Your cart items will be included in your message.
                  </p>
                  <ul className="text-sm">
                    {cartItems.map(item => (
                      <li key={item.id} className="flex justify-between mb-1">
                        <span>{item.title} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder={isQuoteRequest ? "Quote Request" : "How can we help you?"} 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder={isQuoteRequest 
                      ? "Please describe your project details, timeline, and any specific requirements..." 
                      : "Write your message here..."} 
                  ></textarea>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Sending...' : isQuoteRequest ? 'Request Quote' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-gray-200 rounded-xl h-96 overflow-hidden">
            {/* Placeholder for Google Map */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 font-medium">Google Maps Placeholder</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
