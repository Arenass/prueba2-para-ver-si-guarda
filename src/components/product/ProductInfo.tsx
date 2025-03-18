import React, { useEffect } from 'react';
import { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
  brotherProducts?: Product[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, brotherProducts }) => {
  // Log product data when component mounts or product changes
  useEffect(() => {
    console.log('Product data:', product);
    console.log('Brother products:', brotherProducts);
  }, [product, brotherProducts]);
  
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h3 className="text-lg font-bold mb-2">Información del producto:</h3>
      <p><strong>SKU:</strong> {product.sku || 'No disponible'}</p>
    </div>
  );
};

export default ProductInfo;