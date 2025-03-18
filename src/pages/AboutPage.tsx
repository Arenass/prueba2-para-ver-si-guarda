import React from 'react';
import { Flame, Leaf, Award, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Sobre nosotros</h1>
      <p className="text-gray-600 mb-8">
        Conoce más sobre nuestra empresa y nuestra pasión por las biochimeneas ecológicas.
      </p>
      
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-16">
        <img 
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Equipo de BioChimeneas" 
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Nuestra historia</h2>
            <p className="text-gray-200 max-w-2xl">
              Desde 2010, nos dedicamos a ofrecer soluciones de calefacción ecológicas y sostenibles para hogares modernos.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-amber-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra misión</h2>
          <p className="text-gray-700">
            Proporcionar soluciones de calefacción innovadoras, ecológicas y seguras que mejoren la calidad de vida de nuestros clientes, respetando el medio ambiente y promoviendo un estilo de vida sostenible.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra visión</h2>
          <p className="text-gray-700">
            Ser líderes en el mercado de biochimeneas y soluciones de calefacción ecológica, reconocidos por nuestra innovación, calidad y compromiso con la sostenibilidad, contribuyendo a un futuro más limpio y responsable.
          </p>
        </div>
      </div>
      
      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-10">Nuestros valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Flame size={24} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovación</h3>
            <p className="text-gray-600">
              Buscamos constantemente nuevas formas de mejorar nuestros productos y servicios para satisfacer las necesidades cambiantes de nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Leaf size={24} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sostenibilidad</h3>
            <p className="text-gray-600">
              Nos comprometemos a ofrecer productos respetuosos con el medio ambiente, reduciendo nuestra huella ecológica y promoviendo prácticas sostenibles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Award size={24} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Calidad</h3>
            <p className="text-gray-600">
              Nos esforzamos por ofrecer productos de la más alta calidad, seguros y duraderos, que superen las expectativas de nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Users size={24} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Servicio</h3>
            <p className="text-gray-600">
              Ponemos a nuestros clientes en el centro de todo lo que hacemos, ofreciendo un servicio personalizado, atento y profesional.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-10">Nuestro equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Carlos Rodríguez" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Carlos Rodríguez</h3>
            <p className="text-amber-600 mb-2">Fundador y CEO</p>
            <p className="text-gray-600">
              Con más de 15 años de experiencia en el sector, Carlos fundó BioChimeneas con la visión de revolucionar el mercado de la calefacción ecológica.
            </p>
          </div>
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Laura Martínez" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Laura Martínez</h3>
            <p className="text-amber-600 mb-2">Directora de Diseño</p>
            <p className="text-gray-600">
              Laura combina funcionalidad y estética para crear biochimeneas que no solo calientan, sino que también embellecen cualquier espacio.
            </p>
          </div>
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Miguel Sánchez" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Miguel Sánchez</h3>
            <p className="text-amber-600 mb-2">Director Técnico</p>
            <p className="text-gray-600">
              Ingeniero especializado en energías renovables, Miguel lidera nuestro equipo de desarrollo para garantizar productos eficientes y seguros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
