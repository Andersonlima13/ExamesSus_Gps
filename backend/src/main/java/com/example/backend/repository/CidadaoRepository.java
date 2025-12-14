package com.example.backend.repository;

import com.example.backend.model.Cidadao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CidadaoRepository extends JpaRepository<Cidadao, Long> {

    Optional<Cidadao> findByDocumento(String documento);
}