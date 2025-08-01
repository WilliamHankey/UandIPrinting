import React, { useState } from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { urlFor } from '@/lib/sanity';

interface Contributor {
  name: string;
  avatar: string;
}

interface Specification {
  name: string;
  type: 'select' | 'text' | 'number' | 'checkbox';
  options?: Array<{
    label: string;
    value: string;
    price: number;
  }>;
  required: boolean;
  placeholder?: string;
}

interface DesignCardProps {
  _id: string;
  image: string | { asset: { _ref: string } };
  title: string;
  category: string;
  description?: string;
  basePrice: number;
  specifications?: Specification[];
  rating: number;
  reviewCount: number;
  contributors: Contributor[];
}

const DesignCard = ({ 
  _id, 
  image, 
  title, 
  category, 
  description,
  basePrice, 
  specifications = [],
  rating, 
  reviewCount,
  contributors 
}: DesignCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specValues, setSpecValues] = useState<Record<string, any>>({});
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleSpecChange = (specName: string, value: any) => {
    setSpecValues(prev => ({
      ...prev,
      [specName]: value
    }));
  };

  const calculateTotalPrice = () => {
    // Calculate price per item
    let pricePerItem = basePrice || 0;
    let quantity = 1;
    
    if (specifications) {
      Object.entries(specValues).forEach(([specName, value]) => {
        const spec = specifications.find(s => s.name === specName);
        
        if (spec?.type === 'select' && spec.options) {
          const option = spec.options.find(opt => opt.value === value);
          if (option) {
            pricePerItem += option.price;
          }
        } else if (spec?.type === 'number') {
          // If it's a number field, check if it's a quantity field
          const numValue = parseInt(value) || 1;
          if (specName.toLowerCase().includes('quantity') || specName.toLowerCase().includes('qty')) {
            quantity = numValue;
          }
        }
      });
    }
    
    // Return total price (price per item × quantity)
    return pricePerItem * quantity;
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${_id}-${Date.now()}`, // Unique ID for each configuration
      title: title,
      image: image,
      category: category,
      price: calculateTotalPrice(),
      specifications: specValues,
      basePrice: basePrice
    };
    
    addToCart(cartItem);
    setIsModalOpen(false);
    setSpecValues({});
    
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart`,
    });
  };

  // Function to get the image URL
  const getImageUrl = (image: string | { asset: { _ref: string } }) => {
    if (typeof image === 'string') {
      return image;
    }
    if (image?.asset?._ref) {
      return urlFor(image).url();
    }
    return ''; // Fallback empty string or you could use a default image
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={getImageUrl(image)} 
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
            <Link to={`/designs/${_id}?action=preview`}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Select Options
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Customize {title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {specifications && specifications.length > 0 ? (
                  specifications.map((spec) => (
                    <div key={spec.name} className="space-y-2">
                      <Label>
                        {spec.name} {spec.required && <span className="text-red-500">*</span>}
                      </Label>
                      
                      {spec.type === 'select' && spec.options && (
                        <Select 
                          value={specValues[spec.name] || ''} 
                          onValueChange={(value) => handleSpecChange(spec.name, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={spec.placeholder || `Select ${spec.name}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {spec.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label} {option.price > 0 && `(+R${option.price.toFixed(2)})`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      {spec.type === 'text' && (
                        <Input
                          placeholder={spec.placeholder}
                          value={specValues[spec.name] || ''}
                          onChange={(e) => handleSpecChange(spec.name, e.target.value)}
                        />
                      )}
                      
                      {spec.type === 'number' && (
                        <Input
                          type="number"
                          placeholder={spec.placeholder}
                          value={specValues[spec.name] || ''}
                          onChange={(e) => handleSpecChange(spec.name, e.target.value)}
                        />
                      )}
                      
                      {spec.type === 'checkbox' && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={specValues[spec.name] || false}
                            onCheckedChange={(checked) => handleSpecChange(spec.name, checked)}
                          />
                          <Label>{spec.name}</Label>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No customization options available for this item.
                  </p>
                )}
                
                <div className="pt-4 border-t">
                  <p className="text-lg font-bold">
                    Total: R{calculateTotalPrice().toFixed(2)}
                  </p>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="w-full"
                  disabled={specifications && specifications.length > 0 && !Object.keys(specValues).length}
                >
                  Add to Cart
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium bg-accent text-primary px-3 py-1 rounded-full">{category}</span>
          <span className="font-bold text-primary">From R{(basePrice || 0).toFixed(2)}</span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        {description && (
          <p className="text-gray-600 mt-2 text-sm">{description}</p>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex -space-x-2">
            {contributors?.slice(0, 3).map((contributor, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img 
                  src={getImageUrl(contributor.avatar)} 
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">⭐</span>
            <span>{rating.toFixed(1)} ({reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
