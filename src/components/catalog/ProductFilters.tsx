import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useFilterStore } from '../../store/filterStore';
import { ProductAttributeType } from '../../types/product';
import Button from '../ui/Button';

interface ProductFiltersProps {
  onApplyFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  categoryId?: number;
  resultsRef?: React.RefObject<HTMLDivElement>;
}

interface AttributeValueWithCount {
  value: string;
  count: number;
}

interface BrandWithCount {
  name: string;
  count: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  onApplyFilters, 
  isMobile = false,
  onClose,
  categoryId,
  resultsRef
}) => {
  const [brands, setBrands] = useState<BrandWithCount[]>([]);
  const [attributeTypes, setAttributeTypes] = useState<ProductAttributeType[]>([]);
  const [attributeValues, setAttributeValues] = useState<Record<number, AttributeValueWithCount[]>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: false,
    brands: false
  });
  const [loading, setLoading] = useState(true);
  
  const { 
    priceRange, setPriceRange,
    brands: selectedBrands, toggleBrand,
    attributes: selectedAttributes, toggleAttribute,
    resetFilters
  } = useFilterStore();
  
  // Fetch brands and attribute types
  useEffect(() => {
    const fetchFilterData = async () => {
      setLoading(true);
      try {
        if (!categoryId) {
          setLoading(false);
          return;
        }
        
        // 1. Get all active products in this specific category
        const { data: categoryProducts, error: productsError } = await supabase
          .from('productos')
          .select('sku, marca')
          .eq('id_categoria', categoryId)
          .eq('activo', true);
        
        if (productsError) throw productsError;
        
        if (!categoryProducts || categoryProducts.length === 0) {
          setBrands([]);
          setAttributeTypes([]);
          setAttributeValues({});
          setLoading(false);
          return;
        }
        
        // Extract product SKUs from this category
        const productSkus = categoryProducts.map(p => p.sku);
        
        // Count products by brand
        const brandCounts: Record<string, number> = {};
        categoryProducts.forEach(product => {
          if (product.marca) {
            brandCounts[product.marca] = (brandCounts[product.marca] || 0) + 1;
          }
        });
        
        // Convert to array of brand objects with counts
        const brandsWithCounts = Object.entries(brandCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count); // Sort by count descending
        
        setBrands(brandsWithCounts);
        
        // 2. Fetch category-specific attribute types that should be used for filtering
        const { data: categoryAttributesData, error: categoryAttributesError } = await supabase
          .from('categoria_atributos_filtro')
          .select('id_atributo, orden')
          .eq('id_categoria', categoryId)
          .order('orden', { ascending: true });
        
        if (categoryAttributesError) throw categoryAttributesError;
        
        if (!categoryAttributesData || categoryAttributesData.length === 0) {
          setAttributeTypes([]);
          setAttributeValues({});
          setLoading(false);
          return;
        }
        
        // Get attribute IDs from category-specific data
        const attributeIds = categoryAttributesData.map(item => item.id_atributo);
        
        // 3. Fetch attribute type details
        const { data: attributeTypesData, error: attributeTypesError } = await supabase
          .from('productos_atributos_tipos')
          .select('*')
          .in('id_atributo', attributeIds);
        
        if (attributeTypesError) throw attributeTypesError;
        
        if (!attributeTypesData || attributeTypesData.length === 0) {
          setAttributeTypes([]);
          setAttributeValues({});
          setLoading(false);
          return;
        }
        
        // 4. Get all attribute values ONLY for products in this specific category
        const { data: allAttributeValues, error: attributeValuesError } = await supabase
          .from('productos_atributos')
          .select('id_atributo, valor, sku')
          .in('sku', productSkus)
          .in('id_atributo', attributeIds)
          .not('valor', 'is', null);
        
        if (attributeValuesError) throw attributeValuesError;
        
        if (!allAttributeValues || allAttributeValues.length === 0) {
          setAttributeTypes([]);
          setAttributeValues({});
          setLoading(false);
          return;
        }
        
        // 5. Process attribute values - only include values that have products in this category
        const attributeValuesMap: Record<number, AttributeValueWithCount[]> = {};
        const attributeTypesWithValues: ProductAttributeType[] = [];
        
        // Sort attribute types based on the order from categoria_atributos_filtro
        const sortedAttributeTypes = attributeTypesData.sort((a, b) => {
          const aOrder = categoryAttributesData.find(item => item.id_atributo === a.id_atributo)?.orden || 0;
          const bOrder = categoryAttributesData.find(item => item.id_atributo === b.id_atributo)?.orden || 0;
          return aOrder - bOrder;
        });
        
        // 6. For each attribute type, find values that have products in this category and count them
        for (const attrType of sortedAttributeTypes) {
          // Get values for this attribute type that exist in products of this category
          const valuesForType = allAttributeValues.filter(av => av.id_atributo === attrType.id_atributo);
          
          // Count products for each attribute value
          const valueCounts: Record<string, number> = {};
          
          valuesForType.forEach(av => {
            if (av.valor) {
              valueCounts[av.valor] = (valueCounts[av.valor] || 0) + 1;
            }
          });
          
          // Convert to array of value objects with counts
          const valuesWithCounts = Object.entries(valueCounts)
            .map(([value, count]) => ({ value, count }))
            .filter(item => item.count > 0) // Ensure we only include values with products
            .sort((a, b) => b.count - a.count); // Sort by count descending
          
          // Only include attribute types that have values with products in this category
          if (valuesWithCounts.length > 0) {
            attributeValuesMap[attrType.id_atributo] = valuesWithCounts;
            attributeTypesWithValues.push(attrType);
          }
        }
        
        // Update state with filtered data
        setAttributeTypes(attributeTypesWithValues);
        setAttributeValues(attributeValuesMap);
        
        // Initialize expanded sections (all collapsed by default)
        const newExpandedSections = { ...expandedSections };
        attributeTypesWithValues.forEach(attr => {
          newExpandedSections[`attr_${attr.id_atributo}`] = false;
        });
        setExpandedSections(newExpandedSections);
        
      } catch (error) {
        console.error('Error fetching filter data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilterData();
  }, [categoryId]);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    scrollToResults();
  };
  
  const handleToggleBrand = (brand: string) => {
    toggleBrand(brand);
    onApplyFilters();
    scrollToResults();
  };
  
  const handleToggleAttribute = (attributeId: number, value: string) => {
    toggleAttribute(attributeId, value);
    onApplyFilters();
    scrollToResults();
  };
  
  const handleResetFilters = () => {
    resetFilters();
    onApplyFilters();
    if (isMobile && onClose) {
      onClose();
    }
  };
  
  const scrollToResults = () => {
    if (resultsRef && resultsRef.current) {
      // For mobile, close the filter panel first
      if (isMobile && onClose) {
        onClose();
      }
      
      // Scroll to results with a small delay to allow for state updates
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  if (loading) {
    return (
      <div className={`bg-white ${isMobile ? 'p-4' : 'p-6 rounded-lg shadow-md'}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white ${isMobile ? 'p-4' : 'p-6 rounded-lg shadow-md'}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <h2 className="text-xl font-bold">Filtros</h2>
          <button onClick={onClose} className="text-gray-500">
            <X size={24} />
          </button>
        </div>
      )}
      
      {/* Price Range */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-lg font-semibold">Precio</h3>
          {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.price && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>
            <div className="flex gap-4">
              <input
                type="range"
                min={0}
                max={2000}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min={0}
                max={2000}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Brands */}
      {brands.length > 0 && (
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer" 
            onClick={() => toggleSection('brands')}
          >
            <h3 className="text-lg font-semibold">Marcas</h3>
            {expandedSections.brands ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.brands && (
            <div className="mt-3 space-y-2 pl-3">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand.name}`}
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => handleToggleBrand(brand.name)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`brand-${brand.name}`} className="ml-2 text-gray-700">
                      {brand.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {brand.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Attribute Types - Each as its own expandable section */}
      {attributeTypes.map((attrType) => {
        // Ensure we have values for this attribute type
        const values = attributeValues[attrType.id_atributo] || [];
        
        return (
          <div key={attrType.id_atributo} className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection(`attr_${attrType.id_atributo}`)}
            >
              <h3 className="text-lg font-semibold">{attrType.nombre_atributo}</h3>
              {expandedSections[`attr_${attrType.id_atributo}`] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedSections[`attr_${attrType.id_atributo}`] && values.length > 0 && (
              <div className="mt-3 space-y-2 pl-3">
                {values.map((item) => (
                  <div key={`${attrType.id_atributo}-${item.value}`} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`attr-${attrType.id_atributo}-${item.value}`}
                        checked={(selectedAttributes[attrType.id_atributo] || []).includes(item.value)}
                        onChange={() => handleToggleAttribute(attrType.id_atributo, item.value)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`attr-${attrType.id_atributo}-${item.value}`} className="ml-2 text-gray-700">
                        {item.value}
                      </label>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button variant="outline" onClick={handleResetFilters} fullWidth>
          Restablecer
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
