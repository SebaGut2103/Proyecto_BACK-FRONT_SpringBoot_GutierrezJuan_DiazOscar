package com.projectspringboot.a.proyecspringboot.dto;



import com.projectspringboot.a.proyecspringboot.entity.enums.TipoProducto; 
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor 
public class ReporteVentasPorProductoDTO {
    private TipoProducto tipoProducto;
    private Long cantidadVendida;
    private BigDecimal totalVentas;
}