package com.projectspringboot.a.proyecspringboot.repository;

import com.projectspringboot.a.proyecspringboot.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    List<Rol> finByNombreContainingIgnoreCase(String nombre);

    @Modifying
    @Transactional
    @Query("UPDATE pedido p SET p.nombre = :nombre where p.id = :id")
    int actualizarRolConJPQL(@Param("id") Long id,
                             @Param("nombre") String nombre);
}
