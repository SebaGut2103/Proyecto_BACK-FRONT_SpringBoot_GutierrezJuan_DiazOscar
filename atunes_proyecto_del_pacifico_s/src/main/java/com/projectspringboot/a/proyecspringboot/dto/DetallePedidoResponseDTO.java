package com.projectspringboot.a.proyecspringboot.dto;


import lombok.Data;
import java.math.BigDecimal;

@Data
public class DetallePedidoResponseDTO {
    private Long idDetalle;
    private String codigoLote;
    private String tipoProducto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal; // Campo calculado (cantidad * precioUnitario)
}
