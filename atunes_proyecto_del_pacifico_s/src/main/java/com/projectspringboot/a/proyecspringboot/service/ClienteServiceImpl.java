package com.projectspringboot.a.proyecspringboot.service;


import com.projectspringboot.a.proyecspringboot.dto.ClienteRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.ClienteResponseDTO;
import com.projectspringboot.a.proyecspringboot.entity.Cliente;
import com.projectspringboot.a.proyecspringboot.entity.Usuario;
import com.projectspringboot.a.proyecspringboot.mapper.ClienteMapper;
import com.projectspringboot.a.proyecspringboot.repository.ClienteRepository;
import com.projectspringboot.a.proyecspringboot.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public ClienteResponseDTO crearCliente(ClienteRequestDTO req) {
        if (clienteRepository.findByRuc(req.getRuc()).isPresent()) {
            throw new IllegalArgumentException("El RUC ingresado ya está registrado.");
        }

        Cliente nuevoCliente = new Cliente();
        nuevoCliente.setNombre(req.getNombre());
        nuevoCliente.setRuc(req.getRuc());
        nuevoCliente.setEmail(req.getEmail());
        nuevoCliente.setTelefono(req.getTelefono());
        nuevoCliente.setDireccion(req.getDireccion());

        if (req.getUsuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(req.getUsuarioId())
                    .orElseThrow(() -> new EntityNotFoundException("Usuario a vincular no encontrado con ID: " + req.getUsuarioId()));
            nuevoCliente.setUsuario(usuario);
        }

        Cliente clienteGuardado = clienteRepository.save(nuevoCliente);
        return ClienteMapper.toDto(clienteGuardado);
    }

    @Override
    public ClienteResponseDTO obtenerClientePorId(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con ID: " + id));
        return ClienteMapper.toDto(cliente);
    }

    @Override
    public List<ClienteResponseDTO> obtenerTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(ClienteMapper::toDto)
                .collect(Collectors.toList());
    }
}
