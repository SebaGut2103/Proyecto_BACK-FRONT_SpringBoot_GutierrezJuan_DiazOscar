package com.projectspringboot.a.proyecspringboot.dto;



import lombok.Data;

@Data
public class ClienteRequestDTO {
    private String nombre;
    private String ruc;
    private String email;
    private String telefono;
    private String direccion;
    private Long usuarioId;
}
