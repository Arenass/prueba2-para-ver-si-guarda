import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Flame, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ProductCategory } from '../../types/product';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChimeneasOpen, setIsChimeneasOpen] = useState(false);
  const [isAccesoriosOpen, setIsAccesoriosOpen] = useState(false);
  const [isAyudaOpen, setIsAyudaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleChimeneas = () => setIsChimeneasOpen(!isChimeneasOpen);
  const toggleAccesorios = () => setIsAccesoriosOpen(!isAccesoriosOpen);
  const toggleAyuda = () => setIsAyudaOpen(!isAyudaOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsChimeneasOpen(false);
    setIsAccesoriosOpen(false);
    setIsAyudaOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  // Chimeneas submenu items
  const chimeneasItems = [
    { id: 1, nombre: "de suelo", path: "/categoria/560" },
    { id: 2, nombre: "de pared", path: "/categoria/562" },
    { id: 3, nombre: "de mesa", path: "/categoria/563" }
  ];
  
  // Accesorios submenu items
  const accesoriosItems = [
    { id: 1, nombre: "Biocombustible", path: "/categoria/565" },
    { id: 2, nombre: "Herramientas y repuestos", path: "/categoria/561" }
  ];
  
  // Ayuda submenu items
  const ayudaItems = [
    { id: 1, nombre: "FAQs", path: "/preguntas-frecuentes" },
    { id: 2, nombre: "Distribuidores", path: "/distribuidores" },
		{ id: 3, nombre: "Sobre Nosotros", path: "/nosotros" }
  ];
  
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
      <div className="bg-brand-red py-2">
        <div className="container mx-auto px-4 text-white text-center text-sm">
          La verdadera llama para tu hogar
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Flame size={28} className="text-brand-red" />
            <div className="font-bold">
              <span className="text-xl text-black">bio</span>
              <span className="text-xl text-brand-red">chimeneas</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Main Categories */}
            
            <Link to="/categoria/564" className="text-gray-700 hover:text-brand-red font-medium">
              Estufas de bioetanol
            </Link>
            
            <Link to="/categoria/567" className="text-gray-700 hover:text-brand-red font-medium">
              Quemadores Bioetanol
            </Link>
            
            <Link to="/categoria/568" className="text-gray-700 hover:text-brand-red font-medium">
              Barbacoas de bioetanol
            </Link>
            
            {/* Chimeneas Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-brand-red font-medium"
                onClick={() => setIsChimeneasOpen(true)}
                onMouseEnter={() => setIsChimeneasOpen(true)}
              >
                <span>Chimeneas</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Dropdown Menu - Improved with padding and no gap */}
              {isChimeneasOpen && (
                <div 
                  className="absolute left-0 top-full pt-2 w-48 z-10"
                  onMouseLeave={() => setIsChimeneasOpen(false)}
                >
                  {/* Added invisible overlay to prevent gap issues */}
                  <div className="absolute inset-0 -top-5 bg-transparent"></div>
                  
                  <div className="bg-white rounded-md shadow-lg py-2 relative">
                    {chimeneasItems.map(item => (
                      <Link 
                        key={item.id}
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-brand-red/10 hover:text-brand-red"
                      >
                        {item.nombre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Accesorios Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-brand-red font-medium"
                onClick={() => setIsAccesoriosOpen(true)}
                onMouseEnter={() => setIsAccesoriosOpen(true)}
              >
                <span>Accesorios</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Dropdown Menu */}
              {isAccesoriosOpen && (
                <div 
                  className="absolute left-0 top-full pt-2 w-48 z-10"
                  onMouseLeave={() => setIsAccesoriosOpen(false)}
                >
                  {/* Added invisible overlay to prevent gap issues */}
                  <div className="absolute inset-0 -top-5 bg-transparent"></div>
                  
                  <div className="bg-white rounded-md shadow-lg py-2 relative">
                    {accesoriosItems.map(item => (
                      <Link 
                        key={item.id}
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-brand-red/10 hover:text-brand-red"
                      >
                        {item.nombre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Ayuda Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-brand-red font-medium"
                onClick={() => setIsAyudaOpen(true)}
                onMouseEnter={() => setIsAyudaOpen(true)}
              >
                <span>Ayuda</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Dropdown Menu */}
              {isAyudaOpen && (
                <div 
                  className="absolute left-0 top-full pt-2 w-48 z-10"
                  onMouseLeave={() => setIsAyudaOpen(false)}
                >
                  {/* Added invisible overlay to prevent gap issues */}
                  <div className="absolute inset-0 -top-5 bg-transparent"></div>
                  
                  <div className="bg-white rounded-md shadow-lg py-2 relative">
                    {ayudaItems.map(item => (
                      <Link 
                        key={item.id}
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-brand-red/10 hover:text-brand-red"
                      >
                        {item.nombre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
          
          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-md py-1 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-2 text-gray-700 hover:text-brand-red"
              >
                <Search size={20} />
              </button>
            </form>
            
            <button 
              className="md:hidden text-gray-700 hover:text-brand-red" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative flex items-center mb-4">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-2 text-gray-700 hover:text-brand-red"
              >
                <Search size={20} />
              </button>
            </form>
            
            {/* Main Categories in Mobile */}
            <Link to="/categoria/565" className="text-gray-700 hover:text-brand-red font-medium py-2">
              Biocombustible
            </Link>
            
            <Link to="/categoria/564" className="text-gray-700 hover:text-brand-red font-medium py-2">
              Estufas de bioetanol
            </Link>
            
            <Link to="/categoria/567" className="text-gray-700 hover:text-brand-red font-medium py-2">
              Quemadores Bioetanol
            </Link>
            
            <Link to="/categoria/568" className="text-gray-700 hover:text-brand-red font-medium py-2">
              Barbacoas de bioetanol
            </Link>
            
            {/* Mobile Chimeneas Menu */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-brand-red font-medium py-2"
                onClick={toggleChimeneas}
              >
                <span>Chimeneas</span>
                <ChevronDown size={16} className={`transition-transform ${isChimeneasOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isChimeneasOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                  {chimeneasItems.map(item => (
                    <Link 
                      key={item.id}
                      to={item.path}
                      className="block py-2 text-gray-700 hover:text-brand-red"
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Accesorios Menu */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-brand-red font-medium py-2"
                onClick={toggleAccesorios}
              >
                <span>Accesorios</span>
                <ChevronDown size={16} className={`transition-transform ${isAccesoriosOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAccesoriosOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                  {accesoriosItems.map(item => (
                    <Link 
                      key={item.id}
                      to={item.path}
                      className="block py-2 text-gray-700 hover:text-brand-red"
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Ayuda Menu */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-brand-red font-medium py-2"
                onClick={toggleAyuda}
              >
                <span>Ayuda</span>
                <ChevronDown size={16} className={`transition-transform ${isAyudaOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAyudaOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                  {ayudaItems.map(item => (
                    <Link 
                      key={item.id}
                      to={item.path}
                      className="block py-2 text-gray-700 hover:text-brand-red"
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sobre Nosotros Link in Mobile Menu */}
            <Link 
              to="/nosotros" 
              className="text-gray-700 hover:text-brand-red font-medium py-2"
            >
              Sobre nosotros
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
