
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface CartIconProps {
  className?: string;
}

const CartIcon = ({ className }: CartIconProps) => {
  const { totalItems } = useCart();
  
  return (
    <Link to="/cart" className={cn("relative", className)}>
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
