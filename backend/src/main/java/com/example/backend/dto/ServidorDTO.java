package com.example.backend.dto;


import com.example.backend.enums.UnidadeSaude;
import lombok.Data;

@Data
public class ServidorDTO {
    private String nome;
    private UnidadeSaude unidade;
    private String login;
    private String senha;
}