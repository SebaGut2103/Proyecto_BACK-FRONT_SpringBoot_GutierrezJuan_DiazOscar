package com.projectspringboot.a.proyecspringboot.repository;


import com.projectspringboot.a.proyecspringboot.entity.Cliente;
import com.projectspringboot.a.proyecspringboot.entity.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Método  buscar por su RUC.
    Optional<Cliente> findByRuc(String ruc);
    Optional<Cliente> findByUsuario(Usuario usuario);
}
