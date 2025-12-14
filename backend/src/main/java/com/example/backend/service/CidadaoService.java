package com.example.backend.service;

import com.example.backend.dto.CidadaoDTO;
import com.example.backend.model.Cidadao;
import com.example.backend.repository.CidadaoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CidadaoService {

    private final CidadaoRepository repository;

    public CidadaoService(CidadaoRepository repository) {
        this.repository = repository;
    }

    public Cidadao cadastrarCidadao(CidadaoDTO dto) {
        Cidadao c = new Cidadao();
        c.setNome(dto.getNome());
        c.setDocumento(dto.getDocumento());
        return repository.save(c);
    }

    // NOVO MÉTODO PARA LOGIN
    public Optional<CidadaoDTO> buscarPorDocumento(String documento) {
        return repository.findByDocumento(documento)
                .map(cidadao -> {
                    CidadaoDTO dto = new CidadaoDTO();
                    dto.setNome(cidadao.getNome());
                    dto.setDocumento(cidadao.getDocumento());
                    return dto;
                });
    }

}
