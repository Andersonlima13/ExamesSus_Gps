package com.example.backend.controller;

import com.example.backend.dto.ExameDTO;
import com.example.backend.model.Exame;
import com.example.backend.service.ExameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exames")
public class ExameController {

    private final ExameService service;

    public ExameController(ExameService service) {
        this.service = service;
    }

    // ---------------------------
    // SERVIDOR CADASTRA EXAME
    // ---------------------------
    @PostMapping("/cadastrar")
    public ResponseEntity<Exame> cadastrar(@RequestBody ExameDTO dto) {
        return ResponseEntity.ok(service.cadastrarExame(dto));
    }

    // ---------------------------
    // CIDADÃO LISTA EXAMES
    // ---------------------------
    @GetMapping("/cidadao/{documento}")
    public ResponseEntity<List<ExameDTO>> listarPorCidadao(
            @PathVariable String documento
    ) {
        return ResponseEntity.ok(service.listarPorCidadao(documento));
    }
}
