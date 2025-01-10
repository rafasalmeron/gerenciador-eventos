package br.com.api.gerenciador_eventos.model;

import jakarta.persistence.*;

@Entity
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String data;
    @Column(nullable = false)
    private String locallizacao;
    @Column(nullable = false)
    private String imagem;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private Admin admin;

    public Evento() {
    }

    public Evento(Long id, String nome, String data, String locallizacao, String imagem, Admin admin) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.locallizacao = locallizacao;
        this.imagem = imagem;
        this.admin = admin;
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

    public String getLocallizacao() {
        return locallizacao;
    }

    public void setLocallizacao(String locallizacao) {
        this.locallizacao = locallizacao;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }
}