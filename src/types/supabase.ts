export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      productos: {
        Row: {
          sku: string
          sku_padre: number | null
          nombre: string
          descripcion_corta: string | null
          descripcion_larga: string | null
          precio_tarifa: number | null
          precio_venta: number | null
          id_categoria: number | null
          id_supercategoria: number | null
          alto: number | null
          ancho: number | null
          profundo: number | null
          peso: number | null
          ean: string | null
          marca: string | null
          activo: boolean | null
          stock_texto: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          sku: string
          sku_padre: number | null
          nombre: string
          descripcion_corta?: string | null
          descripcion_larga?: string | null
          precio_tarifa?: number | null
          precio_venta?: number | null
          id_categoria?: number | null
          id_supercategoria?: number | null
          alto?: number | null
          ancho?: number | null
          profundo?: number | null
          peso?: number | null
          ean?: string | null
          marca?: string | null
          activo?: boolean | null
          stock_texto?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          sku?: string
          sku_padre: number | null
          nombre?: string
          descripcion_corta?: string | null
          descripcion_larga?: string | null
          precio_tarifa?: number | null
          precio_venta?: number | null
          id_categoria?: number | null
          id_supercategoria?: number | null
          alto?: number | null
          ancho?: number | null
          profundo?: number | null
          peso?: number | null
          ean?: string | null
          marca?: string | null
          activo?: boolean | null
          stock_texto?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      productos_atributos: {
        Row: {
          sku: string
          id_atributo: number
          valor: string | null
          variante_padre: boolean | null
        }
        Insert: {
          sku: string
          id_atributo: number
          valor?: string | null
          variante_padre?: boolean | null
        }
        Update: {
          sku?: string
          id_atributo?: number
          valor?: string | null
          variante_padre?: boolean | null
        }
      }
      productos_atributos_tipos: {
        Row: {
          id_atributo: number
          nombre_atributo: string
          filtrable: boolean | null
        }
        Insert: {
          id_atributo: number
          nombre_atributo: string
          filtrable?: boolean | null
        }
        Update: {
          id_atributo?: number
          nombre_atributo?: string
          filtrable?: boolean | null
        }
      }
      productos_imagenes: {
        Row: {
          sku: string
          url_imagen: string
          orden: number | null
        }
        Insert: {
          sku: string
          url_imagen: string
          orden?: number | null
        }
        Update: {
          sku?: string
          url_imagen?: string
          orden?: number | null
        }
      }
      productos_categorias: {
        Row: {
          id: number
          nombre: string
          id_padre: number | null
        }
        Insert: {
          id: number
          nombre: string
          id_padre?: number | null
        }
        Update: {
          id?: number
          nombre?: string
          id_padre?: number | null
        }
      }
      productos_supercategorias: {
        Row: {
          id: number
          nombre: string
        }
        Insert: {
          id: number
          nombre: string
        }
        Update: {
          id?: number
          nombre?: string
        }
      }
      categoria_atributos_filtro: {
        Row: {
          id_categoria: number
          id_atributo: number
          orden: number
        }
        Insert: {
          id_categoria: number
          id_atributo: number
          orden: number
        }
        Update: {
          id_categoria?: number
          id_atributo?: number
          orden?: number
        }
      }
    }
  }
}
