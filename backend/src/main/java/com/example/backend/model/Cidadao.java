package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Cidadao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true, nullable = false)
    private String documento;

    @OneToMany(mappedBy = "cidadao", cascade = CascadeType.ALL)
    private List<Exame> exames;
}
