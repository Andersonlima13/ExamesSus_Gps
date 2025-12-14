package com.example.backend.controller;

import com.example.backend.dto.ServidorDTO;
import com.example.backend.model.Servidor;
import com.example.backend.service.ServidorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/servidor")
public class ServidorController {

    private final ServidorService service;

    public ServidorController(ServidorService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ServidorDTO dto) {
        service.cadastrarServidor(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ServidorDTO dto) {

        return service.buscarPorMatricula(dto.getMatricula())
                .map(servidor -> ResponseEntity.ok(toDTO(servidor)))
                .orElse(ResponseEntity.status(401).body("Matrícula não encontrada."));
    }

    private ServidorDTO toDTO(Servidor servidor) {
        ServidorDTO dto = new ServidorDTO();
        dto.setNome(servidor.getNome());
        dto.setUnidade(servidor.getUnidade());
        dto.setMatricula(servidor.getMatricula());
        return dto;
    }
}
