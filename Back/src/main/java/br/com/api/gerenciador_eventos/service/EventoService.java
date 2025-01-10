package br.com.api.gerenciador_eventos.service;

import br.com.api.gerenciador_eventos.model.Evento;
import br.com.api.gerenciador_eventos.repository.EventoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public Evento criarEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    public List<Evento> listarEventos() {
        return eventoRepository.findAll();
    }

    public Optional<Evento> buscarEventoPorId(Long id) {
        return eventoRepository.findById(id);
    }

    public Evento atualizarEvento(Long id, Evento eventoAtualizado) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        evento.setData(eventoAtualizado.getData());
        evento.setLocallizacao(eventoAtualizado.getLocallizacao());

        return eventoRepository.save(evento);
    }

    public void deletarEvento(Long id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        eventoRepository.delete(evento);
    }
}