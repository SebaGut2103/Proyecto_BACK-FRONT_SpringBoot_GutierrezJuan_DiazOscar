package com.projectspringboot.a.proyecspringboot.dto;


import lombok.Data;

@Data
public class UsuarioRequestDTO {
    private String nombreUsuario;
    private String email;
    private String contrasena;
    private Long rolId;
}
