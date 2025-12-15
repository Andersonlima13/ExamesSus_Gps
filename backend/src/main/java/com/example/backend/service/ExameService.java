package com.example.backend.service;

import com.example.backend.dto.ExameDTO;
import com.example.backend.model.Cidadao;
import com.example.backend.model.Exame;
import com.example.backend.model.Servidor;
import com.example.backend.repository.CidadaoRepository;
import com.example.backend.repository.ExameRepository;
import com.example.backend.repository.ServidorRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class ExameService {

    private final ExameRepository exameRepository;
    private final CidadaoRepository cidadaoRepository;
    private final ServidorRepository servidorRepository;

    public ExameService(
            ExameRepository exameRepository,
            CidadaoRepository cidadaoRepository,
            ServidorRepository servidorRepository
    ) {
        this.exameRepository = exameRepository;
        this.cidadaoRepository = cidadaoRepository;
        this.servidorRepository = servidorRepository;
    }

    public ExameDTO cadastrarExame(ExameDTO dto) {

        Cidadao cidadao = cidadaoRepository
                .findByDocumento(dto.getDocumentoCidadao())
                .orElseThrow(() -> new RuntimeException("Cidadão não encontrado"));

        Servidor servidor = servidorRepository
                .findByMatricula(dto.getServidorMatricula())
                .orElseThrow(() -> new RuntimeException("Servidor não encontrado"));

        Exame exame = new Exame();
        exame.setCidadao(cidadao);
        exame.setServidor(servidor);
        exame.setTipoExame(dto.getTipoExame());
        exame.setData(LocalDate.parse(dto.getData())); // yyyy-MM-dd
        exame.setHorario(dto.getHorario());

        Exame salvo = exameRepository.save(exame);
        return toDTO(salvo);
    }

    private ExameDTO toDTO(Exame exame) {
        ExameDTO dto = new ExameDTO();
        dto.setDocumentoCidadao(exame.getCidadao().getDocumento());
        dto.setServidorMatricula(exame.getServidor().getMatricula());
        dto.setTipoExame(exame.getTipoExame());
        dto.setData(exame.getData().toString());
        dto.setHorario(exame.getHorario());
        return dto;
    }


    public List<ExameDTO> listarPorServidor(String matricula) {

        Servidor servidor = servidorRepository
                .findByMatricula(matricula)
                .orElseThrow(() -> new RuntimeException("Servidor não encontrado"));

        return exameRepository
                .findByServidor(servidor)
                .stream()
                .map(this::toDTO)
                .toList();
    }






}