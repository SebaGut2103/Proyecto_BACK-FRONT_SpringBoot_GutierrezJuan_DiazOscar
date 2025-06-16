package com.projectspringboot.a.proyecspringboot.repository;


import com.projectspringboot.a.proyecspringboot.entity.DetallesPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetallesPedidoRepository extends JpaRepository<DetallesPedido, Long> {
    // Por ahora, los métodos básicos son suficientes para esta entidad.
    // Se podrían agregar métodos más complejos si la lógica de negocio lo requiere.
}
