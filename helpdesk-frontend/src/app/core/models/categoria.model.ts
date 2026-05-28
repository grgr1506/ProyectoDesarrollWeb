export interface Categoria {
  id: number; nombre: string; descripcion: string; requiereValidacionProveedor: boolean;
}
export interface CategoriaDTO { nombre: string; descripcion?: string; requiereValidacionProveedor?: boolean; }
