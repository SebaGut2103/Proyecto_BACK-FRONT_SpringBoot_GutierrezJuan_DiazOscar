package com.projectspringboot.a.proyecspringboot.dto;


import com.projectspringboot.a.proyecspringboot.entity.enums.EstadoLote;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReporteInventarioDTO {
    private EstadoLote estado;
    private Long cantidad;
}