export interface Product {
  sku: string;
  sku_padre?: number | null;
  nombre: string;
  descripcion_corta?: string;
  descripcion_larga?: string;
  precio_tarifa?: number;
  precio_venta?: number;
  id_categoria?: number;
  id_supercategoria?: number;
  alto?: number;
  ancho?: number;
  profundo?: number;
  peso?: number;
  ean?: string;
  marca?: string;
  activo?: boolean;
  stock_texto?: string;
  created_at?: string;
  updated_at?: string;
  imagenes?: ProductImage[];
  atributos?: ProductAttribute[];
}

export interface ProductImage {
  sku: string;
  url_imagen: string;
  orden?: number;
}

export interface ProductAttribute {
  sku: string;
  id_atributo: number;
  valor?: string;
  variante_padre?: boolean;
}

export interface ProductAttributeType {
  id_atributo: number;
  nombre_atributo: string;
  filtrable?: boolean;
}

export interface ProductCategory {
  id: number;
  nombre: string;
  id_padre?: number;
}

export interface ProductSuperCategory {
  id: number;
  nombre: string;
}

export interface CategoryAttributeFilter {
  id_categoria: number;
  id_atributo: number;
  orden: number;
}
