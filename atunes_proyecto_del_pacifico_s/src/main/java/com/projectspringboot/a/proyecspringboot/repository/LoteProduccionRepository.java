package com.projectspringboot.a.proyecspringboot.repository;


import com.projectspringboot.a.proyecspringboot.entity.LoteProduccion;
import com.projectspringboot.a.proyecspringboot.entity.enums.EstadoLote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoteProduccionRepository extends JpaRepository<LoteProduccion, Long> {
    // Método para buscar un lote por su código único.
    Optional<LoteProduccion> findByCodigoLote(String codigoLote);

    // Método para buscar todos los lotes que tengan un estado específico.
    List<LoteProduccion> findByEstado(EstadoLote estado);
}