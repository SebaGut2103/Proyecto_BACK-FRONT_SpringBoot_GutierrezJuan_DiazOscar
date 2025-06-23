package com.projectspringboot.a.proyecspringboot.service;


import com.projectspringboot.a.proyecspringboot.dto.ReporteInventarioDTO;
import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorClienteDTO;
import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO;
import java.util.List;

public interface ReporteService {
    List<ReporteVentasPorProductoDTO> getReporteVentasPorProducto();
    List<ReporteVentasPorClienteDTO> getReporteVentasPorCliente();
    List<ReporteInventarioDTO> getReporteInventario();
}