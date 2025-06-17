package com.projectspringboot.a.proyecspringboot.service;



import com.projectspringboot.a.proyecspringboot.dto.UsuarioRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.UsuarioResponseDTO;
import java.util.List;

public interface UsuarioService {
    UsuarioResponseDTO registrarUsuario(UsuarioRequestDTO usuarioRequest);
    UsuarioResponseDTO obtenerUsuarioPorId(Long id);
    List<UsuarioResponseDTO> obtenerTodos();
    void cambiarEstado(Long id, boolean estado);
}
