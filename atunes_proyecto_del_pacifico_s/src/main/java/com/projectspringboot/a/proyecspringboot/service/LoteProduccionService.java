package com.projectspringboot.a.proyecspringboot.service;



import com.projectspringboot.a.proyecspringboot.dto.LoteProduccionRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.LoteProduccionResponseDTO;
import java.util.List;

public interface LoteProduccionService {
    LoteProduccionResponseDTO registrarLote(LoteProduccionRequestDTO loteRequest);
    List<LoteProduccionResponseDTO> obtenerInventario();
    LoteProduccionResponseDTO marcarComoDefectuoso(Long id);
}
