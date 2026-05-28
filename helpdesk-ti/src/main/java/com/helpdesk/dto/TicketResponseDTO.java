package com.helpdesk.dto;

import com.helpdesk.enums.Estado;
import com.helpdesk.enums.Prioridad;

import java.time.LocalDateTime;

public class TicketResponseDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String categoria;
    private Prioridad prioridad;
    private Estado estado;
    private String solucionAplicada;
    private String usuarioCreador;
    private String tecnicoAsignado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaResolucion;

    public TicketResponseDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public Prioridad getPrioridad() { return prioridad; }
    public void setPrioridad(Prioridad prioridad) { this.prioridad = prioridad; }
    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }
    public String getSolucionAplicada() { return solucionAplicada; }
    public void setSolucionAplicada(String s) { this.solucionAplicada = s; }
    public String getUsuarioCreador() { return usuarioCreador; }
    public void setUsuarioCreador(String usuarioCreador) { this.usuarioCreador = usuarioCreador; }
    public String getTecnicoAsignado() { return tecnicoAsignado; }
    public void setTecnicoAsignado(String tecnicoAsignado) { this.tecnicoAsignado = tecnicoAsignado; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public LocalDateTime getFechaResolucion() { return fechaResolucion; }
    public void setFechaResolucion(LocalDateTime fechaResolucion) { this.fechaResolucion = fechaResolucion; }
}
