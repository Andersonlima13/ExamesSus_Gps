package com.example.backend.controller;

import com.example.backend.dto.ServidorDTO;
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
        return ResponseEntity.ok("Servidor cadastrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ServidorDTO dto) {

        boolean autenticado = service.autenticarPorMatricula(dto.getMatricula());

        if (autenticado) {
            return ResponseEntity.ok("Acesso permitido.");
        }

        return ResponseEntity.status(401).body("Matrícula não encontrada.");
    }
}
