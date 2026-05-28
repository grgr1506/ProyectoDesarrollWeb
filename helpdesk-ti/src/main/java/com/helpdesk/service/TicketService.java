package com.helpdesk.service;

import com.helpdesk.dto.CambioEstadoDTO;
import com.helpdesk.dto.TicketRequestDTO;
import com.helpdesk.dto.TicketResponseDTO;
import com.helpdesk.entity.Categoria;
import com.helpdesk.entity.Ticket;
import com.helpdesk.entity.Usuario;
import com.helpdesk.enums.Estado;
import com.helpdesk.enums.Prioridad;
import com.helpdesk.repository.CategoriaRepository;
import com.helpdesk.repository.TicketRepository;
import com.helpdesk.repository.UsuarioRepository;
import com.helpdesk.security.UserDetailsImpl;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CategoriaRepository categoriaRepository;
    private final UsuarioRepository usuarioRepository;

    public TicketService(TicketRepository ticketRepository,
                         CategoriaRepository categoriaRepository,
                         UsuarioRepository usuarioRepository) {
        this.ticketRepository = ticketRepository;
        this.categoriaRepository = categoriaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    private static final Set<String> CATEGORIAS_ALTA_PRIORIDAD =
            Set.of("fallas de red", "caída de servicios", "caida de servicios");

    public TicketResponseDTO crearTicket(TicketRequestDTO dto) {
        UserDetailsImpl userDetails = getAuthenticatedUser();
        Usuario creador = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        // RN01
        Prioridad prioridad = CATEGORIAS_ALTA_PRIORIDAD.contains(categoria.getNombre().toLowerCase())
                ? Prioridad.ALTA : Prioridad.MEDIA;

        Ticket ticket = new Ticket();
        ticket.setTitulo(dto.getTitulo());
        ticket.setDescripcion(dto.getDescripcion());
        ticket.setCategoria(categoria);
        ticket.setPrioridad(prioridad);
        ticket.setEstado(Estado.ABIERTO);
        ticket.setUsuarioCreador(creador);

        return toDTO(ticketRepository.save(ticket));
    }

    public List<TicketResponseDTO> listarTodos() {
        return ticketRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<TicketResponseDTO> listarMisTickets() {
        UserDetailsImpl userDetails = getAuthenticatedUser();
        return ticketRepository.findByUsuarioCreadorId(userDetails.getId())
                .stream().map(this::toDTO).toList();
    }

    public TicketResponseDTO obtenerPorId(Long id) {
        return toDTO(findById(id));
    }

    public TicketResponseDTO actualizar(Long id, TicketRequestDTO dto) {
        Ticket ticket = findById(id);
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));
        ticket.setTitulo(dto.getTitulo());
        ticket.setDescripcion(dto.getDescripcion());
        ticket.setCategoria(categoria);
        return toDTO(ticketRepository.save(ticket));
    }

    public TicketResponseDTO asumirTicket(Long id) {
        UserDetailsImpl userDetails = getAuthenticatedUser();
        Usuario tecnico = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Técnico no encontrado"));
        Ticket ticket = findById(id);
        if (ticket.getEstado() != Estado.ABIERTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Solo se pueden asumir tickets ABIERTOS");
        }
        ticket.setTecnicoAsignado(tecnico);
        ticket.setEstado(Estado.EN_PROGRESO);
        return toDTO(ticketRepository.save(ticket));
    }

    // RN02 + RN03
    public TicketResponseDTO resolverTicket(Long id, CambioEstadoDTO dto) {
        Ticket ticket = findById(id);
        Boolean requiereVal = ticket.getCategoria().getRequiereValidacionProveedor();
        if (requiereVal != null && requiereVal) {
            if (dto.getSolucionAplicada() == null || dto.getSolucionAplicada().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "RN02: Debe documentar la solución para cerrar tickets de hardware corporativo");
            }
        }
        ticket.setEstado(Estado.RESUELTO);
        ticket.setSolucionAplicada(dto.getSolucionAplicada());
        ticket.setFechaResolucion(LocalDateTime.now());
        return toDTO(ticketRepository.save(ticket));
    }

    public TicketResponseDTO cancelarTicket(Long id) {
        UserDetailsImpl userDetails = getAuthenticatedUser();
        Ticket ticket = findById(id);
        if (!ticket.getUsuarioCreador().getId().equals(userDetails.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo puedes cancelar tus propios tickets");
        }
        if (ticket.getEstado() == Estado.RESUELTO || ticket.getEstado() == Estado.CANCELADO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede cancelar un ticket ya cerrado");
        }
        ticket.setEstado(Estado.CANCELADO);
        return toDTO(ticketRepository.save(ticket));
    }

    public void eliminar(Long id) {
        if (!ticketRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket no encontrado");
        }
        ticketRepository.deleteById(id);
    }

    private Ticket findById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket no encontrado"));
    }

    private UserDetailsImpl getAuthenticatedUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private TicketResponseDTO toDTO(Ticket t) {
        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setId(t.getId());
        dto.setTitulo(t.getTitulo());
        dto.setDescripcion(t.getDescripcion());
        dto.setCategoria(t.getCategoria() != null ? t.getCategoria().getNombre() : null);
        dto.setPrioridad(t.getPrioridad());
        dto.setEstado(t.getEstado());
        dto.setSolucionAplicada(t.getSolucionAplicada());
        dto.setUsuarioCreador(t.getUsuarioCreador() != null ? t.getUsuarioCreador().getNombre() : null);
        dto.setTecnicoAsignado(t.getTecnicoAsignado() != null ? t.getTecnicoAsignado().getNombre() : null);
        dto.setFechaCreacion(t.getFechaCreacion());
        dto.setFechaResolucion(t.getFechaResolucion());
        return dto;
    }
}
