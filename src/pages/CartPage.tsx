import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  
  const isEmpty = items.length === 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de compra</h1>
      
      {isEmpty ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">
            Parece que aún no has añadido ningún producto a tu carrito.
          </p>
          <Button as={Link} to="/catalogo">
            Explorar productos
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">
                  Productos ({items.length})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Vaciar carrito
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.product.sku} item={item} />
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Link 
                  to="/catalogo" 
                  className="flex items-center text-amber-600 hover:text-amber-700"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  <span>Continuar comprando</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:w-80">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
