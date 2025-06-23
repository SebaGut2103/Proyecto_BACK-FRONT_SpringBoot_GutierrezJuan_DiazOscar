package com.projectspringboot.a.proyecspringboot.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ReporteVentasPorClienteDTO {
    private String nombreCliente;
    private Long numeroDePedidos;
    private BigDecimal totalComprado;
}