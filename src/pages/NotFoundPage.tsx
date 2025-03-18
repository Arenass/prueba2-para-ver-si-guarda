import React from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Flame size={64} className="text-amber-600 mx-auto mb-6" />
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Página no encontrada</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button as={Link} to="/">
          Volver al inicio
        </Button>
        <Button variant="outline" as={Link} to="/catalogo">
          Ver catálogo
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
