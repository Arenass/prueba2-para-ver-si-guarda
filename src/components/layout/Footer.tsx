import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ProductCategory } from '../../types/product';

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  // Fetch categories that belong to supercategory 570
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('productos_categorias')
          .select('*')
          .eq('id_supercategoria', 570)
          .order('nombre', { ascending: true })
          .limit(5);
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <footer className="bg-brand-black text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Flame size={24} className="text-brand-red" />
              <div className="font-bold">
                <span className="text-xl text-white">bio</span>
                <span className="text-xl text-brand-red">chimeneas</span>
              </div>
            </div>
            <p className="mb-4">
              Especialistas en chimeneas ecológicas y sostenibles para crear ambientes cálidos y acogedores en tu hogar.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-brand-red transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-brand-red transition-colors">Catálogo</Link></li>
              <li><Link to="/nosotros" className="hover:text-brand-red transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/preguntas-frecuentes" className="hover:text-brand-red transition-colors">FAQs</Link></li>
              <li><Link to="/distribuidores" className="hover:text-brand-red transition-colors">Distribuidores</Link></li>
              <li><Link to="/contacto" className="hover:text-brand-red transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categorías</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <Link to={`/categoria/${category.id}`} className="hover:text-brand-red transition-colors">
                    {category.nombre}
                  </Link>
                </li>
              ))}
              <li><Link to="/catalogo" className="hover:text-brand-red transition-colors">Ver todas</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-brand-red flex-shrink-0 mt-1" />
                <span>Calle Ejemplo 123, 28001 Madrid, España</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-red flex-shrink-0" />
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-brand-red flex-shrink-0" />
                <span>info@biochimeneas.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} BioChimeneas. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacidad" className="hover:text-brand-red transition-colors">Política de privacidad</Link>
            <Link to="/terminos" className="hover:text-brand-red transition-colors">Términos y condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
