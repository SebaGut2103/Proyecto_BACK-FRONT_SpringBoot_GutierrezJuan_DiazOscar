package com.projectspringboot.a.proyecspringboot.dto;



import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class PedidoRequestDTO {
 
    private LocalDate fechaEntrega;
    private List<DetallePedidoRequestDTO> detalles;
}
