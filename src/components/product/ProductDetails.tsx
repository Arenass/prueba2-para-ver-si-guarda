import React, { useState } from 'react';
import { Product } from '../../types/product';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  
  const tabs = [
    { id: 'description', label: 'Descripción' },
    { id: 'specifications', label: 'Especificaciones' },
    { id: 'shipping', label: 'Envío y devoluciones' }
  ];
  
  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            {product.descripcion_larga ? (
              <div dangerouslySetInnerHTML={{ __html: product.descripcion_larga }} />
            ) : (
              <p className="text-gray-500">
                {product.descripcion_corta || 'No hay descripción detallada disponible para este producto.'}
              </p>
            )}
          </div>
        )}
        
        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Especificaciones técnicas</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {product.marca && (
                    <tr>
                      <th scope="row" className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Marca</th>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.marca}</td>
                    </tr>
                  )}
                  {product.ean && (
                    <tr>
                      <th scope="row" className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">EAN</th>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.ean}</td>
                    </tr>
                  )}
                  {(product.alto || product.ancho || product.profundo) && (
                    <tr>
                      <th scope="row" className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Dimensiones (Alto x Ancho x Profundo)</th>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.alto || '?'} x {product.ancho || '?'} x {product.profundo || '?'} cm
                      </td>
                    </tr>
                  )}
                  {product.peso && (
                    <tr>
                      <th scope="row" className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Peso</th>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.peso} kg</td>
                    </tr>
                  )}
                  {/* Display product attributes if available */}
                  {product.atributos?.map((attr, index) => (
                    <tr key={`${attr.sku}-${attr.id_atributo}-${index}`}>
                      <th scope="row" className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        {attr.nombre_atributo || `Atributo ${attr.id_atributo}`}
                      </th>
                      <td className="px-4 py-3 text-sm text-gray-900">{attr.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Envío</h3>
              <p className="text-gray-700">
                Realizamos envíos a toda la península española. Los gastos de envío son gratuitos para pedidos superiores a 100€. 
                Para pedidos inferiores, el coste de envío es de 5,95€.
              </p>
              <p className="text-gray-700 mt-2">
                El plazo de entrega habitual es de 2-3 días laborables desde la confirmación del pedido.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Devoluciones</h3>
              <p className="text-gray-700">
                Dispones de 30 días desde la recepción del producto para realizar devoluciones. 
                El producto debe estar en perfecto estado y con su embalaje original.
              </p>
              <p className="text-gray-700 mt-2">
                Para iniciar una devolución, contacta con nuestro servicio de atención al cliente.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
