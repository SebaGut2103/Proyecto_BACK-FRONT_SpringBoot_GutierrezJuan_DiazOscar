package com.projectspringboot.a.proyecspringboot.repository;


import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorClienteDTO;
import com.projectspringboot.a.proyecspringboot.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {


    List<Pedido> findByClienteId(Long clienteId);

    List<Pedido> findByCliente_Usuario_NombreUsuario(String nombreUsuario);

    
    @Query("SELECT new com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorClienteDTO(" +
           "p.cliente.nombre, " +
           "COUNT(p.id), " +
           "SUM(p.precioTotal)) " +
           "FROM Pedido p " +
           "GROUP BY p.cliente.nombre " +
           "ORDER BY SUM(p.precioTotal) DESC")
    List<ReporteVentasPorClienteDTO> obtenerReporteVentasPorCliente();
}
