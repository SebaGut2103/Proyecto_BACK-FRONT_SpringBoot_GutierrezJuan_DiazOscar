package com.projectspringboot.a.proyecspringboot.controller;



import com.projectspringboot.a.proyecspringboot.dto.UsuarioRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.UsuarioResponseDTO;
import com.projectspringboot.a.proyecspringboot.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Endpoint para registrar un nuevo usuario.
     * Solo accesible por administradores.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<UsuarioResponseDTO> registrarUsuario(@RequestBody UsuarioRequestDTO usuarioRequest) {
        UsuarioResponseDTO nuevoUsuario = usuarioService.registrarUsuario(usuarioRequest);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    /**
     * Endpoint para obtener todos los usuarios.
     * Solo accesible por administradores.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<UsuarioResponseDTO>> obtenerTodos() {
        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    /**
     * Endpoint para obtener un usuario por su ID.
     * Solo accesible por administradores.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<UsuarioResponseDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerUsuarioPorId(id));
    }

    /**
     * Endpoint para cambiar el estado (activo/inactivo) de un usuario.
     * Solo accesible por administradores.
     */
    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Void> cambiarEstado(@PathVariable Long id, @RequestParam boolean estado) {
        usuarioService.cambiarEstado(id, estado);
        return ResponseEntity.noContent().build();
    }
}
