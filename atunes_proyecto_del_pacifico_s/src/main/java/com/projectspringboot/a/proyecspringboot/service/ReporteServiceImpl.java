package com.projectspringboot.a.proyecspringboot.service;




import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorClienteDTO;
import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO;
import com.projectspringboot.a.proyecspringboot.repository.DetallesPedidoRepository;
import com.projectspringboot.a.proyecspringboot.repository.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReporteServiceImpl implements ReporteService {

    @Autowired
    private DetallesPedidoRepository detallesPedidoRepository;

     @Autowired 
    private PedidoRepository pedidoRepository;

    @Override
    public List<ReporteVentasPorProductoDTO> getReporteVentasPorProducto() {
        return detallesPedidoRepository.obtenerReporteVentasPorProducto();
    }

     @Override 
    public List<ReporteVentasPorClienteDTO> getReporteVentasPorCliente() {
        return pedidoRepository.obtenerReporteVentasPorCliente();
    }
}