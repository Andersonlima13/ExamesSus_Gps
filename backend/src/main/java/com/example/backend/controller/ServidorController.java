package com.example.backend.controller;

import com.example.backend.dto.CidadaoDTO;
import com.example.backend.dto.ServidorDTO;
import com.example.backend.model.Servidor;
import com.example.backend.service.ServidorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/servidor")
public class ServidorController {

    private final ServidorService service;

    public ServidorController(ServidorService service) {
        this.service = service;
    }

    // -------------------------------
    // CADASTRAR SERVIDOR
    // -------------------------------
    @PostMapping("/cadastrar")
    public ResponseEntity<Void> cadastrar(@RequestBody ServidorDTO dto) {
        service.cadastrarServidor(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // -------------------------------
    // LOGIN SERVIDOR (SEM ERRO DE GENERICS)
    // -------------------------------
    @PostMapping("/login")
    public ResponseEntity<ServidorDTO> login(@RequestBody ServidorDTO dto) {

        return service.buscarPorMatricula(dto.getMatricula())
                .map(servidor -> ResponseEntity.ok(toDTO(servidor)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    // -------------------------------
    // SERVIDOR CADASTRA CIDADÃO
    // -------------------------------
    @PostMapping("/cadastrar-cidadao")
    public ResponseEntity<Void> cadastrarCidadao(@RequestBody CidadaoDTO dto) {
        service.cadastrarCidadao(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // -------------------------------
    // CONVERSÃO ENTITY → DTO
    // -------------------------------
    private ServidorDTO toDTO(Servidor servidor) {
        ServidorDTO dto = new ServidorDTO();
        dto.setNome(servidor.getNome());
        dto.setUnidade(servidor.getUnidade());
        dto.setMatricula(servidor.getMatricula());
        return dto;
    }
}
