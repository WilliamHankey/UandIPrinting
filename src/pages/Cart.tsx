
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { sendOrderNotifications } from '@/lib/notifications';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart, getImageUrl } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    try {
      await sendOrderNotifications(cartItems, totalPrice);
      
      toast({
        title: "Order Sent via WhatsApp",
        description: "Your order details have been opened in WhatsApp. Press send to confirm your order.",
      });
      
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Order notification error:', error);
      toast({
        title: "Order Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderSpecifications = (specifications: Record<string, any>) => {
    if (!specifications || Object.keys(specifications).length === 0) {
      return null;
    }

    return (
      <div className="mt-2 text-sm text-gray-600">
        <p className="font-medium mb-1">Specifications:</p>
        <div className="space-y-1">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize">{key}:</span>
              <span className="font-medium">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any designs to your cart yet.</p>
              <Button asChild>
                <Link to="/designs">Browse Designs</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden shrink-0">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      
                      {renderSpecifications(item.specifications)}
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                            className="px-2 py-1 border-r disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="px-2 py-1 border-l"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="font-semibold">
                          R{(item.price * (item.quantity || 1)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items ({totalItems})</span>
                      <span>R{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-3 font-semibold flex justify-between">
                      <span>Total</span>
                      <span>R{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/designs">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
