package com.projectspringboot.a.proyecspringboot.repository;


import com.projectspringboot.a.proyecspringboot.dto.ReporteInventarioDTO;
import com.projectspringboot.a.proyecspringboot.entity.LoteProduccion;
import com.projectspringboot.a.proyecspringboot.entity.enums.EstadoLote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoteProduccionRepository extends JpaRepository<LoteProduccion, Long> {
    
    Optional<LoteProduccion> findByCodigoLote(String codigoLote);

    
    List<LoteProduccion> findByEstado(EstadoLote estado);

    @Query("SELECT new com.projectspringboot.a.proyecspringboot.dto.ReporteInventarioDTO(l.estado, COUNT(l.id)) " +
       "FROM LoteProduccion l GROUP BY l.estado")
List<ReporteInventarioDTO> obtenerReporteDeInventario();
}