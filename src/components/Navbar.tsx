
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartIcon from "@/components/CartIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="public\assests\d279374b-8a07-4802-80cc-711783b55c2c.png" alt="U&I Printing Logo" className="h-12 w-12 object-contain" />
            <span className="font-semibold text-xl">U&I Printing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/designs" className="nav-link">Designs</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <CartIcon className="text-gray-700 hover:text-primary transition-colors" />
            <Button variant="default" className="bg-primary hover:bg-primary/90">
              Send Requirements
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <CartIcon className="text-gray-700" />
            <button className="p-2" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b animate-fade-in">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
              <Link to="/designs" className="nav-link" onClick={toggleMenu}>Designs</Link>
              <Link to="/blog" className="nav-link" onClick={toggleMenu}>Blog</Link>
              <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
              <Button variant="default" className="bg-primary hover:bg-primary/90 w-full">
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
