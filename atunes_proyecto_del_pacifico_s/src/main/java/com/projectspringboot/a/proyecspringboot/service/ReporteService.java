package com.projectspringboot.a.proyecspringboot.service;


import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO;
import java.util.List;

public interface ReporteService {
    List<ReporteVentasPorProductoDTO> getReporteVentasPorProducto();
}