package com.projectspringboot.a.proyecspringboot.service;




import com.projectspringboot.a.proyecspringboot.dto.UsuarioRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.UsuarioResponseDTO;
import com.projectspringboot.a.proyecspringboot.entity.Rol;
import com.projectspringboot.a.proyecspringboot.entity.Usuario;
import com.projectspringboot.a.proyecspringboot.repository.RolRepository;
import com.projectspringboot.a.proyecspringboot.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UsuarioResponseDTO registrarUsuario(UsuarioRequestDTO req) {
        if (usuarioRepository.findByNombreUsuario(req.getNombreUsuario()).isPresent()) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso.");
        }
        if (usuarioRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está en uso.");
        }

        Rol rol = rolRepository.findById(req.getRolId())
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado con ID: " + req.getRolId()));

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreUsuario(req.getNombreUsuario());
        nuevoUsuario.setEmail(req.getEmail());
        nuevoUsuario.setContrasena(passwordEncoder.encode(req.getContrasena())); // Encriptación
        nuevoUsuario.setRol(rol);
        nuevoUsuario.setEstaActivo(true);

        return toDto(usuarioRepository.save(nuevoUsuario));
    }

    // --- probando metodo ver6 ---
    @Override
    public UsuarioResponseDTO obtenerUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + id));
        return toDto(usuario);
    }

    // --- prueba de metodo ver7 ---
    @Override
    public List<UsuarioResponseDTO> obtenerTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // --- prueba exitosa ---
    @Override
    @Transactional
    public void cambiarEstado(Long id, boolean estado) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + id));
        usuario.setEstaActivo(estado);
        usuarioRepository.save(usuario);
    }

    // Mapper privado de Entidad a DTO
    private UsuarioResponseDTO toDto(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNombreUsuario(usuario.getNombreUsuario());
        dto.setEmail(usuario.getEmail());
        dto.setNombreRol(usuario.getRol().getNombre());
        dto.setEstaActivo(usuario.isEstaActivo());
        return dto;
    }
}