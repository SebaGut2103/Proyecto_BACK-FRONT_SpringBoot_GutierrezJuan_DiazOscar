package com.projectspringboot.a.proyecspringboot.service;




import com.projectspringboot.a.proyecspringboot.dto.ReporteVentasPorProductoDTO;
import com.projectspringboot.a.proyecspringboot.repository.DetallesPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReporteServiceImpl implements ReporteService {

    @Autowired
    private DetallesPedidoRepository detallesPedidoRepository;

    @Override
    public List<ReporteVentasPorProductoDTO> getReporteVentasPorProducto() {
        return detallesPedidoRepository.obtenerReporteVentasPorProducto();
    }
}