import React from 'react';

const TrustSection: React.FC = () => {
  // Array of placeholder logos - these would be replaced with actual distributor logos
  const distributors = [
    { id: 1, name: 'Distribuidor 1' },
    { id: 2, name: 'Distribuidor 2' },
    { id: 3, name: 'Distribuidor 3' },
    { id: 4, name: 'Distribuidor 4' },
    { id: 5, name: 'Distribuidor 5' },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Confían en nosotros</h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {distributors.map((distributor) => (
            <div 
              key={distributor.id} 
              className="w-32 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center"
            >
              {/* Placeholder for logo */}
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm">{distributor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
