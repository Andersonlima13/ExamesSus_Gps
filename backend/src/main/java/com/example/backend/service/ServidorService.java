package com.example.backend.service;


import com.example.backend.dto.ServidorDTO;
import com.example.backend.model.Servidor;
import com.example.backend.repository.ServidorRepository;
import org.springframework.stereotype.Service;

@Service
public class ServidorService {

    private final ServidorRepository repository;

    public ServidorService(ServidorRepository repository) {
        this.repository = repository;
    }

    public Servidor cadastrarServidor(ServidorDTO dto) {
        Servidor s = new Servidor();
        s.setNome(dto.getNome());
        s.setUnidade(dto.getUnidade());
        s.setLogin(dto.getLogin());
        s.setSenha(dto.getSenha());
        return repository.save(s);
    }

    public boolean autenticar(String login, String senha) {
        return repository.findByLogin(login)
                .filter(user -> user.getSenha().equals(senha))
                .isPresent();
    }
}