package com.projectspringboot.a.proyecspringboot.service;






import com.projectspringboot.a.proyecspringboot.dto.PedidoRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.PedidoResponseDTO;
import com.projectspringboot.a.proyecspringboot.entity.*;
import com.projectspringboot.a.proyecspringboot.mapper.PedidoMapper;
import com.projectspringboot.a.proyecspringboot.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private LoteProduccionRepository loteProduccionRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    @Transactional
    public PedidoResponseDTO crearPedido(PedidoRequestDTO pedidoRequest, String username) {
        
        Usuario usuario = usuarioRepository.findByNombreUsuario(username)
                .orElseThrow(() -> new EntityNotFoundException("El usuario autenticado no fue encontrado: " + username));
        
        Cliente cliente = clienteRepository.findByUsuario(usuario)
                .orElseThrow(() -> new EntityNotFoundException("No se encontró un cliente asociado al usuario: " + username));

        Pedido nuevoPedido = new Pedido();
        nuevoPedido.setCliente(cliente);
        nuevoPedido.setFechaEntrega(pedidoRequest.getFechaEntrega());
        nuevoPedido.setDetalles(new ArrayList<>());

        BigDecimal precioTotalCalculado = BigDecimal.ZERO;

        
        for (var detalleDto : pedidoRequest.getDetalles()) {
            LoteProduccion lote = loteProduccionRepository.findById(detalleDto.getLoteId())
                    .orElseThrow(() -> new EntityNotFoundException("Lote no encontrado con ID: " + detalleDto.getLoteId()));

            if (lote.getCantidadDisponible() < detalleDto.getCantidad()) {
                throw new IllegalStateException("Stock insuficiente para el lote: " + lote.getCodigoLote());
            }

            
            lote.setCantidadDisponible(lote.getCantidadDisponible() - detalleDto.getCantidad());
            
            DetallesPedido detalle = new DetallesPedido();
            detalle.setPedido(nuevoPedido);
            detalle.setLoteProduccion(lote);
            detalle.setCantidad(detalleDto.getCantidad());
            
            BigDecimal precioUnitario = new BigDecimal("2.50"); 
            detalle.setPrecioUnitario(precioUnitario);

            nuevoPedido.getDetalles().add(detalle);

            
            precioTotalCalculado = precioTotalCalculado.add(precioUnitario.multiply(new BigDecimal(detalle.getCantidad())));
        }

        nuevoPedido.setPrecioTotal(precioTotalCalculado);

        
        Pedido pedidoGuardado = pedidoRepository.save(nuevoPedido);
        
        
        return PedidoMapper.toDto(pedidoGuardado);
    }

    @Override
    public PedidoResponseDTO obtenerPedidoPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado con ID: " + id));
        return PedidoMapper.toDto(pedido);
    }

    @Override
    public List<PedidoResponseDTO> obtenerPedidosPorCliente(Long clienteId) {
        if (!clienteRepository.existsById(clienteId)) {
            throw new EntityNotFoundException("Cliente no encontrado con ID: " + clienteId);
        }
        List<Pedido> pedidos = pedidoRepository.findByClienteId(clienteId);
        return pedidos.stream()
                .map(PedidoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PedidoResponseDTO> obtenerHistorialDePedidos(String nombreUsuario) {
        List<Pedido> pedidos = pedidoRepository.findByCliente_Usuario_NombreUsuario(nombreUsuario);
        return pedidos.stream()
                .map(PedidoMapper::toDto)
                .collect(Collectors.toList());
    }
}