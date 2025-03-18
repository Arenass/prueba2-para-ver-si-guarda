import { create } from 'zustand';

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  attributes: Record<number, string[]>;
  searchQuery: string;
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'newest';
  
  setPriceRange: (range: [number, number]) => void;
  toggleBrand: (brand: string) => void;
  toggleAttribute: (attributeId: number, value: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'price-asc' | 'price-desc' | 'name' | 'newest') => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  priceRange: [0, 5000],
  brands: [],
  attributes: {},
  searchQuery: '',
  sortBy: 'newest',
  
  setPriceRange: (range) => set({ priceRange: range }),
  
  toggleBrand: (brand) => set((state) => {
    const brands = state.brands.includes(brand)
      ? state.brands.filter(b => b !== brand)
      : [...state.brands, brand];
    return { brands };
  }),
  
  toggleAttribute: (attributeId, value) => set((state) => {
    const currentValues = state.attributes[attributeId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    return {
      attributes: {
        ...state.attributes,
        [attributeId]: newValues
      }
    };
  }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSortBy: (sort) => set({ sortBy: sort }),
  
  resetFilters: () => set({
    priceRange: [0, 5000],
    brands: [],
    attributes: {},
    searchQuery: '',
    sortBy: 'newest'
  })
}));
