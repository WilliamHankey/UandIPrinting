import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useDesigns } from '@/hooks/useDesigns';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const DesignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { designs, loading, error } = useDesigns();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [specValues, setSpecValues] = useState<Record<string, any>>({});

  const design = designs?.find((d) => d._id === id);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Design not found</h1>
            <p className="text-gray-600 mb-8">The design you're looking for doesn't exist or may have been removed.</p>
            <Button asChild>
              <Link to="/designs">Back to Designs</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSpecChange = (specName: string, value: any) => {
    setSpecValues(prev => ({
      ...prev,
      [specName]: value
    }));
  };

  const calculateTotalPrice = () => {
    let pricePerItem = design.basePrice || design.price || 0;
    let quantity = 1;

    if (design.specifications) {
      Object.entries(specValues).forEach(([specName, value]) => {
        const spec = design.specifications!.find(s => s.name === specName);
        if (spec?.type === 'select' && spec.options) {
          const option = spec.options.find(opt => opt.value === value);
          if (option) {
            pricePerItem += option.price;
          }
        } else if (spec?.type === 'number') {
          const numValue = parseInt(value) || 1;
          if (specName.toLowerCase().includes('quantity') || specName.toLowerCase().includes('qty')) {
            quantity = numValue;
          }
        }
      });
    }
    return pricePerItem * quantity;
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${design._id}-${Date.now()}`,
      title: design.title,
      image: design.image,
      category: design.category,
      price: calculateTotalPrice(),
      specifications: specValues,
      basePrice: design.basePrice || design.price
    };
    addToCart(cartItem);
    setSpecValues({});
    toast({
      title: "Added to cart",
      description: `${design.title} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 bg-accent">
        <div className="container mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/designs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Designs
            </Link>
          </Button>
          <span className="text-xs font-medium bg-primary text-white px-3 py-1 rounded-full">{design.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">{design.title}</h1>
          <div className="flex items-center text-gray-600">
            <span className="mr-1">⭐</span>
            <span>{design.rating?.toFixed(1) || '0.0'} ({design.reviewCount || 0} reviews)</span>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={design.image || '/assets/hero-image.png'}
                alt={design.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">About This Design</h2>
                <p className="text-gray-600">
                  {design.description || 'A professionally crafted design ready to be customized to your exact requirements.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Customize Your Order</h3>
                  <span className="text-lg font-bold text-primary">From R{(design.basePrice || design.price || 0).toFixed(2)}</span>
                </div>

                <div className="space-y-4">
                  {design.specifications && design.specifications.length > 0 ? (
                    design.specifications.map((spec) => (
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
                    <p className="text-gray-500 text-sm">No customization options available for this item.</p>
                  )}
                </div>

                <div className="pt-4 border-t mt-6">
                  <p className="text-xl font-bold mb-4">Total: R{calculateTotalPrice().toFixed(2)}</p>
                  <Button
                    className="w-full mb-3"
                    onClick={handleAddToCart}
                    disabled={design.specifications && design.specifications.length > 0 && !Object.keys(specValues).length}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/designs">Continue Browsing</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DesignDetail;
