package org.project.app.controllers;

import org.project.app.model.Categoria;
import org.project.app.model.Presupuesto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import java.util.stream.Collectors;
import org.project.app.repository.*;
import org.project.app.dto.PresupuestoDTO;

@RestController
@RequestMapping("/api/presupuestos")
public class PresupuestoController {

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<PresupuestoDTO>> getPresupuestos(@RequestParam Long usuarioId) {
        return userRepository.findById(usuarioId)
            .map(usuario -> {
                List<PresupuestoDTO> presupuestos = presupuestoRepository.findByUsuario(usuario).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
                return ResponseEntity.ok(presupuestos);
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping
    public ResponseEntity<PresupuestoDTO> crearPresupuesto(@RequestBody PresupuestoDTO presupuestoDTO) {
        Long usuarioId = presupuestoDTO.getUsuarioId();
        return userRepository.findById(usuarioId)
            .map(usuario -> {
                Long categoriaId = presupuestoDTO.getCategoriaId();
                Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
                Presupuesto presupuesto = Presupuesto.builder()
                    .fechaInicio(presupuestoDTO.getFechaInicio())
                    .duracion(presupuestoDTO.getDuracion())
                    .monto(presupuestoDTO.getMonto())
                    .fechaCreacion(LocalDate.now())
                    .usuario(usuario)
                    .categoria(categoria)
                    .build();
                presupuestoRepository.save(presupuesto);
                return ResponseEntity.ok(convertToDTO(presupuesto));
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    private PresupuestoDTO convertToDTO(Presupuesto presupuesto) {
        PresupuestoDTO dto = new PresupuestoDTO();
        dto.setId(presupuesto.getId());
        dto.setFechaInicio(presupuesto.getFechaInicio());
        dto.setDuracion(presupuesto.getDuracion());
        dto.setMonto(presupuesto.getMonto());
        dto.setCategoriaId(presupuesto.getCategoria().getId());
        dto.setUsuarioId(presupuesto.getUsuario().getId());
        return dto;
    }
}

