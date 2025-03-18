import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types/product';
import ProductCard from '../ui/ProductCard';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Get 6 different products to showcase variety
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .eq('id_supercategoria', 570)
          .eq('activo', true)
          .order('created_at', { ascending: false })
          .limit(6);
        
        if (error) throw error;
        
        // Get images for these products
        if (data && data.length > 0) {
          const skus = data.map(product => product.sku);
          
          const { data: imagesData, error: imagesError } = await supabase
            .from('productos_imagenes')
            .select('*')
            .in('sku', skus)
            .order('orden', { ascending: true });
          
          if (imagesError) throw imagesError;
          
          // Combine products with their images
          const productsWithImages = data.map(product => ({
            ...product,
            imagenes: imagesData?.filter(img => img.sku === product.sku) || []
          }));
          
          setProducts(productsWithImages);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Productos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Productos destacados</h2>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos destacados disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
