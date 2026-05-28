package com.helpdesk.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.helpdesk.enums.Rol;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    @Column(nullable = false)
    private Boolean activo = true;

    @OneToMany(mappedBy = "usuarioCreador", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> ticketsCreados;

    @OneToMany(mappedBy = "tecnicoAsignado", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> ticketsAsignados;

    public Usuario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public List<Ticket> getTicketsCreados() { return ticketsCreados; }
    public void setTicketsCreados(List<Ticket> ticketsCreados) { this.ticketsCreados = ticketsCreados; }

    public List<Ticket> getTicketsAsignados() { return ticketsAsignados; }
    public void setTicketsAsignados(List<Ticket> ticketsAsignados) { this.ticketsAsignados = ticketsAsignados; }
}
