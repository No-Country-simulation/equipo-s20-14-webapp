package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.project.app.model.Categoria;
import org.project.app.model.Presupuesto;
import org.project.app.service.PresupuestoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

import java.util.stream.Collectors;
import org.project.app.repository.*;
import org.project.app.dto.presupuesto.PresupuestoDTO;

@Tag(name = "Presupuestos", description = "Gestionar todos los End-Points de presupuestos.")
@RestController
@RequestMapping("presupuestos")
public class PresupuestoController {
    private final CategoriaRepository categoriaRepository;
    private final UserRepository userRepository;
    private final PresupuestoService presupuestoService;
    public PresupuestoController(CategoriaRepository categoriaRepository,
                                 UserRepository userRepository,
                                 PresupuestoService presupuestoService) {
        this.categoriaRepository = categoriaRepository;
        this.userRepository = userRepository;
        this.presupuestoService = presupuestoService;
    }
    @Operation(
            summary     = "Obtener los presupuestos del usuario",
            description = "Devuelve los presupuestos creados por el usuario, " +
                    "Contendrá una lista vacía si no existen los presupuestos."
    )
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PresupuestoDTO>> getPresupuestos(@PathVariable Long usuarioId) {
        return  userRepository.findById(usuarioId).map(usuario -> {
            List<PresupuestoDTO> presupuestosDTO =
                    listarPresupuestoDTO(presupuestoService.getByUsuario(usuario));
            return ResponseEntity.ok(presupuestosDTO);
        }).orElseGet(() -> {
            List<PresupuestoDTO> emptyPresupuestoDTO = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyPresupuestoDTO);
        });
    }
    @Operation(
            summary     = "Obtener los presupuestos del usuario para una CATEGORIA",
            description = "Devuelve las presupuestos del usuario para la categoria solicitada, " +
                    "Contendrá una lista vacía si no existen los presupuestos."
    )
    @GetMapping("/{usuarioId}/{categoriaId}")
    public ResponseEntity<List<PresupuestoDTO>> getPresupuestosPorCategoria(@PathVariable Long usuarioId,
                                                                            @PathVariable Long categoriaId) {
	return userRepository.findById(usuarioId).map(usuario ->{	    
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            List<PresupuestoDTO> presupuestosDTO =
            listarPresupuestoDTO(presupuestoService.getPresupuestosPorCategoria(usuario,categoria));
            return ResponseEntity.ok(presupuestosDTO);
        }).orElseGet(() -> {
            List<PresupuestoDTO> emptyList = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList);    
	});
	}
    @Operation(
            summary     = "Crear una presupuesto de usuario",
            description = "Toma el DTO de Presupuesto, le extrae el usuario que lo está creando para" +
                    "armar un presupuesto nuevo y persistirlo. Retorna un DTO vacío en caso no existir el usuario."
    )
    @PostMapping("/crear")
    public ResponseEntity<PresupuestoDTO> crearPresupuesto(@RequestBody PresupuestoDTO presupuestoDTO) {
        //Obtiene Id del usuario que lo crea
        Long usuarioId = presupuestoDTO.getUsuarioId();
        //Intenta recuperar el User
        return userRepository.findById(usuarioId)
                .map(usuario -> { //Hace para este usuario
                    Long categoriaId = presupuestoDTO.getCategoriaId();
                    //Recuperar la categoria con el id
                    Categoria categoria = categoriaRepository.findById(categoriaId)
                            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
                    Presupuesto presupuesto =
                            presupuestoService.crearPresupuesto(presupuestoDTO,usuario, categoria);
                    return ResponseEntity.ok(armarPresupuestoDTO(presupuesto));
                }).orElseGet( () -> {
                    PresupuestoDTO emptypresupuestoDTO = new PresupuestoDTO();
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptypresupuestoDTO);
                });
    }
    private PresupuestoDTO armarPresupuestoDTO(Presupuesto presupuesto) {
        PresupuestoDTO dto = new PresupuestoDTO();
        dto.setId(presupuesto.getId());
        dto.setFechaInicio(presupuesto.getFechaInicio());
        dto.setDuracion(presupuesto.getDuracion());
        dto.setMonto(presupuesto.getMonto());
        dto.setCategoriaId(presupuesto.getCategoria().getId());
        dto.setUsuarioId(presupuesto.getUsuario().getId());
        return dto;
    }
    private List<PresupuestoDTO> listarPresupuestoDTO(List<Presupuesto> presupuestos){
        return presupuestos.stream().map(this::armarPresupuestoDTO).
                collect(Collectors.toList());
    }

}

