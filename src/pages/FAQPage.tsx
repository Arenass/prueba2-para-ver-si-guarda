import React from 'react';
import FAQSection from '../components/home/FAQSection';

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Preguntas Frecuentes</h1>
            <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestras biochimeneas, su funcionamiento y mantenimiento.
            </p>
          </div>
        </div>
        
        <FAQSection />
      </div>
    </div>
  );
};

export default FAQPage;
