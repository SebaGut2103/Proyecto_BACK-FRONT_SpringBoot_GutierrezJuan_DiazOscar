package com.projectspringboot.a.proyecspringboot.service;



import com.projectspringboot.a.proyecspringboot.dto.ClienteRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.ClienteResponseDTO;
import java.util.List;

public interface ClienteService {
    ClienteResponseDTO crearCliente(ClienteRequestDTO clienteRequest);
    ClienteResponseDTO obtenerClientePorId(Long id);
    List<ClienteResponseDTO> obtenerTodos();
    // Requerimiento a futuro: Ver un cliente con su historial de pedidos
    // ClienteConPedidosDTO obtenerClienteConPedidos(Long id);
}