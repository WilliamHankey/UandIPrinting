
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/assets/logo-vertical.png" alt="U&I Printing Logo" className="h-10 w-24" />
            </div>
            <p className="text-white/70">
              Professional printing services tailored to bring your creative ideas to life. Quality, reliability, and customer satisfaction guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/uandiprinting/" className="text-white/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@uandiprinting" className="text-white/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/designs" className="text-white/70 hover:text-primary transition-colors">Our Designs</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/designs?category=Business Cards" className="text-white/70 hover:text-primary transition-colors">Business Cards</Link>
              </li>
              <li>
                <Link to="/designs?category=Business Branding" className="text-white/70 hover:text-primary transition-colors">Business Branding</Link>
              </li>
              <li>
                <Link to="/designs?category=Brochures" className="text-white/70 hover:text-primary transition-colors">Brochures & Flyers</Link>
              </li>
              <li>
                <Link to="/designs?category=Posters" className="text-white/70 hover:text-primary transition-colors">Posters & Banners</Link>
              </li>
              <li>
                <Link to="/designs?category=Personalised & Gifting Printing" className="text-white/70 hover:text-primary transition-colors">Personalised & Gifting Printing</Link>
              </li>
              <li>
                <Link to="/designs?category=Marketing Materials" className="text-white/70 hover:text-primary transition-colors">Marketing Materials</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-white/70">43 St Simon Road, Sunnyside, Cape Town, South Africa</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-white/70">(27) 72-271-1306
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-white/70">uandiprinting@outlook.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} U&I Printing. All rights reserved.
          </p>
          <div className="flex mt-4 md:mt-0">
            <a href="#" className="text-white/70 hover:text-primary text-sm mr-4 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-primary text-sm mr-4 transition-colors">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
