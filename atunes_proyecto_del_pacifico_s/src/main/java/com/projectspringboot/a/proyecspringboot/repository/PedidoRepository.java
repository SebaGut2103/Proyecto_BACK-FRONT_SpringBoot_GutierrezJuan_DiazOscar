package com.projectspringboot.a.proyecspringboot.repository;

import com.projectspringboot.a.proyecspringboot.entity.Cliente;
import com.projectspringboot.a.proyecspringboot.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // Método para encontrar todos los pedidos de un cliente específico.
    List<Pedido> findByCliente(Cliente cliente);
    List<Pedido> findByCliente_Usuario_NombreUsuario(String nombreUsuario);
}
