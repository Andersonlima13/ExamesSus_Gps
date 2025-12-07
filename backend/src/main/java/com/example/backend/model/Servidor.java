package com.example.backend.model;

import com.example.backend.enums.UnidadeSaude;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Servidor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private UnidadeSaude unidade;

    private String login;
    private String senha;
}