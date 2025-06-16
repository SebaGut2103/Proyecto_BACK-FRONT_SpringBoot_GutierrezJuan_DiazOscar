package com.projectspringboot.a.proyecspringboot.service;

import com.projectspringboot.a.proyecspringboot.model.Rol;
import com.projectspringboot.a.proyecspringboot.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    @Transactional(readOnly = true)
    public List<Rol> obtenerRol(){
        return rolRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Optional<Rol> obtenerRolPorID(Long id){
        if (id != null)
            return rolRepository.findById(id);
        return Optional.empty();
    }

    @Transactional(readOnly = true)
    public List<Rol> buscarNombreRol(String nombre){
        if (nombre == null || nombre.trim().isEmpty()){
            return new ArrayList<>();
        }
        return rolRepository.finByNombreContainingIgnoreCase(nombre);
    }

    @Transactional(readOnly = true)
    public Rol crearNuevoRol(Rol rol){
        if (rol == null){
            throw new IllegalArgumentException("El objeto Rol no puede ser nulo");
        }
        if (rol.getId() != null){
            throw new IllegalArgumentException("El id debe ser nulo para crear un nuevo ROL");

        }
        return rolRepository.save(rol);
    }

    @Transactional(readOnly = true)
    public void eliminarRol(Long id){
        if(id == null){
            throw new IllegalArgumentException("El id no puede ser nulo");
        }
        if(!rolRepository.existsById(id)){
            throw new IllegalArgumentException("El id no existe");
        }
        rolRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Rol actualizarRol(Rol rolnuevo, Long id){
        if (id == null || rolnuevo == null){
            throw new IllegalArgumentException("El id y los datos no puede ser nulo");
        }
        Optional<Rol> rolExistente = rolRepository.findById(id);
        if(!rolExistente.isPresent()){
            throw new RuntimeException("El rol no es encontrado con el ID:  " + id);
        }
        int filasAfectadas = rolRepository.actualizarRolConJPQL(id, 
        rolnuevo.getNombre());
        if (filasAfectadas > 0)
            return rolRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Error al recuperar el rol actualizado con ID: " + id));
        else
            throw new RuntimeException("La actualización del rol con ID: " + id + " no se realizó correctamente");
    }
}
