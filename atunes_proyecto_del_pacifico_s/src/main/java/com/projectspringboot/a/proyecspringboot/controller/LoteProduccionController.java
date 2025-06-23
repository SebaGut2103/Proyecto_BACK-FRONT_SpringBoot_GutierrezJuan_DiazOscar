package com.projectspringboot.a.proyecspringboot.controller;



import com.projectspringboot.a.proyecspringboot.dto.LoteProduccionRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.LoteProduccionResponseDTO;
import com.projectspringboot.a.proyecspringboot.service.LoteProduccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lotes")
@CrossOrigin
public class LoteProduccionController {

    @Autowired
    private LoteProduccionService loteProduccionService;

    
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMINISTRADOR', 'OPERADOR')")
    public ResponseEntity<LoteProduccionResponseDTO> registrarLote(@RequestBody LoteProduccionRequestDTO loteRequest) {
        LoteProduccionResponseDTO nuevoLote = loteProduccionService.registrarLote(loteRequest);
        return new ResponseEntity<>(nuevoLote, HttpStatus.CREATED);
    }

    
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMINISTRADOR', 'OPERADOR', 'CLIENTE')")
    public ResponseEntity<List<LoteProduccionResponseDTO>> obtenerInventario() {
        return ResponseEntity.ok(loteProduccionService.obtenerInventario());
    }

    
    @PatchMapping("/{id}/marcar-defectuoso")
    @PreAuthorize("hasAnyAuthority('ADMINISTRADOR', 'OPERADOR', 'CLIENTE')")
    public ResponseEntity<LoteProduccionResponseDTO> marcarComoDefectuoso(@PathVariable Long id) {
        LoteProduccionResponseDTO loteActualizado = loteProduccionService.marcarComoDefectuoso(id);
        return ResponseEntity.ok(loteActualizado);
    }
}