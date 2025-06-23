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

    
    @PostMapping
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public ResponseEntity<UsuarioResponseDTO> registrarUsuario(@RequestBody UsuarioRequestDTO usuarioRequest) {
        UsuarioResponseDTO nuevoUsuario = usuarioService.registrarUsuario(usuarioRequest);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    
    @GetMapping
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public ResponseEntity<List<UsuarioResponseDTO>> obtenerTodos() {
        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public ResponseEntity<UsuarioResponseDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerUsuarioPorId(id));
    }

    
    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public ResponseEntity<Void> cambiarEstado(@PathVariable Long id, @RequestParam boolean estado) {
        usuarioService.cambiarEstado(id, estado);
        return ResponseEntity.noContent().build();
    }
}
