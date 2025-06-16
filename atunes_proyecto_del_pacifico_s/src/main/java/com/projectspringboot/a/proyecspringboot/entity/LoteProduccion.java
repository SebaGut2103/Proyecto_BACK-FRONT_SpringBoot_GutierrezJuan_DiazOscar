package com.projectspringboot.a.proyecspringboot.entity;

import com.projectspringboot.a.proyecspringboot.entity.enums.EstadoLote;
import com.projectspringboot.a.proyecspringboot.entity.enums.TipoProducto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "lote_produccion")
@Data
@NoArgsConstructor
public class LoteProduccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_lote", nullable = false, unique = true)
    private String codigoLote;

    @Column(name = "fecha_produccion", nullable = false)
    private LocalDate fechaProduccion;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_producto", nullable = false)
    private TipoProducto tipoProducto;

    @Column(name = "cantidad_producida", nullable = false)
    private Integer cantidadProducida;

    @Column(name = "cantidad_disponible", nullable = false)
    private Integer cantidadDisponible;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoLote estado = EstadoLote.Disponible;

    @Column(name = "fecha_creacion", updatable = false)
    private Instant fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;
}