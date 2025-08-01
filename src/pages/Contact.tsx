
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

  // If already submitted, show thank you message
  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your message has been sent successfully. We'll get back to you shortly.
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
                    <p className="text-gray-600">43 St Simon Road, Sunnyside, Cape Town, South Africa</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full text-primary mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-gray-600">uandiprinting@outlook.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-full text-primary mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-gray-600">(27) 72-271-1306
                    </p>
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
                  <a href="https://www.facebook.com/uandiprinting/" className="bg-accent hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-primary">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@uandiprinting" className="bg-accent hover:bg-primary hover:text-white transition-colors p-3 rounded-full text-primary">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
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
              
              <form
                action="https://formsubmit.co/edc075b99ae845a10a31db562ce88fcd"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                {/* Hidden fields for FormSubmit */}
                <input type="hidden" name="_subject" value={`${formData.subject} - U&I Printing`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.href} />
                
                {/* Cart items hidden field */}
                {cartItems.length > 0 && (
                  <input 
                    type="hidden" 
                    name="cart_items" 
                    value={JSON.stringify(cartItems.map(item => ({ 
                      title: item.title, 
                      price: item.price,
                      quantity: item.quantity
                    })))} 
                  />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
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
                      name="email"
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
                    name="subject"
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
                    name="message"
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
          <div className="rounded-xl h-96 overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.8297595540243!2d18.51162327742911!3d-33.97121490420114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc43521b74e3a5%3A0x32683d5562afc0f4!2s43%20St%20Simons%20Rd%2C%20Sunnyside%2C%20Cape%20Town%2C%207764!5e0!3m2!1sen!2sza!4v1753819133872!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="U&I Printing Location - 43 St Simon Road, Sunnyside, Cape Town, South Africa"
            ></iframe>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
