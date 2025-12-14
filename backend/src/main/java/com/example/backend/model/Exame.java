package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Exame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // muitos exames → um cidadão
    @ManyToOne(optional = false)
    @JoinColumn(name = "cidadao_id")
    @JsonIgnore

    private Cidadao cidadao;

    @Column(nullable = false)
    private String tipoExame;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private String horario;
}
