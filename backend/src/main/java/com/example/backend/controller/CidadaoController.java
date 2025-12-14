package com.example.backend.controller;

import com.example.backend.dto.CidadaoDTO;
import com.example.backend.service.CidadaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cidadao")
public class CidadaoController {

    private final CidadaoService service;

    public CidadaoController(CidadaoService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Void> cadastrar(@RequestBody CidadaoDTO dto) {
        service.cadastrarCidadao(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CidadaoDTO dto) {

        var cidadaoOpt = service.buscarPorDocumento(dto.getDocumento());

        if (cidadaoOpt.isEmpty()) {
            return ResponseEntity
                    .status(401)
                    .body("Documento não encontrado.");
        }

        return ResponseEntity.ok(cidadaoOpt.get());
    }

    // ✅ GET PARA DROPDOWN DE EXAMES
    @GetMapping
    public ResponseEntity<List<CidadaoDTO>> listarCidadaos() {
        return ResponseEntity.ok(service.listarCidadaos());
    }
}
