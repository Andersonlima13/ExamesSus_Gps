package com.example.backend.repository;

import com.example.backend.model.Servidor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServidorRepository extends JpaRepository<Servidor, Long> {
    Optional<Servidor> findByMatricula(String matricula);
}