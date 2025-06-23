package com.projectspringboot.a.proyecspringboot.mapper;



import com.projectspringboot.a.proyecspringboot.dto.ClienteResponseDTO;
import com.projectspringboot.a.proyecspringboot.entity.Cliente;

public class ClienteMapper {

    public static ClienteResponseDTO toDto(Cliente cliente) {
        if (cliente == null) {
            return null;
        }
        ClienteResponseDTO dto = new ClienteResponseDTO();
        dto.setId(cliente.getId());
        dto.setNombre(cliente.getNombre());
        dto.setRuc(cliente.getRuc());
        
        return dto;
    }
}
