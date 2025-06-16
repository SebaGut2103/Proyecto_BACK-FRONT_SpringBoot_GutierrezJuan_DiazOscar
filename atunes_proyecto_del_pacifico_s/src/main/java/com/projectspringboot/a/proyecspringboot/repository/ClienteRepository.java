package com.projectspringboot.a.proyecspringboot.repository;


import com.projectspringboot.a.proyecspringboot.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Método para buscar un cliente por su RUC.
    Optional<Cliente> findByRuc(String ruc);
}
