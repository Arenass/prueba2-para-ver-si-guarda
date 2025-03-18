import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types/product';

interface RelatedProductsProps {
  currentProductSku: string;
  categoryId: number | null;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  currentProductSku, 
  categoryId 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) {
        setLoading(false);
        return;
      }
      
      try {
        // Get products from the same category, excluding the current product
        const { data: productsData, error: productsError } = await supabase
          .from('productos')
          .select('*')
          .eq('id_categoria', categoryId)
          .eq('activo', true)
          .neq('sku', currentProductSku)
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (productsError) throw productsError;
        
        // Get images for these products
        if (productsData && productsData.length > 0) {
          const skus = productsData.map(product => product.sku);
          
          const { data: imagesData, error: imagesError } = await supabase
            .from('productos_imagenes')
            .select('*')
            .in('sku', skus)
            .order('orden', { ascending: true });
          
          if (imagesError) throw imagesError;
          
          // Combine products with their images
          const productsWithImages = productsData.map(product => ({
            ...product,
            imagenes: imagesData?.filter(img => img.sku === product.sku) || []
          }));
          
          setProducts(productsWithImages);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRelatedProducts();
  }, [currentProductSku, categoryId]);
  
  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg aspect-square animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map(product => {
          // Get the first image or use a placeholder
          const imageUrl = product.imagenes && product.imagenes.length > 0
            ? product.imagenes[0].url_imagen
            : 'https://images.unsplash.com/photo-1544829885-87ac47101088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
          
          // Calculate discount percentage if both prices are available
          const hasDiscount = product.precio_tarifa && product.precio_venta && product.precio_venta < product.precio_tarifa;
          const discountPercentage = hasDiscount
            ? Math.round(((product.precio_tarifa - product.precio_venta) / product.precio_tarifa) * 100)
            : 0;
          
          return (
            <Link 
              key={product.sku} 
              to={`/producto/${product.sku}`}
              className="block relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              {hasDiscount && (
                <div className="absolute top-2 right-2 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  -{discountPercentage}%
                </div>
              )}
              <div className="aspect-square">
                <img 
                  src={imageUrl} 
                  alt={product.nombre} 
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
