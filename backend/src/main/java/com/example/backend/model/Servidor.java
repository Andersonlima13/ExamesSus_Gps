package com.example.backend.model;

import com.example.backend.enums.UnidadeSaude;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(
        name = "servidor",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "matricula")
        }
)
public class Servidor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnidadeSaude unidade;

    @Column(nullable = false, unique = true)
    private String matricula;
}
