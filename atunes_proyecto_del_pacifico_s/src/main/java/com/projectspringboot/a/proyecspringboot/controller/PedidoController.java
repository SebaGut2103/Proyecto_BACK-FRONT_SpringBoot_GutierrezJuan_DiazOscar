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

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    /**
     * Endpoint para que un cliente o administrador cree un nuevo pedido.
     */
    @PostMapping
    @PreAuthorize("hasAnyAuthority('CLIENTE', 'ADMINISTRADOR')")
    public ResponseEntity<PedidoResponseDTO> crearPedido(@RequestBody PedidoRequestDTO pedidoRequest) {
        PedidoResponseDTO nuevoPedido = pedidoService.crearPedido(pedidoRequest);
        return new ResponseEntity<>(nuevoPedido, HttpStatus.CREATED);
    }

    /**
     * Endpoint para que un operador o administrador obtenga un pedido por su ID.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('OPERADOR', 'ADMINISTRADOR')")
    public ResponseEntity<PedidoResponseDTO> obtenerPedidoPorId(@PathVariable Long id) {
        // En el servicio se podría añadir una validación extra si fuera necesario.
        return ResponseEntity.ok(pedidoService.obtenerPedidoPorId(id));
    }
    
    /**
     * Endpoint para que un cliente obtenga su propio historial de pedidos.
     * Es seguro porque obtiene la identidad del usuario directamente del token JWT procesado por Spring Security.
     * * @param authentication Objeto inyectado por Spring Security que contiene los detalles del usuario autenticado.
     * @return Una lista con los pedidos del cliente que realiza la petición.
     */
    @GetMapping("/historial")
    @PreAuthorize("hasAuthority('CLIENTE')")
    public ResponseEntity<List<PedidoResponseDTO>> obtenerMiHistorial(Authentication authentication) {
        // De aquí obtenemos el "username" del usuario que fue validado por el JwtAuthFilter.
        String nombreUsuario = authentication.getName();
        
        // Llamamos al nuevo método del servicio que busca pedidos por nombre de usuario.
        List<PedidoResponseDTO> historial = pedidoService.obtenerHistorialDePedidos(nombreUsuario);
        
        return ResponseEntity.ok(historial);
    }
}