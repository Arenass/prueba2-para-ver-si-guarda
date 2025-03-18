import React, { useState, useRef } from 'react';
import { Filter, X } from 'lucide-react';
import ProductFilters from '../components/catalog/ProductFilters';
import ProductSort from '../components/catalog/ProductSort';
import ProductGrid from '../components/catalog/ProductGrid';
import Button from '../components/ui/Button';

const CatalogPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleApplyFilters = () => {
    // This function is now just for compatibility, as filters apply automatically
    // It could be used for analytics tracking or other side effects
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Biochimeneas</h1>
      <p className="text-gray-600 mb-8">
        Descubre nuestra selección de biochimeneas ecológicas para crear ambientes cálidos y acogedores.
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
              onApplyFilters={handleApplyFilters} 
              isMobile={true} 
              onClose={() => setIsFilterOpen(false)}
              resultsRef={resultsRef}
            />
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters 
            onApplyFilters={handleApplyFilters}
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
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
