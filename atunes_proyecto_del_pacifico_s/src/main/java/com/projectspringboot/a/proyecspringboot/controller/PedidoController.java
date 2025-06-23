package com.projectspringboot.a.proyecspringboot.controller;






import com.projectspringboot.a.proyecspringboot.dto.PedidoRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.PedidoResponseDTO;
import com.projectspringboot.a.proyecspringboot.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    
    @PostMapping
    @PreAuthorize("hasAuthority('CLIENTE')")
    public ResponseEntity<PedidoResponseDTO> crearPedido(
           @Valid @RequestBody PedidoRequestDTO pedidoRequest,
            Authentication authentication
    ) {
        String username = authentication.getName();
        PedidoResponseDTO nuevoPedido = pedidoService.crearPedido(pedidoRequest, username);
        return new ResponseEntity<>(nuevoPedido, HttpStatus.CREATED);
    }

    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('OPERADOR', 'ADMINISTRADOR')")
    public ResponseEntity<PedidoResponseDTO> obtenerPedidoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.obtenerPedidoPorId(id));
    }

    
    @GetMapping("/historial")
    @PreAuthorize("hasAuthority('CLIENTE')")
    public ResponseEntity<List<PedidoResponseDTO>> obtenerMiHistorial(Authentication authentication) {
        String nombreUsuario = authentication.getName();
        List<PedidoResponseDTO> historial = pedidoService.obtenerHistorialDePedidos(nombreUsuario);
        return ResponseEntity.ok(historial);
    }
}