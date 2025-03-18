import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const DistribuidoresPage: React.FC = () => {
  // Sample distributors data
  const distribuidores = [
    {
      id: 1,
      nombre: "BioChimeneas Madrid Centro",
      direccion: "Calle Gran Vía 42, 28013 Madrid",
      telefono: "+34 912 345 678",
      email: "madrid@biochimeneas.com",
      horario: "Lun-Vie: 10:00-20:00, Sáb: 10:00-14:00"
    },
    {
      id: 2,
      nombre: "BioChimeneas Barcelona",
      direccion: "Avinguda Diagonal 423, 08008 Barcelona",
      telefono: "+34 932 345 678",
      email: "barcelona@biochimeneas.com",
      horario: "Lun-Vie: 10:00-20:00, Sáb: 10:00-14:00"
    },
    {
      id: 3,
      nombre: "BioChimeneas Valencia",
      direccion: "Calle Colón 34, 46004 Valencia",
      telefono: "+34 962 345 678",
      email: "valencia@biochimeneas.com",
      horario: "Lun-Vie: 10:00-20:00, Sáb: 10:00-14:00"
    },
    {
      id: 4,
      nombre: "BioChimeneas Sevilla",
      direccion: "Avenida de la Constitución 20, 41004 Sevilla",
      telefono: "+34 952 345 678",
      email: "sevilla@biochimeneas.com",
      horario: "Lun-Vie: 10:00-20:00, Sáb: 10:00-14:00"
    },
    {
      id: 5,
      nombre: "BioChimeneas Bilbao",
      direccion: "Gran Vía de Don Diego López de Haro 12, 48001 Bilbao",
      telefono: "+34 942 345 678",
      email: "bilbao@biochimeneas.com",
      horario: "Lun-Vie: 10:00-20:00, Sáb: 10:00-14:00"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Distribuidores Oficiales</h1>
      <p className="text-gray-600 mb-8">
        Encuentra tu distribuidor BioChimeneas más cercano y visítanos para conocer nuestros productos.
      </p>
      
      {/* Distributors Map */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <div className="aspect-video w-full bg-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Mapa de distribuidores (Integración con Google Maps)</p>
        </div>
      </div>
      
      {/* Distributors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {distribuidores.map(distribuidor => (
          <div key={distribuidor.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{distribuidor.nombre}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-brand-red flex-shrink-0 mt-1" />
                <span>{distribuidor.direccion}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-red flex-shrink-0" />
                <span>{distribuidor.telefono}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-brand-red flex-shrink-0" />
                <span>{distribuidor.email}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Horario:</span> {distribuidor.horario}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Become a Distributor */}
      <div className="mt-12 bg-amber-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">¿Quieres ser distribuidor?</h2>
        <p className="mb-6">
          Si estás interesado en convertirte en distribuidor oficial de BioChimeneas, 
          ponte en contacto con nosotros y te informaremos de todos los detalles.
        </p>
        <a 
          href="/contacto" 
          className="inline-block bg-brand-red text-white px-6 py-3 rounded-md font-medium hover:bg-brand-red/90 transition-colors"
        >
          Contactar
        </a>
      </div>
    </div>
  );
};

export default DistribuidoresPage;
