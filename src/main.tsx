import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import CatalogPage from './pages/CatalogPage.tsx'
import CategoryPage from './pages/CategoryPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import CartPage from './pages/CartPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import FAQPage from './pages/FAQPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import DistribuidoresPage from './pages/DistribuidoresPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="catalogo" element={<CatalogPage />} />
          <Route path="categoria/:id" element={<CategoryPage />} />
          <Route path="producto/:id" element={<ProductPage />} />
          <Route path="carrito" element={<CartPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="preguntas-frecuentes" element={<FAQPage />} />
          <Route path="nosotros" element={<AboutPage />} />
          <Route path="distribuidores" element={<DistribuidoresPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
