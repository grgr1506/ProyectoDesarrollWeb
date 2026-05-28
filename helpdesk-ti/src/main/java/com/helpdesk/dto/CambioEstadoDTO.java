package com.helpdesk.dto;

import com.helpdesk.enums.Estado;
import jakarta.validation.constraints.NotNull;

public class CambioEstadoDTO {
    @NotNull
    private Estado nuevoEstado;
    private String solucionAplicada;
    private String observaciones;

    public Estado getNuevoEstado() { return nuevoEstado; }
    public void setNuevoEstado(Estado nuevoEstado) { this.nuevoEstado = nuevoEstado; }
    public String getSolucionAplicada() { return solucionAplicada; }
    public void setSolucionAplicada(String solucionAplicada) { this.solucionAplicada = solucionAplicada; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}
