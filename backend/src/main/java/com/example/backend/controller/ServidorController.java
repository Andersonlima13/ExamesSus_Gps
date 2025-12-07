package com.example.backend.controller;


import com.example.backend.dto.ServidorDTO;
import com.example.backend.service.ServidorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/servidor")
public class ServidorController {

    private final ServidorService service;

    public ServidorController(ServidorService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public String cadastrar(@RequestBody ServidorDTO dto) {
        service.cadastrarServidor(dto);
        return "Servidor cadastrado com sucesso!";
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
