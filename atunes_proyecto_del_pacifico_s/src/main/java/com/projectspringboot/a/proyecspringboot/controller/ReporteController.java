package com.projectspringboot.a.proyecspringboot.controller;





import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO;
import com.projectspringboot.a.proyecspringboot.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reportes")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/ventas-por-producto")
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public ResponseEntity<List<ReporteVentasPorProductoDTO>> getReporteVentasPorProducto() {
        return ResponseEntity.ok(reporteService.getReporteVentasPorProducto());
    }
}