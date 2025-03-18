import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductVariantesSimplesProps {
  currentProduct: Product;
  brotherProducts: Product[];
}

const ProductVariantesSimples: React.FC<ProductVariantesSimplesProps> = ({ 
  currentProduct, 
  brotherProducts 
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-700 mb-3">Variantes disponibles:</h2>
      <div className="flex flex-wrap gap-2">
        {brotherProducts.map((brotherProduct) => {
          // Get the first image or use a placeholder
          const imageUrl = brotherProduct.imagenes && brotherProduct.imagenes.length > 0
            ? brotherProduct.imagenes[0].url_imagen
            : 'https://images.unsplash.com/photo-1544829885-87ac47101088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
          
          const isCurrentProduct = brotherProduct.sku === currentProduct.sku;
          
          return (
            <Link 
              key={brotherProduct.sku} 
              to={`/producto/${brotherProduct.sku}`}
              className={`block w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                isCurrentProduct ? 'border-amber-500' : 'border-gray-200 hover:border-gray-300'
              }`}
              title={brotherProduct.nombre}
            >
              <img 
                src={imageUrl} 
                alt={brotherProduct.nombre} 
                className="w-full h-full object-cover"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductVariantesSimples;
