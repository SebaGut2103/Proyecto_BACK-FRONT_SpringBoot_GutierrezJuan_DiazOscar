package com.projectspringboot.a.proyecspringboot.mapper;



import com.projectspringboot.a.proyecspringboot.dto.ClienteResponseDTO;
import com.projectspringboot.a.proyecspringboot.dto.DetallePedidoResponseDTO;
import com.projectspringboot.a.proyecspringboot.dto.PedidoResponseDTO;
import com.projectspringboot.a.proyecspringboot.entity.DetallesPedido;
import com.projectspringboot.a.proyecspringboot.entity.Pedido;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class PedidoMapper {

    /**
     * Convierte una entidad Pedido a su DTO de respuesta correspondiente.
     * @param pedido La entidad Pedido a convertir.
     * @return El DTO con la información formateada.
     */
    public static PedidoResponseDTO toDto(Pedido pedido) {
        if (pedido == null) {
            return null;
        }

        // 1. Mapear la información del cliente
        ClienteResponseDTO clienteDto = new ClienteResponseDTO();
        clienteDto.setId(pedido.getCliente().getId());
        clienteDto.setNombre(pedido.getCliente().getNombre());
        clienteDto.setRuc(pedido.getCliente().getRuc());

        // 2. Mapear la lista de detalles
        List<DetallePedidoResponseDTO> detallesDto = pedido.getDetalles().stream()
                .map(PedidoMapper::detalleToDto) // Llama al método de ayuda para cada detalle
                .collect(Collectors.toList());

        // 3. Construir el DTO principal
        PedidoResponseDTO pedidoDto = new PedidoResponseDTO();
        pedidoDto.setId(pedido.getId());
        pedidoDto.setFechaPedido(pedido.getFechaCreacion()); // Usamos fechaCreacion como fechaPedido
        pedidoDto.setFechaEntrega(pedido.getFechaEntrega());
        pedidoDto.setEstado(pedido.getEstado().name()); // .name() convierte el enum a String
        pedidoDto.setPrecioTotal(pedido.getPrecioTotal());
        pedidoDto.setCliente(clienteDto);

        pedidoDto.setDetalles(detallesDto);

        return pedidoDto;
    }

    /**
     * Método de ayuda para convertir una entidad DetallesPedido a su DTO.
     */
    private static DetallePedidoResponseDTO detalleToDto(DetallesPedido detalle) {
        DetallePedidoResponseDTO detalleDto = new DetallePedidoResponseDTO();
        detalleDto.setIdDetalle(detalle.getId());
        detalleDto.setCodigoLote(detalle.getLoteProduccion().getCodigoLote());
        detalleDto.setTipoProducto(detalle.getLoteProduccion().getTipoProducto().name());
        detalleDto.setCantidad(detalle.getCantidad());
        detalleDto.setPrecioUnitario(detalle.getPrecioUnitario());

        // Calculamos el subtotal
        BigDecimal subtotal = detalle.getPrecioUnitario().multiply(new BigDecimal(detalle.getCantidad()));
        detalleDto.setSubtotal(subtotal);

        return detalleDto;
    }
}