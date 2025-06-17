package com.projectspringboot.a.proyecspringboot.mapper;



import com.projectspringboot.a.proyecspringboot.dto.LoteProduccionResponseDTO;
import com.projectspringboot.a.proyecspringboot.entity.LoteProduccion;

public class LoteProduccionMapper {

    public static LoteProduccionResponseDTO toDto(LoteProduccion lote) {
        if (lote == null) {
            return null;
        }
        LoteProduccionResponseDTO dto = new LoteProduccionResponseDTO();
        dto.setId(lote.getId());
        dto.setCodigoLote(lote.getCodigoLote());
        dto.setFechaProduccion(lote.getFechaProduccion());
        dto.setTipoProducto(lote.getTipoProducto().name());
        dto.setCantidadProducida(lote.getCantidadProducida());
        dto.setCantidadDisponible(lote.getCantidadDisponible());
        dto.setEstado(lote.getEstado().name());
        dto.setFechaCreacion(lote.getFechaCreacion());
        return dto;
    }
}
