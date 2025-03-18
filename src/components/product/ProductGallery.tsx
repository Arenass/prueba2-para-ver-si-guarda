import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from '../../types/product';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // If no images, use a placeholder
  const displayImages = images.length > 0 
    ? images 
    : [{ 
        sku: 'placeholder', 
        url_imagen: 'https://images.unsplash.com/photo-1544829885-87ac47101088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 
        orden: 0 
      }];
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="relative">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
        <img 
          src={displayImages[currentIndex].url_imagen} 
          alt={`${productName} - Imagen ${currentIndex + 1}`} 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Navigation Arrows */}
      {displayImages.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
      
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={`${image.sku}-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                index === currentIndex ? 'border-amber-500' : 'border-transparent'
              }`}
            >
              <img 
                src={image.url_imagen} 
                alt={`${productName} - Miniatura ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
