package com.projectspringboot.a.proyecspringboot.dto;



import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
public class PedidoResponseDTO {
    private Long id;
    private Instant fechaPedido;
    private LocalDate fechaEntrega;
    private String estado;
    private BigDecimal precioTotal;
    private ClienteResponseDTO cliente;
    private List<DetallePedidoResponseDTO> detalles; // Lista de objetos anidados
}