
import React from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface DesignCardProps {
  image: string;
  title: string;
  category: string;
  price: number;
  id?: string;
}

const DesignCard = ({ image, title, category, price, id = '1' }: DesignCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({ id, title, image, category, price });
    
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart`,
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Button 
            size="sm" 
            variant="secondary" 
            className="rounded-full"
            asChild
          >
            <Link to={`/designs/${id}?action=preview`}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button 
            size="sm" 
            className="rounded-full bg-primary hover:bg-primary/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium bg-accent text-primary px-3 py-1 rounded-full">{category}</span>
          <span className="font-bold text-primary">${price.toFixed(2)}</span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">⭐</span>
            <span>4.8 (24)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
