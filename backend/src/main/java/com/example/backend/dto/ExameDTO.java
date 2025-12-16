package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ExameDTO {
    private String nomeCidadao;   // ✅ NOVO
    private String documentoCidadao;
    private String servidorMatricula; // ✅ MATRÍCULA
    private String tipoExame;
    private String data;
    private String horario;
}