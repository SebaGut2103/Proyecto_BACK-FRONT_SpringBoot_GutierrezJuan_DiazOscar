package com.projectspringboot.a.proyecspringboot.service;



import com.projectspringboot.a.proyecspringboot.dto.PedidoRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.PedidoResponseDTO;
import java.util.List;

public interface PedidoService {
    PedidoResponseDTO crearPedido(PedidoRequestDTO pedidoRequest);
    PedidoResponseDTO obtenerPedidoPorId(Long id);
    List<PedidoResponseDTO> obtenerPedidosPorCliente(Long clienteId);
}