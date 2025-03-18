import React, { useState } from 'react';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "¿Qué es una biochimenea y cómo funciona?",
    answer: "Una biochimenea es un sistema de calefacción ecológico que utiliza bioetanol como combustible, ofreciendo una llama real sin humo, cenizas ni necesidad de instalación. Es ideal para crear ambientes cálidos y acogedores en cualquier espacio, combinando diseño y funcionalidad."
  },
  {
    id: 2,
    question: "¿Son seguras las biochimeneas para interiores?",
    answer: "Sí, nuestras biochimeneas están diseñadas con los más altos estándares de seguridad. Incorporan sistemas de protección, como quemadores certificados y materiales resistentes al calor, garantizando un uso seguro en interiores siempre que se sigan las instrucciones de uso."
  },
  {
    id: 3,
    question: "¿Cuánto tiempo dura el bioetanol en una biochimenea?",
    answer: "La duración del combustible depende del modelo y la capacidad del quemador, pero en promedio, un litro de bioetanol puede proporcionar entre 3 y 5 horas de llama continua. Esto las hace eficientes y perfectas para disfrutar de largas veladas."
  },
  {
    id: 4,
    question: "¿Requieren instalación o mantenimiento?",
    answer: "No, las biochimeneas son portátiles y listas para usar. No necesitan instalación ni conexión a gas o electricidad. Además, su mantenimiento es mínimo: basta con limpiar el quemador y la superficie de vez en cuando para mantenerlas en perfecto estado."
  },
  {
    id: 5,
    question: "¿Dónde puedo comprar el bioetanol para mi biochimenea?",
    answer: "Puedes adquirir bioetanol de alta calidad en nuestra tienda online o a través de distribuidores autorizados. Ofrecemos opciones seguras y sostenibles para garantizar el mejor rendimiento de tu biochimenea."
  }
];

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-4 border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left font-medium text-lg py-2 focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="ml-4">
                  {openId === faq.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  )}
                </span>
              </button>
              {openId === faq.id && (
                <div className="mt-2 text-gray-600 pl-2 pr-4 py-2 transition-all duration-300 ease-in-out">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
