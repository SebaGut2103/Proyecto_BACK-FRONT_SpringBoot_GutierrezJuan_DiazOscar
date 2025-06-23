package com.projectspringboot.a.proyecspringboot.service;







import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectspringboot.a.proyecspringboot.dto.ReporteInventarioDTO;
import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorClienteDTO;
import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO;
import com.projectspringboot.a.proyecspringboot.repository.DetallesPedidoRepository;
import com.projectspringboot.a.proyecspringboot.repository.LoteProduccionRepository;
import com.projectspringboot.a.proyecspringboot.repository.PedidoRepository;

@Service
public class ReporteServiceImpl implements ReporteService {

    @Autowired
    private DetallesPedidoRepository detallesPedidoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private LoteProduccionRepository loteProduccionRepository;

    @Override
    public List<ReporteVentasPorProductoDTO> getReporteVentasPorProducto() {
        return detallesPedidoRepository.obtenerReporteVentasPorProducto();
    }

    @Override
    public List<ReporteVentasPorClienteDTO> getReporteVentasPorCliente() {
        return pedidoRepository.obtenerReporteVentasPorCliente();
    }


    @Override
    public List<ReporteInventarioDTO> getReporteInventario() {
        
        
        return loteProduccionRepository.obtenerReporteDeInventario();
    }
}