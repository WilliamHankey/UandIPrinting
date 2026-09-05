import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartIcon from "@/components/CartIcon";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSendRequirements = () => {
    setIsOpen(false);
    if (cartItems.length > 0) {
      navigate('/cart');
    } else {
      navigate('/designs');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/logo-vertical.svg"
              alt="U&I Printing Logo"
              className="h-32 w-32 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/designs" className="nav-link">
              Designs
            </Link>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <CartIcon className="text-gray-700 hover:text-primary transition-colors" />
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90"
              onClick={handleSendRequirements}
            >
              Send Requirements
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <CartIcon className="text-gray-700" />
            <button className="p-2" onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b animate-fade-in">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className="nav-link" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/about" className="nav-link" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/designs" className="nav-link" onClick={toggleMenu}>
                Designs
              </Link>
              <Link to="/blog" className="nav-link" onClick={toggleMenu}>
                Blog
              </Link>
              <Link to="/contact" className="nav-link" onClick={toggleMenu}>
                Contact
              </Link>
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 w-full"
                onClick={handleSendRequirements}
              >
                Start Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
