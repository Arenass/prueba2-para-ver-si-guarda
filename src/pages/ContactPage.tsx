import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Contacto</h1>
      <p className="text-gray-600 mb-8">
        Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros para cualquier consulta.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactForm />
        <ContactInfo />
      </div>
      
      {/* Map */}
      <div className="mt-12 rounded-lg overflow-hidden h-96 bg-gray-100">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12143.354068973692!2d-3.6881180302246036!3d40.42510749999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2zTWFkcmlkLCBFc3Bhw7Fh!5e0!3m2!1ses!2ses!4v1623245543531!5m2!1ses!2ses" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="Ubicación de la tienda"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
