package com.projectspringboot.a.proyecspringboot.dto;



import lombok.Data;

@Data
public class AuthRequestDTO {
    private String nombreUsuario;
    private String contrasena;
}