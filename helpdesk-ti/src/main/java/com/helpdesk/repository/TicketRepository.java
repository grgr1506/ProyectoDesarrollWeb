package com.helpdesk.repository;

import com.helpdesk.entity.Ticket;
import com.helpdesk.enums.Estado;
import com.helpdesk.enums.Prioridad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("SELECT t FROM Ticket t WHERE t.usuarioCreador.id = :userId ORDER BY t.fechaCreacion DESC")
    List<Ticket> findByUsuarioCreadorId(@Param("userId") Long userId);

    List<Ticket> findByEstado(Estado estado);

    List<Ticket> findByPrioridadAndEstadoNot(Prioridad prioridad, Estado estado);

    @Query("SELECT t.estado, COUNT(t) FROM Ticket t GROUP BY t.estado")
    List<Object[]> countByEstado();
}
