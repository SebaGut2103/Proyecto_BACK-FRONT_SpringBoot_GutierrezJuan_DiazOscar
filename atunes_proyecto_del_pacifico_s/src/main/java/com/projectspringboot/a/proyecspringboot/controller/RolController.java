package com.projectspringboot.a.proyecspringboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectspringboot.a.proyecspringboot.model.Rol;
import com.projectspringboot.a.proyecspringboot.service.RolService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/rol")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public ResponseEntity<List<Rol>> obteneRol(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Long id) {
        List<Rol> roles;
        if (nombre != null && !nombre.isEmpty()) {
            roles = rolService.buscarNombreRol(nombre);
        } else if (id != null) {
            Optional<Rol> rol = rolService.obtenerRolPorID(id);
            roles = rol.isPresent() ? List.of(rol.get()) : List.of();
        } else {
            roles = rolService.obtenerRol();
        }
        if (!roles.isEmpty()) {
            return ResponseEntity.ok(roles);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> obtenerID(@PathVariable Long id) {
        Optional<Rol> roles = rolService.obtenerRolPorID(id);

        return roles.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Rol> CrearRol(@RequestBody Rol roles) {
        try {
            if (roles.getId() != null)
                return ResponseEntity.badRequest().build();
            Rol nuevoRol = rolService.crearNuevoRol(roles);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoRol);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Rol> eliminarRol(@PathVariable Long id) {
        try {
            rolService.eliminarRol(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().contains("No encontrado"))
                return ResponseEntity.notFound().build();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rol> actualizarRolS(@PathVariable Long id, @RequestBody Rol detallesRol) {
        try {
            Rol actualizado = rolService.actualizarRol(detallesRol, id);
            return ResponseEntity.ok(actualizado); // 200 OK con el funcionario actualizado
        }catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().contains("no existe")) {
                return ResponseEntity.notFound().build(); // 404 Not Found si el ID no existe

            }
            return ResponseEntity.notFound().build(); // 404 Not Found si el ID no existe
        }
    }
}
