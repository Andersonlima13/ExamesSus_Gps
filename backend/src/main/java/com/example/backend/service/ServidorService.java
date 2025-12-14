package com.example.backend.service;

import com.example.backend.dto.CidadaoDTO;
import com.example.backend.model.Servidor;
import com.example.backend.repository.ServidorRepository;
import org.springframework.stereotype.Service;

@Service
public class ServidorService {

    private final ServidorRepository servidorRepository;
    private final CidadaoService cidadaoService;

    public ServidorService(
            ServidorRepository servidorRepository,
            CidadaoService cidadaoService
    ) {
        this.servidorRepository = servidorRepository;
        this.cidadaoService = cidadaoService;
    }

    public Servidor cadastrarServidor(com.example.backend.dto.ServidorDTO dto) {
        Servidor s = new Servidor();
        s.setNome(dto.getNome());
        s.setUnidade(dto.getUnidade());
        s.setMatricula(dto.getMatricula());
        return servidorRepository.save(s);
    }

    public java.util.Optional<Servidor> buscarPorMatricula(String matricula) {
        return servidorRepository.findByMatricula(matricula);
    }

    // ✅ NOVO MÉTODO: Servidor cadastra cidadão
    public void cadastrarCidadao(CidadaoDTO dto) {
        cidadaoService.cadastrarCidadao(dto);
    }
}
