package com.example.backend.service;



import com.example.backend.dto.CidadaoDTO;
import com.example.backend.model.Cidadao;
import com.example.backend.repository.CidadaoRepository;
import org.springframework.stereotype.Service;

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
        c.setLogin(dto.getLogin());
        c.setSenha(dto.getSenha());
        return repository.save(c);
    }

    public boolean autenticar(String login, String senha) {
        return repository.findByLogin(login)
                .filter(user -> user.getSenha().equals(senha))
                .isPresent();
    }
}