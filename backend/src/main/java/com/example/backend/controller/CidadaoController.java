package com.example.backend.controller;

import com.example.backend.dto.CidadaoDTO;
import com.example.backend.service.CidadaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cidadao")
public class CidadaoController {

    private final CidadaoService service;

    public CidadaoController(CidadaoService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody CidadaoDTO dto) {
        service.cadastrarCidadao(dto);
        return ResponseEntity.ok("Cidadão cadastrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String documento) {

        boolean autenticado = service.autenticar(documento);

        if (autenticado) {
            return ResponseEntity.ok("Acesso permitido");
        }

        return ResponseEntity.status(401).body("Documento não encontrado.");
    }
}
