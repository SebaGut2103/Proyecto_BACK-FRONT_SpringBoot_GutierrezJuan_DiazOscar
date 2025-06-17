package com.projectspringboot.a.proyecspringboot.dto;



import lombok.Data;
import java.time.Instant;
import java.time.LocalDate;

@Data
public class LoteProduccionResponseDTO {
    private Long id;
    private String codigoLote;
    private LocalDate fechaProduccion;
    private String tipoProducto;
    private Integer cantidadProducida;
    private Integer cantidadDisponible;
    private String estado;
    private Instant fechaCreacion;
}
