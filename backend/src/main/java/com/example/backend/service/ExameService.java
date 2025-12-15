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

    // ---------------------------
    // CADASTRAR EXAME
    // ---------------------------
    public Exame cadastrarExame(ExameDTO dto) {

        Cidadao cidadao = cidadaoRepository
                .findByDocumento(dto.getDocumentoCidadao())
                .orElseThrow(() -> new RuntimeException("Cidadão não encontrado"));

        Servidor servidor = servidorRepository
                .findById(dto.getServidorId())
                .orElseThrow(() -> new RuntimeException("Servidor não encontrado"));

        LocalDate data;
        try {
            data = LocalDate.parse(dto.getData());
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Data inválida. Use o formato yyyy-MM-dd");
        }

        Exame exame = new Exame();
        exame.setCidadao(cidadao);
        exame.setServidor(servidor);
        exame.setTipoExame(dto.getTipoExame());
        exame.setData(data);
        exame.setHorario(dto.getHorario());

        return exameRepository.save(exame);
    }

    // ---------------------------
    // LISTAR POR CIDADÃO
    // ---------------------------
    public List<ExameDTO> listarPorCidadao(String documento) {
        return exameRepository.findByCidadaoDocumento(documento)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ---------------------------
    // LISTAR POR SERVIDOR
    // ---------------------------
    public List<ExameDTO> listarPorServidor(Long servidorId) {
        return exameRepository.findByServidorId(servidorId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ---------------------------
    // ENTITY → DTO
    // ---------------------------
    private ExameDTO toDTO(Exame exame) {
        ExameDTO dto = new ExameDTO();
        dto.setDocumentoCidadao(exame.getCidadao().getDocumento());
        dto.setServidorId(exame.getServidor().getId());
        dto.setTipoExame(exame.getTipoExame());
        dto.setData(exame.getData().toString());
        dto.setHorario(exame.getHorario());
        return dto;
    }
}
