import React from 'react';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';

const CartSummary: React.FC = () => {
  const { items, getTotalPrice } = useCartStore();
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 5.95;
  const total = subtotal + shipping;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen del pedido</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} productos)</span>
          <span className="font-medium">{subtotal.toFixed(2)}€</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Gastos de envío</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Gratis</span>
          ) : (
            <span className="font-medium">{shipping.toFixed(2)}€</span>
          )}
        </div>
        
        {shipping > 0 && (
          <div className="text-sm text-gray-500">
            Envío gratuito en pedidos superiores a 100€
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
        </div>
      </div>
      
      <div className="mt-6">
        <Button fullWidth size="lg">
          Finalizar compra
        </Button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Aceptamos Visa, Mastercard, PayPal y transferencia bancaria
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
