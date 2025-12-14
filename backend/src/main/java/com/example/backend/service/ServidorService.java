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
        s.setMatricula(dto.getMatricula());

        return repository.save(s);
    }

    public boolean autenticarPorMatricula(String matricula) {
        return repository.findByMatricula(matricula).isPresent();
    }
}
