package com.projectspringboot.a.proyecspringboot.controller;



import com.projectspringboot.a.proyecspringboot.dto.PedidoRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.PedidoResponseDTO;
import com.projectspringboot.a.proyecspringboot.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
@CrossOrigin
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMINISTRADOR')")
    public ResponseEntity<PedidoResponseDTO> crearPedido(@RequestBody PedidoRequestDTO pedidoRequest) {
        PedidoResponseDTO nuevoPedido = pedidoService.crearPedido(pedidoRequest);
        return new ResponseEntity<>(nuevoPedido, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CLIENTE', 'OPERADOR', 'ADMINISTRADOR')")
    public ResponseEntity<PedidoResponseDTO> obtenerPedidoPorId(@PathVariable Long id) {
        // En el servicio se debería validar que un cliente solo vea sus propios pedidos
        return ResponseEntity.ok(pedidoService.obtenerPedidoPorId(id));
    }

    @GetMapping("/cliente/{clienteId}")
    @PreAuthorize("hasAnyRole('OPERADOR', 'ADMINISTRADOR')")
    public ResponseEntity<List<PedidoResponseDTO>> obtenerPedidosDeCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(pedidoService.obtenerPedidosPorCliente(clienteId));
    }
}
