package com.projectspringboot.a.proyecspringboot.dto;



import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nombreUsuario;
    private String email;
    private String nombreRol;
    private boolean estaActivo;
}
