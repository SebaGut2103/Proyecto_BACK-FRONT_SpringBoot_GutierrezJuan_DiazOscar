package com.projectspringboot.a.proyecspringboot.service;



import com.projectspringboot.a.proyecspringboot.dto.LoteProduccionRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.LoteProduccionResponseDTO;
import com.projectspringboot.a.proyecspringboot.entity.LoteProduccion;
import com.projectspringboot.a.proyecspringboot.entity.enums.EstadoLote;
import com.projectspringboot.a.proyecspringboot.mapper.LoteProduccionMapper;
import com.projectspringboot.a.proyecspringboot.repository.LoteProduccionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoteProduccionServiceImpl implements LoteProduccionService {

    @Autowired
    private LoteProduccionRepository loteProduccionRepository;

    @Override
    public LoteProduccionResponseDTO registrarLote(LoteProduccionRequestDTO req) {
        if (loteProduccionRepository.findByCodigoLote(req.getCodigoLote()).isPresent()){
            throw new IllegalArgumentException("El código de lote ya existe.");
        }

        LoteProduccion lote = new LoteProduccion();
        lote.setCodigoLote(req.getCodigoLote());
        lote.setFechaProduccion(req.getFechaProduccion());
        lote.setTipoProducto(req.getTipoProducto());
        lote.setCantidadProducida(req.getCantidadProducida());
        lote.setCantidadDisponible(req.getCantidadProducida());
        lote.setEstado(EstadoLote.Disponible);

        LoteProduccion loteGuardado = loteProduccionRepository.save(lote);
        return LoteProduccionMapper.toDto(loteGuardado);
    }

    @Override
    public List<LoteProduccionResponseDTO> obtenerInventario() {
        return loteProduccionRepository.findAll()
                .stream()
                .map(LoteProduccionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public LoteProduccionResponseDTO marcarComoDefectuoso(Long id) {
        LoteProduccion lote = loteProduccionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lote no encontrado con ID: " + id));

        lote.setEstado(EstadoLote.Defectuoso);
        LoteProduccion loteActualizado = loteProduccionRepository.save(lote);
        return LoteProduccionMapper.toDto(loteActualizado);
    }
}
