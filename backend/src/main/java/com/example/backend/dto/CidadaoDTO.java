package com.example.backend.dto;

import lombok.Data;

@Data
public class CidadaoDTO {
    private String nome;
    private String documento;


    public void setDocumento(String documento) { this.documento = documento; }

}
