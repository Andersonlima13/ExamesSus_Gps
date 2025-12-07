package com.example.backend.controller;

import com.example.backend.dto.CidadaoDTO;
import com.example.backend.service.CidadaoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cidadao")
public class CidadaoController {

    private final CidadaoService service;

    public CidadaoController(CidadaoService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public String cadastrar(@RequestBody CidadaoDTO dto) {
        service.cadastrarCidadao(dto);
        return "Cidadão cadastrado com sucesso!";
    }

    @PostMapping("/login")
    public String login(@RequestParam String login,
                        @RequestParam String senha) {

        if (service.autenticar(login, senha)) {
            return "Acesso permitido.";
        }
        return "Login ou senha inválidos.";
    }
}