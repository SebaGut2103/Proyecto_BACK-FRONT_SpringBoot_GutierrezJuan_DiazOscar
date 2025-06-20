package com.projectspringboot.a.proyecspringboot.controller;



import com.projectspringboot.a.proyecspringboot.dto.ClienteRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.ClienteResponseDTO;
import com.projectspringboot.a.proyecspringboot.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clientes")
@CrossOrigin
public class ClienteController {
// sebas es medio
    @Autowired
    private ClienteService clienteService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMINISTRADOR', 'OPERADOR')")
    public ResponseEntity<ClienteResponseDTO> crearCliente(@RequestBody ClienteRequestDTO clienteRequest) {
        ClienteResponseDTO nuevoCliente = clienteService.crearCliente(clienteRequest);
        return new ResponseEntity<>(nuevoCliente, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMINISTRADOR', 'OPERADOR')")
    public ResponseEntity<List<ClienteResponseDTO>> obtenerTodos() {
        return ResponseEntity.ok(clienteService.obtenerTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRADOR', 'OPERADOR')")
    public ResponseEntity<ClienteResponseDTO> obtenerClientePorId(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.obtenerClientePorId(id));
    }
}