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

    // Servidor agenda exame
    @PostMapping("/cadastrar")
    public ResponseEntity<Exame> cadastrar(@RequestBody ExameDTO dto) {
        Exame exame = service.cadastrarExame(dto);
        return ResponseEntity.ok(exame);
    }

    // Cidadão lista seus exames
    @GetMapping("/cidadao/{documento}")
    public ResponseEntity<List<Exame>> listarPorCidadao(
            @PathVariable String documento
    ) {
        return ResponseEntity.ok(service.listarPorCidadao(documento));
    }
}
