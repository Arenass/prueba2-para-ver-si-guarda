import React from 'react';
import { Flame, Leaf, Palette, ThermometerSun } from 'lucide-react';

const benefits = [
  {
    icon: <Flame size={24} className="text-brand-red" />,
    title: 'Sin humo ni cenizas',
    description: 'Disfruta de un fuego real sin preocuparte por el humo, las cenizas o los olores desagradables.'
  },
  {
    icon: <Leaf size={24} className="text-brand-red" />,
    title: 'Ecológicas',
    description: 'Utilizan bioetanol, un combustible renovable que no emite gases tóxicos ni contamina el ambiente.'
  },
  {
    icon: <Palette size={24} className="text-brand-red" />,
    title: 'Diseño moderno',
    description: 'Disponibles en diversos estilos y tamaños para adaptarse perfectamente a la decoración de tu hogar.'
  },
  {
    icon: <ThermometerSun size={24} className="text-brand-red" />,
    title: 'Calor eficiente',
    description: 'Proporcionan un calor agradable y eficiente para crear ambientes acogedores en cualquier espacio.'
  }
];

const Benefits: React.FC = () => {
  return (
    <div className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Ventajas de las biochimeneas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
