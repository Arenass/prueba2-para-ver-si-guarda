import React from 'react';

const testimonials = [
  {
    id: 1,
    content: "Compré una biochimenea para mi apartamento y ha sido una de las mejores decisiones. Crea un ambiente acogedor sin necesidad de obras ni instalaciones complicadas.",
    author: "María García",
    location: "Madrid"
  },
  {
    id: 2,
    content: "Excelente servicio y productos de gran calidad. La biochimenea que adquirí es exactamente como se mostraba en la web y el envío fue muy rápido.",
    author: "Carlos Rodríguez",
    location: "Barcelona"
  },
  {
    id: 3,
    content: "Buscaba una alternativa ecológica a las chimeneas tradicionales y encontré la solución perfecta. Fácil de usar y mantener, además de ser un elemento decorativo precioso.",
    author: "Laura Martínez",
    location: "Valencia"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <div className="mt-auto">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
