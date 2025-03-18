import React, { useState } from 'react';
import Button from '../ui/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, introduce un email válido');
      return;
    }
    
    // Here you would typically send this to your backend or newsletter service
    console.log('Subscribing email:', email);
    
    // Show success message
    setIsSubmitted(true);
    setError('');
    setEmail('');
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="bg-brand-red py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Mantente informado
          </h2>
          <p className="text-red-100 mb-8">
            Suscríbete a nuestro newsletter para recibir las últimas novedades, ofertas exclusivas y consejos sobre biochimeneas.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white p-4 rounded-lg">
              <p className="text-green-600 font-medium">¡Gracias por suscribirte! Pronto recibirás nuestras novedades.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                  aria-label="Dirección de correo electrónico"
                />
                {error && <p className="mt-2 text-red-200 text-sm text-left">{error}</p>}
              </div>
              <Button 
                type="submit" 
                variant="secondary" 
                size="lg"
                className="whitespace-nowrap"
              >
                Suscribirme
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
