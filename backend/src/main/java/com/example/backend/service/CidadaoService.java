package com.example.backend.service;

import com.example.backend.dto.CidadaoDTO;
import com.example.backend.dto.ExameDTO;
import com.example.backend.model.Cidadao;
import com.example.backend.model.Exame;
import com.example.backend.repository.CidadaoRepository;
import com.example.backend.repository.ExameRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CidadaoService {

    private final CidadaoRepository repository;
    private final ExameRepository exameRepository;

    public CidadaoService(
            CidadaoRepository repository,
            ExameRepository exameRepository
    ) {
        this.repository = repository;
        this.exameRepository = exameRepository;
    }

    // -----------------------
    // CADASTRAR CIDADÃO
    // -----------------------
    public Cidadao cadastrarCidadao(CidadaoDTO dto) {
        Cidadao c = new Cidadao();
        c.setNome(dto.getNome());
        c.setDocumento(dto.getDocumento());
        return repository.save(c);
    }

    // -----------------------
    // LOGIN
    // -----------------------
    public Optional<CidadaoDTO> buscarPorDocumento(String documento) {
        return repository.findByDocumento(documento)
                .map(cidadao -> {
                    CidadaoDTO dto = new CidadaoDTO();
                    dto.setNome(cidadao.getNome());
                    dto.setDocumento(cidadao.getDocumento());
                    return dto;
                });
    }

    // -----------------------
    // LISTAR CIDADÃOS (DROPDOWN)
    // -----------------------
    public List<CidadaoDTO> listarCidadaos() {
        return repository.findAll()
                .stream()
                .map(cidadao -> {
                    CidadaoDTO dto = new CidadaoDTO();
                    dto.setNome(cidadao.getNome());
                    dto.setDocumento(cidadao.getDocumento());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // -----------------------
    // LISTAR EXAMES DO CIDADÃO
    // -----------------------
    public List<ExameDTO> listarPorCidadao(String documento) {

        Cidadao cidadao = repository
                .findByDocumento(documento)
                .orElseThrow(() -> new RuntimeException("Cidadão não encontrado"));

        return exameRepository
                .findByCidadao(cidadao)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // -----------------------
    // CONVERSOR LOCAL
    // -----------------------
    private ExameDTO toDTO(Exame exame) {
        ExameDTO dto = new ExameDTO();
        dto.setDocumentoCidadao(exame.getCidadao().getDocumento());
        dto.setServidorMatricula(exame.getServidor().getMatricula());
        dto.setTipoExame(exame.getTipoExame());
        dto.setData(exame.getData().toString());
        dto.setHorario(exame.getHorario());
        return dto;
    }
}
