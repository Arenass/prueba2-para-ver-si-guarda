import React, { useEffect, useState } from 'react';
import { Product, ProductAttribute, ProductAttributeType } from '../../types/product';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';

interface ProductVariantesMasivasProps {
  currentProduct: Product;
  brotherProducts: Product[];
}

interface AttributeValues {
  [attributeId: number]: string[];
}

const ProductVariantesMasivas: React.FC<ProductVariantesMasivasProps> = ({ 
  currentProduct, 
  brotherProducts 
}) => {
  const [attributeTypes, setAttributeTypes] = useState<Record<number, string>>({});
  const [variantAttributes, setVariantAttributes] = useState<ProductAttribute[]>([]);
  const [attributeValues, setAttributeValues] = useState<AttributeValues>({});
  const [selectedValues, setSelectedValues] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  useEffect(() => {
    // Fetch attribute types to display their names
    const fetchAttributeTypes = async () => {
      const { data, error } = await supabase
        .from('productos_atributos_tipos')
        .select('*');
      
      if (error) {
        console.error('Error fetching attribute types:', error);
        return;
      }
      
      if (data) {
        const typesMap: Record<number, string> = {};
        data.forEach((type: ProductAttributeType) => {
          typesMap[type.id_atributo] = type.nombre_atributo;
        });
        setAttributeTypes(typesMap);
      }
    };
    
    // Fetch current product's variant attributes where variante_padre is true
    const fetchVariantAttributes = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('productos_atributos')
        .select('*')
        .eq('sku', currentProduct.sku)
        .eq('variante_padre', true);
      
      if (error) {
        console.error('Error fetching variant attributes:', error);
        setLoading(false);
        return;
      }
      
      if (data && data.length > 0) {
        setVariantAttributes(data);
        
        // Initialize selected values with current product's values
        const initialSelectedValues: Record<number, string> = {};
        data.forEach((attr: ProductAttribute) => {
          if (attr.valor) {
            initialSelectedValues[attr.id_atributo] = attr.valor;
          }
        });
        setSelectedValues(initialSelectedValues);
        
        // Get attribute IDs to look for in brother products
        const attributeIds = data.map(attr => attr.id_atributo);
        
        // Collect all possible values for these attributes from all products
        collectAttributeValues(attributeIds);
      } else {
        setLoading(false);
      }
    };
    
    // Collect all possible attribute values from current and brother products
    const collectAttributeValues = async (attributeIds: number[]) => {
      if (!attributeIds.length) {
        setLoading(false);
        return;
      }
      
      // Get all SKUs (current product and brother products)
      const allSkus = [currentProduct.sku, ...brotherProducts.map(p => p.sku)];
      
      // Fetch all attribute values for these SKUs and attribute IDs directly from the database
      const { data, error } = await supabase
        .from('productos_atributos')
        .select('*')
        .in('sku', allSkus)
        .in('id_atributo', attributeIds)
        .eq('variante_padre', true);
      
      if (error) {
        console.error('Error fetching attribute values:', error);
        setLoading(false);
        return;
      }
      
      // Organize values by attribute ID
      const values: AttributeValues = {};
      attributeIds.forEach(id => {
        values[id] = [];
      });
      
      if (data) {
        data.forEach(attr => {
          if (attr.valor && !values[attr.id_atributo].includes(attr.valor)) {
            values[attr.id_atributo].push(attr.valor);
          }
        });
        
        // Sort values alphabetically
        Object.keys(values).forEach(id => {
          values[Number(id)].sort();
        });
        
        setAttributeValues(values);
      }
      
      setLoading(false);
      
      // Debug log to verify values are being collected
      console.log('Collected attribute values:', values);
      console.log('Brother products:', brotherProducts.map(p => p.sku));
    };
    
    fetchAttributeTypes();
    fetchVariantAttributes();
  }, [currentProduct, brotherProducts]);
  
  const handleAttributeChange = (attributeId: number, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [attributeId]: value
    }));
  };
  
  const findMatchingProduct = async () => {
    setDebugInfo('Buscando producto que coincida con los atributos seleccionados...');
    
    // Get all SKUs (current product and brother products)
    const allSkus = [currentProduct.sku, ...brotherProducts.map(p => p.sku)];
    
    // Get all attribute IDs and their selected values
    const attributeEntries = Object.entries(selectedValues);
    if (attributeEntries.length === 0) {
      setDebugInfo('No hay atributos seleccionados');
      return;
    }
    
    // Log selected values for debugging
    console.log('Selected attribute values:', selectedValues);
    
    try {
      // For each attribute, fetch products that match that attribute value
      const matchingSkus: { [sku: string]: number } = {};
      
      for (const [attrIdStr, selectedValue] of attributeEntries) {
        const attrId = Number(attrIdStr);
        
        // Fetch products with this attribute value
        const { data, error } = await supabase
          .from('productos_atributos')
          .select('sku')
          .in('sku', allSkus)
          .eq('id_atributo', attrId)
          .eq('valor', selectedValue)
          .eq('variante_padre', true);
        
        if (error) {
          console.error(`Error fetching products with attribute ${attrId}=${selectedValue}:`, error);
          continue;
        }
        
        // Count matches for each SKU
        if (data) {
          data.forEach(item => {
            matchingSkus[item.sku] = (matchingSkus[item.sku] || 0) + 1;
          });
        }
      }
      
      // Find SKU that matches all attributes (has count equal to number of attributes)
      const perfectMatchSku = Object.entries(matchingSkus).find(
        ([_, count]) => count === attributeEntries.length
      )?.[0];
      
      console.log('Matching SKUs with counts:', matchingSkus);
      console.log('Perfect match SKU:', perfectMatchSku);
      
      if (perfectMatchSku && perfectMatchSku !== currentProduct.sku) {
        // Navigate to the matching product page
        setDebugInfo(`Navegando a producto: ${perfectMatchSku}`);
        window.location.href = `/producto/${perfectMatchSku}`;
      } else if (perfectMatchSku === currentProduct.sku) {
        setDebugInfo('Ya estás viendo el producto seleccionado');
      } else {
        // If no perfect match, find the best match (most matching attributes)
        const bestMatchSku = Object.entries(matchingSkus).sort((a, b) => b[1] - a[1])[0]?.[0];
        
        if (bestMatchSku && bestMatchSku !== currentProduct.sku) {
          setDebugInfo(`No hay coincidencia perfecta. Navegando a la mejor coincidencia: ${bestMatchSku}`);
          window.location.href = `/producto/${bestMatchSku}`;
        } else {
          setDebugInfo('No se encontró ningún producto que coincida con los atributos seleccionados');
        }
      }
    } catch (error) {
      console.error('Error finding matching product:', error);
      setDebugInfo('Error al buscar producto coincidente');
    }
  };
  
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
      <h3 className="font-medium text-amber-800 mb-2">Información de variantes</h3>
      <p className="text-amber-800 mb-2">
        <span className="font-semibold">SKU:</span> {currentProduct.sku}
      </p>
      
      {loading ? (
        <p className="text-amber-800">Cargando atributos de variante...</p>
      ) : variantAttributes.length > 0 ? (
        <div>
          <p className="text-amber-800 font-semibold mb-3">Selecciona variantes:</p>
          
          {variantAttributes.map((attr) => (
            <div key={attr.id_atributo} className="mb-3">
              <label className="block text-amber-800 font-medium mb-1">
                {attributeTypes[attr.id_atributo] || `Atributo ${attr.id_atributo}`}:
              </label>
              
              <select 
                className="w-full p-2 border border-amber-300 rounded bg-white text-amber-900"
                value={selectedValues[attr.id_atributo] || ''}
                onChange={(e) => handleAttributeChange(attr.id_atributo, e.target.value)}
              >
                {attributeValues[attr.id_atributo]?.length > 0 ? (
                  attributeValues[attr.id_atributo].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))
                ) : (
                  <option value={attr.valor || ''}>{attr.valor || 'No hay valores'}</option>
                )}
              </select>
              
              <p className="text-xs text-amber-700 mt-1">
                ID: {attr.id_atributo} - Valor actual: {attr.valor}
              </p>
            </div>
          ))}
          
          {Object.keys(selectedValues).length > 0 && (
            <Button 
              variant="primary" 
              className="mt-2 bg-amber-600 hover:bg-amber-700"
              onClick={findMatchingProduct}
            >
              Ver variante seleccionada
            </Button>
          )}
          
          {/* Debug info */}
          {debugInfo && (
            <div className="mt-3 p-2 bg-amber-100 border border-amber-300 rounded text-sm text-amber-800">
              {debugInfo}
            </div>
          )}
          
          {/* Debug info - can be removed in production */}
          <div className="mt-4 text-xs text-amber-700">
            <p>Variantes disponibles: {brotherProducts.length}</p>
            <p>SKUs: {[currentProduct.sku, ...brotherProducts.map(p => p.sku)].join(', ')}</p>
          </div>
        </div>
      ) : (
        <p className="text-amber-800">Este producto no tiene atributos de variante padre.</p>
      )}
      
      {brotherProducts.length > 0 && (
        <p className="text-amber-800 mt-2">
          <span className="font-semibold">Variantes relacionadas:</span> {brotherProducts.length}
        </p>
      )}
    </div>
  );
};

export default ProductVariantesMasivas;
