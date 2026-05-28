package com.helpdesk.dto;

public class JwtResponseDTO {
    private String token;
    private String tipo;
    private String rol;
    private Long id;
    private String nombre;

    public JwtResponseDTO(String token, String tipo, String rol, Long id, String nombre) {
        this.token = token;
        this.tipo = tipo;
        this.rol = rol;
        this.id = id;
        this.nombre = nombre;
    }

    public String getToken() { return token; }
    public String getTipo() { return tipo; }
    public String getRol() { return rol; }
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
}
