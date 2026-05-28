package com.helpdesk.controller;

import com.helpdesk.dto.CambioEstadoDTO;
import com.helpdesk.dto.TicketRequestDTO;
import com.helpdesk.dto.TicketResponseDTO;
import com.helpdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> listarTodos() {
        return ResponseEntity.ok(ticketService.listarTodos());
    }

    @GetMapping("/mis-tickets")
    @PreAuthorize("hasRole('USUARIO_FINAL')")
    public ResponseEntity<List<TicketResponseDTO>> listarMisTickets() {
        return ResponseEntity.ok(ticketService.listarMisTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<TicketResponseDTO> crear(@Valid @RequestBody TicketRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.crearTicket(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SOPORTE_TI', 'SUPERVISOR_TI')")
    public ResponseEntity<TicketResponseDTO> actualizar(@PathVariable Long id,
                                                        @Valid @RequestBody TicketRequestDTO dto) {
        return ResponseEntity.ok(ticketService.actualizar(id, dto));
    }

    @PatchMapping("/{id}/asumir")
    @PreAuthorize("hasRole('SOPORTE_TI')")
    public ResponseEntity<TicketResponseDTO> asumir(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.asumirTicket(id));
    }

    // RN03: solo SOPORTE_TI y SUPERVISOR_TI
    @PatchMapping("/{id}/resolver")
    @PreAuthorize("hasAnyRole('SOPORTE_TI', 'SUPERVISOR_TI')")
    public ResponseEntity<TicketResponseDTO> resolver(@PathVariable Long id,
                                                      @Valid @RequestBody CambioEstadoDTO dto) {
        return ResponseEntity.ok(ticketService.resolverTicket(id, dto));
    }

    @PatchMapping("/{id}/cancelar")
    @PreAuthorize("hasRole('USUARIO_FINAL')")
    public ResponseEntity<TicketResponseDTO> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.cancelarTicket(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPERVISOR_TI')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ticketService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
