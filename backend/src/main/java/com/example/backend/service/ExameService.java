package com.example.backend.service;

import com.example.backend.dto.ExameDTO;
import com.example.backend.model.Cidadao;
import com.example.backend.model.Exame;
import com.example.backend.repository.CidadaoRepository;
import com.example.backend.repository.ExameRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExameService {

    private final ExameRepository exameRepository;
    private final CidadaoRepository cidadaoRepository;

    public ExameService(
            ExameRepository exameRepository,
            CidadaoRepository cidadaoRepository
    ) {
        this.exameRepository = exameRepository;
        this.cidadaoRepository = cidadaoRepository;
    }

    public Exame cadastrarExame(ExameDTO dto) {

        Cidadao cidadao = cidadaoRepository
                .findByDocumento(dto.getDocumentoCidadao())
                .orElseThrow(() ->
                        new RuntimeException("Cidadão não encontrado")
                );

        Exame exame = new Exame();
        exame.setCidadao(cidadao);
        exame.setTipoExame(dto.getTipoExame());
        exame.setData(LocalDate.parse(dto.getData()));
        exame.setHorario(dto.getHorario());

        return exameRepository.save(exame);
    }

    public List<Exame> listarPorCidadao(String documento) {
        return exameRepository.findByCidadaoDocumento(documento);
    }
}
