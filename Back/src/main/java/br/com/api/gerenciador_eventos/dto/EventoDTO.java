package br.com.api.gerenciador_eventos.dto;

import br.com.api.gerenciador_eventos.model.Evento;
import java.util.Base64;

public class EventoDTO {
    private Long id;
    private String nome;
    private String data;
    private String localizacao;
    private String imagem; // Em Base64
    private Long adminId;

    public EventoDTO() {
    }

    public EventoDTO(Evento evento) {
        this.id = evento.getId();
        this.nome = evento.getNome();
        this.data = evento.getData();
        this.localizacao = evento.getLocalizacao();
        this.imagem = evento.getImagem() != null ? Base64.getEncoder().encodeToString(evento.getImagem()) : null;
        this.adminId = evento.getAdmin().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }
}
