import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Por favor, selecciona un asunto';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Here you would typically send the form data to your backend
      console.log('Form data:', formData);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
      
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-medium text-green-800 mb-2">¡Mensaje enviado!</h3>
          <p className="text-green-700 mb-4">
            Gracias por contactar con nosotros. Te responderemos lo antes posible.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="outline"
          >
            Enviar otro mensaje
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-amber-500 focus:border-amber-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-amber-500 focus:border-amber-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          
          {/* Subject */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Asunto *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-amber-500 focus:border-amber-500 ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona un asunto</option>
              <option value="Información de producto">Información de producto</option>
              <option value="Pedido">Consulta sobre pedido</option>
              <option value="Devolución">Devolución</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
          </div>
          
          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-amber-500 focus:border-amber-500 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>
          
          <Button type="submit" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
            <Send size={18} />
            <span>Enviar mensaje</span>
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
