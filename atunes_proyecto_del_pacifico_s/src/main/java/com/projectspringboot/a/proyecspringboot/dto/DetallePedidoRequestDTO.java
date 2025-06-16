package com.projectspringboot.a.proyecspringboot.dto;


import lombok.Data;

@Data
public class DetallePedidoRequestDTO {
    private Long loteId;
    private Integer cantidad;
}
