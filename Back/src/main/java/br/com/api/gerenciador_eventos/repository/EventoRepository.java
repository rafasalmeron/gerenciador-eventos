package br.com.api.gerenciador_eventos.repository;

import br.com.api.gerenciador_eventos.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByAdminId(Long adminId);
}