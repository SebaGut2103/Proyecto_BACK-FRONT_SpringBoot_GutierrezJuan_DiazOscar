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

    @Override
    @Transactional
    public PedidoResponseDTO crearPedido(PedidoRequestDTO pedidoRequest) {
        Cliente cliente = clienteRepository.findById(pedidoRequest.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con ID: " + pedidoRequest.getClienteId()));

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
            // No es necesario guardar aquí, JPA lo hará al final de la transacción

            DetallesPedido detalle = new DetallesPedido();
            detalle.setPedido(nuevoPedido);
            detalle.setLoteProduccion(lote);
            detalle.setCantidad(detalleDto.getCantidad());
            BigDecimal precioUnitario = new BigDecimal("2.50"); // Precio de ejemplo
            detalle.setPrecioUnitario(precioUnitario);

            nuevoPedido.getDetalles().add(detalle);

            precioTotalCalculado = precioTotalCalculado.add(precioUnitario.multiply(new BigDecimal(detalle.getCantidad())));
        }

        nuevoPedido.setPrecioTotal(precioTotalCalculado);

        Pedido pedidoGuardado = pedidoRepository.save(nuevoPedido);

        // --> CAMBIO AQUÍ: Usamos el mapper para crear la respuesta.
        return PedidoMapper.toDto(pedidoGuardado);
    }

    @Override
    public PedidoResponseDTO obtenerPedidoPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado con ID: " + id));

        // --> CAMBIO AQUÍ: Usamos el mapper para crear la respuesta.
        return PedidoMapper.toDto(pedido);
    }

    @Override
    public List<PedidoResponseDTO> obtenerPedidosPorCliente(Long clienteId) {
        // Primero validamos que el cliente exista
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con ID: " + clienteId));

        List<Pedido> pedidos = pedidoRepository.findByCliente(cliente);

        // --> CAMBIO AQUÍ: Usamos el mapper para convertir cada pedido de la lista a su DTO.
        return pedidos.stream()
                .map(PedidoMapper::toDto) // Llama al método toDto por cada elemento de la lista
                .collect(Collectors.toList());
    }

    @Override
    public List<PedidoResponseDTO> obtenerHistorialDePedidos(String nombreUsuario) {
        // Usamos el nuevo método del repositorio
        List<Pedido> pedidos = pedidoRepository.findByCliente_Usuario_NombreUsuario(nombreUsuario);
        
        // Mapeamos la lista de entidades a una lista de DTOs y la devolvemos
        return pedidos.stream()
                .map(PedidoMapper::toDto)
                .collect(Collectors.toList());
    }
}