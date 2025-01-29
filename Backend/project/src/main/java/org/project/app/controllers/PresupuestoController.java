package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.project.app.dto.presupuesto.CrearPresupuestoDTO;
import org.project.app.model.Categoria;
import org.project.app.service.PresupuestoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
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
    @GetMapping("/lista/{usuarioId}")
    public ResponseEntity<List<PresupuestoDTO>> getPresupuestos(@PathVariable Long usuarioId) {
        return  userRepository.findById(usuarioId).map(usuario -> {
            List<PresupuestoDTO> presupuestosDTO = presupuestoService.getByUsuario(usuario);
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
    @GetMapping("/lista/{usuarioId}/{categoriaId}")
    public ResponseEntity<List<PresupuestoDTO>> getPresupuestosPorCategoria(@PathVariable Long usuarioId,
                                                                            @PathVariable Long categoriaId) {
	return userRepository.findById(usuarioId).map(usuario ->{	    
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            List<PresupuestoDTO> presupuestosDTO = presupuestoService.
                    getPresupuestosPorCategoria(usuario,categoria);
            return ResponseEntity.ok(presupuestosDTO);
        }).orElseGet(() -> {
            List<PresupuestoDTO> emptyList = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList);    
	});
	}
    
    @Operation(
            summary     = "Obtener la suma TOTAL de PRESUPUESTOS del usuario  para una CATEGORIA",
            description = "Devuelve  para la categoria solicitada la suma de cada uno de los montos " +
                    "de los presupuestos de un usuario, Contendrá 0.0 si no existen los presupuestos."
    )
    @GetMapping("/total/{usuarioId}/{categoriaId}")
    public ResponseEntity<Double> getTotalPresupuestosDeCategoria(@PathVariable Long usuarioId,
                                                                  @PathVariable Long categoriaId) {
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        return userRepository.findById(usuarioId).map(usuario ->
        ResponseEntity.ok(presupuestoService.getTotalPresupuestosPorCategoria(usuario,categoria))).orElseGet(() ->
        ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0));
    }

    @Operation(
            summary     = "Crear una presupuesto de usuario",
            description = "Toma el DTO de Presupuesto, le extrae el usuario que lo está creando para" +
                    "armar un presupuesto nuevo y persistirlo. Retorna un DTO vacío en caso no existir el usuario."
    )
    @PostMapping("/crear")
    public ResponseEntity<PresupuestoDTO> crearPresupuesto(@RequestBody CrearPresupuestoDTO crearPresupuestoDTO) {
        Long usuarioId = crearPresupuestoDTO.getUsuarioId();
        return userRepository.findById(usuarioId)
                .map(usuario -> {
                    Long categoriaId = crearPresupuestoDTO.getCategoriaId();
                    Categoria categoria = categoriaRepository.findById(categoriaId)
                            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
                    PresupuestoDTO presupuestoCreado =
                            presupuestoService.crearPresupuesto(crearPresupuestoDTO,usuario, categoria);
                    return ResponseEntity.ok(presupuestoCreado);
                }).orElseGet( () -> {
                    PresupuestoDTO emptypresupuestoDTO = new PresupuestoDTO();
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptypresupuestoDTO);
                });
    }
        
    @Operation(
            summary     = "Cambiar la categoria de un Presupuesto",
            description = "Toma el id del Presupuesto y id de la categoria nueva."
    )

    @PutMapping("/cambiar/categoria/{categoriaId}/presupuesto/{presupuestoId}/")
    public ResponseEntity<PresupuestoDTO> cambiarCategoriaPresupuesto(@PathVariable Long presupuestoId,
                                                                      @PathVariable Long categoriaId) {
    PresupuestoDTO presupuestoActualizado = presupuestoService.
            cambiarCategoriaPresupuesto(presupuestoId, categoriaId);
    return ResponseEntity.ok(presupuestoActualizado);
    }

}

