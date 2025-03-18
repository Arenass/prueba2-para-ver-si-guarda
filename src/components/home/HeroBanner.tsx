import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-brand-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Biochimenea en un hogar moderno" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Calor y diseño sin humo ni contaminación
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Descubre nuestras biochimeneas ecológicas que combinan elegancia, sostenibilidad y confort para crear ambientes únicos en tu hogar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" as={Link} to="/catalogo">
              Ver catálogo
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" as={Link} to="/nosotros">
              Conoce más
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
