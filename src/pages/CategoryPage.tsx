import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ProductCategory } from '../types/product';
import ProductFilters from '../components/catalog/ProductFilters';
import ProductSort from '../components/catalog/ProductSort';
import ProductGrid from '../components/catalog/ProductGrid';
import Button from '../components/ui/Button';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Fetch category details
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('productos_categorias')
          .select('*')
          .eq('id', parseInt(id))
          .single();
        
        if (error) throw error;
        setCategory(data);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategory();
  }, [id]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        {loading ? 'Cargando...' : category?.nombre || 'Categoría'}
      </h1>
      <p className="text-gray-600 mb-8">
        Descubre nuestra selección de productos en esta categoría.
      </p>
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={toggleFilter}
          className="flex items-center gap-2"
        >
          <Filter size={18} />
          <span>Filtros</span>
        </Button>
      </div>
      
      {/* Mobile Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <ProductFilters 
              onApplyFilters={() => {}} 
              isMobile={true} 
              onClose={() => setIsFilterOpen(false)}
              categoryId={id ? parseInt(id) : undefined}
              resultsRef={resultsRef}
            />
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters 
            onApplyFilters={() => {}} 
            categoryId={id ? parseInt(id) : undefined}
            resultsRef={resultsRef}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <ProductSort />
          </div>
          
          {/* Products Grid with Ref for Scrolling */}
          <div ref={resultsRef}>
            <ProductGrid categoryId={id ? parseInt(id) : undefined} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
