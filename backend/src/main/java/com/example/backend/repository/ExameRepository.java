package com.example.backend.repository;

import com.example.backend.model.Exame;
import com.example.backend.model.Servidor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExameRepository extends JpaRepository<Exame, Long> {

    List<Exame> findByCidadaoDocumento(String documento);
    List<Exame> findByServidor(Servidor servidor);

}
