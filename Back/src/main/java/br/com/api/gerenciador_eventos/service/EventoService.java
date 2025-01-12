package br.com.api.gerenciador_eventos.service;

import br.com.api.gerenciador_eventos.dto.EventoDTO;
import br.com.api.gerenciador_eventos.model.Evento;
import br.com.api.gerenciador_eventos.repository.EventoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public Evento criarEvento(Evento evento, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new RuntimeException("O arquivo enviado não é uma imagem!");
            }
            evento.setImagem(file.getBytes());
        }
        return eventoRepository.save(evento);
    }

    public List<EventoDTO> listarEventos() {
        return eventoRepository.findAll().stream()
                .map(EventoDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<Evento> buscarEventoPorId(Long id) {
        return eventoRepository.findById(id);
    }

    public Evento atualizarEvento(Long id, Evento eventoAtualizado, MultipartFile file) throws IOException {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        evento.setData(eventoAtualizado.getData());
        evento.setLocalizacao(eventoAtualizado.getLocalizacao());

        if (file != null && !file.isEmpty()) {
            evento.setImagem(file.getBytes());
        }

        return eventoRepository.save(evento);
    }

    public void deletarEvento(Long id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        eventoRepository.delete(evento);
    }
}