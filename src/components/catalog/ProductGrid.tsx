import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types/product';
import { useFilterStore } from '../../store/filterStore';
import ProductCard from '../ui/ProductCard';

interface ProductGridProps {
  categoryId?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  const { 
    priceRange, 
    brands, 
    attributes, 
    searchQuery, 
    sortBy 
  } = useFilterStore();
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        // Start building the query
        let query = supabase
          .from('productos')
          .select('*', { count: 'exact' })
          .eq('activo', true)
          .gte('precio_venta', priceRange[0])
          .lte('precio_venta', priceRange[1]);
        
        // Filter by category if provided, otherwise use the default category 570 (biochimeneas)
        if (categoryId) {
          query = query.eq('id_categoria', categoryId);
        } else {
          query = query.eq('id_categoria', 570);
        }
        
        // Apply brand filter if any brands are selected
        if (brands.length > 0) {
          query = query.in('marca', brands);
        }
        
        // Apply search query if present
        if (searchQuery) {
          query = query.ilike('nombre', `%${searchQuery}%`);
        }
        
        // Apply sorting
        switch (sortBy) {
          case 'price-asc':
            query = query.order('precio_venta', { ascending: true });
            break;
          case 'price-desc':
            query = query.order('precio_venta', { ascending: false });
            break;
          case 'name':
            query = query.order('nombre', { ascending: true });
            break;
          case 'newest':
          default:
            query = query.order('created_at', { ascending: false });
            break;
        }
        
        // Execute the query
        const { data: productsData, error: productsError, count } = await query;
        
        if (productsError) throw productsError;
        
        if (count !== null) {
          setTotalCount(count);
        }
        
        // Get images for these products
        if (productsData && productsData.length > 0) {
          const skus = productsData.map(product => product.sku);
          
          const { data: imagesData, error: imagesError } = await supabase
            .from('productos_imagenes')
            .select('*')
            .in('sku', skus)
            .order('orden', { ascending: true });
          
          if (imagesError) throw imagesError;
          
          // Get attributes for these products if we have attribute filters
          let attributesData: any[] = [];
          if (Object.keys(attributes).length > 0) {
            const { data: attrData, error: attrError } = await supabase
              .from('productos_atributos')
              .select('*')
              .in('sku', skus);
            
            if (attrError) throw attrError;
            attributesData = attrData || [];
          }
          
          // Combine products with their images and attributes
          let productsWithData = productsData.map(product => ({
            ...product,
            imagenes: imagesData?.filter(img => img.sku === product.sku) || [],
            atributos: attributesData?.filter(attr => attr.sku === product.sku) || []
          }));
          
          // Filter by attributes if any are selected
          if (Object.keys(attributes).length > 0) {
            productsWithData = productsWithData.filter(product => {
              // For each attribute type that has selected values
              return Object.entries(attributes).every(([attrId, selectedValues]) => {
                // If no values are selected for this attribute type, don't filter by it
                if (selectedValues.length === 0) return true;
                
                // Check if the product has any of the selected values for this attribute type
                const productAttrValues = product.atributos
                  ?.filter(attr => attr.id_atributo === parseInt(attrId))
                  .map(attr => attr.valor);
                
                return productAttrValues?.some(val => selectedValues.includes(val || ''));
              });
            });
          }
          
          setProducts(productsWithData);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [priceRange, brands, attributes, searchQuery, sortBy, categoryId]);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
        <p className="text-gray-500">Intenta cambiar los filtros o buscar con otros términos.</p>
      </div>
    );
  }
  
  return (
    <div>
      <p className="text-gray-500 mb-4">Mostrando {products.length} de {totalCount} productos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
