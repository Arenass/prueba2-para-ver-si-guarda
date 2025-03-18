import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/product';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCartStore();
  
  // Get the first image or use a placeholder
  const imageUrl = product.imagenes && product.imagenes.length > 0
    ? product.imagenes[0].url_imagen
    : 'https://images.unsplash.com/photo-1544829885-87ac47101088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
  
  // Get the price (use precio_venta if available, otherwise precio_tarifa)
  const price = product.precio_venta || product.precio_tarifa || 0;
  const totalPrice = price * quantity;
  
  const handleIncrement = () => {
    updateQuantity(product.sku, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.sku, quantity - 1);
    } else {
      removeItem(product.sku);
    }
  };
  
  const handleRemove = () => {
    removeItem(product.sku);
  };
  
  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
        <Link to={`/producto/${product.sku}`}>
          <img 
            src={imageUrl} 
            alt={product.nombre} 
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-1 sm:ml-6">
        <div className="flex flex-col sm:flex-row justify-between">
          {/* Product Info */}
          <div className="mb-4 sm:mb-0">
            <Link to={`/producto/${product.sku}`} className="text-lg font-medium text-gray-900 hover:text-amber-600">
              {product.nombre}
            </Link>
            {product.marca && (
              <p className="mt-1 text-sm text-gray-500">{product.marca}</p>
            )}
          </div>
          
          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">{totalPrice.toFixed(2)}€</p>
            <p className="text-sm text-gray-500">{price.toFixed(2)}€ por unidad</p>
          </div>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button 
              onClick={handleDecrement}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Disminuir cantidad"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-1 text-gray-900 font-medium">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Aumentar cantidad"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-500 flex items-center"
          >
            <Trash2 size={18} className="mr-1" />
            <span className="text-sm">Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
