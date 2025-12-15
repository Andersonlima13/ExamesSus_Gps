package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Exame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Cidadao cidadao;

    @ManyToOne
    private Servidor servidor; // 🔑 quem cadastrou

    private String tipoExame;
    private LocalDate data;
    private String horario;
}
