import React from 'react';
import { useFilterStore } from '../../store/filterStore';

const ProductSort: React.FC = () => {
  const { sortBy, setSortBy } = useFilterStore();
  
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-by" className="text-gray-700 whitespace-nowrap">
        Ordenar por:
      </label>
      <select
        id="sort-by"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as any)}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      >
        <option value="newest">Más recientes</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="name">Nombre</option>
      </select>
    </div>
  );
};

export default ProductSort;
