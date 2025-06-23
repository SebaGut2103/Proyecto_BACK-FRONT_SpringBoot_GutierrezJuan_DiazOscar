package com.projectspringboot.a.proyecspringboot.repository;



import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO;
import com.projectspringboot.a.proyecspringboot.entity.DetallesPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetallesPedidoRepository extends JpaRepository<DetallesPedido, Long> {

    
    @Query("SELECT new com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO(" +
           "dp.loteProduccion.tipoProducto, " +
           "SUM(dp.cantidad), " +
           "SUM(dp.cantidad * dp.precioUnitario)) " +
           "FROM DetallesPedido dp " +
           "GROUP BY dp.loteProduccion.tipoProducto")
    List<ReporteVentasPorProductoDTO> obtenerReporteVentasPorProducto();
}