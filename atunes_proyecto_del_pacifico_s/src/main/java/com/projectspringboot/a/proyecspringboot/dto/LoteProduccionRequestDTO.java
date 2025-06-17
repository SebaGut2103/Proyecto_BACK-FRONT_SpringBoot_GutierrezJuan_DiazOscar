package com.projectspringboot.a.proyecspringboot.dto;



import com.projectspringboot.a.proyecspringboot.entity.enums.TipoProducto;
import lombok.Data;
import java.time.LocalDate;

@Data
public class LoteProduccionRequestDTO {
    private String codigoLote;
    private LocalDate fechaProduccion;
    private TipoProducto tipoProducto;
    private Integer cantidadProducida;
}
