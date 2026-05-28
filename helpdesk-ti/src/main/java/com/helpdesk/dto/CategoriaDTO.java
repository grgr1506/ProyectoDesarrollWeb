package com.helpdesk.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoriaDTO {
    @NotBlank
    private String nombre;
    private String descripcion;
    private Boolean requiereValidacionProveedor = false;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Boolean getRequiereValidacionProveedor() { return requiereValidacionProveedor; }
    public void setRequiereValidacionProveedor(Boolean r) { this.requiereValidacionProveedor = r; }
}
