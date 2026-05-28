export interface TicketResponse {
  id: number; titulo: string; descripcion: string; categoria: string;
  prioridad: 'ALTA'|'MEDIA'|'BAJA'; estado: 'ABIERTO'|'EN_PROGRESO'|'RESUELTO'|'CANCELADO';
  solucionAplicada: string|null; usuarioCreador: string; tecnicoAsignado: string|null;
  fechaCreacion: string; fechaResolucion: string|null;
}
export interface TicketRequest { titulo: string; descripcion: string; categoriaId: number; }
export interface CambioEstadoDTO { nuevoEstado: string; solucionAplicada?: string; observaciones?: string; }
