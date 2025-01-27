package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.project.app.dto.operacion.OperacionDTO;
import org.project.app.model.Categoria;
import org.project.app.service.OperacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.project.app.repository.*;

@RestController
@RequestMapping("/operaciones")
@Tag(name = "Operaciones", description = "Gestionar todos los End-Points de operaciones.")
public class OperacionController {
    private final UserRepository userRepository;
    private final CategoriaRepository categoriaRepository;
    private final OperacionService operacionService;

    public OperacionController(UserRepository userRepository,
                               CategoriaRepository categoriaRepository,
                               OperacionService operacionService) {
        this.userRepository = userRepository;
        this.categoriaRepository = categoriaRepository;
        this.operacionService = operacionService;
    }

    @Operation(
            summary     = "Obtener las TODAS las operaciones del usuario",
            description = "Devuelve las operaciones creadas por el usuario, " +
                    "Contendrá una lista vacía si no existen las operaciones."
    )
    @GetMapping("/lista/{usuarioId}")
    public ResponseEntity<List<OperacionDTO>> getOperaciones(@PathVariable Long usuarioId) {
        return userRepository.findById(usuarioId).map(usuario -> {
            List<OperacionDTO> operacionesDTO = operacionService.getOperaciones(usuario);
            return ResponseEntity.ok(operacionesDTO);
        }).orElseGet(() -> {
            List<OperacionDTO> emptyList = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList);
        });
    }

//:::::::::::::::::::::::::::::::::::::::::GASTOS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    @Operation(
            summary     = "Obtener TODAS las operaciones de GASTO del usuario",
            description = "Devuelve las operaciones del usuario cuyo tipo es gasto y para todas las categorias, " +
                    "Contendrá una lista vacía si no existen las operaciones."
    )
    @GetMapping("/lista/gastos/{usuarioId}")
    public ResponseEntity<List<OperacionDTO>> getOperacionesDeGasto(@PathVariable Long usuarioId) {
        return userRepository.findById(usuarioId).map(usuario ->{
            List<OperacionDTO> operacionesDTO = operacionService.getOperacionesDeGasto(usuario);
            return ResponseEntity.ok(operacionesDTO);
        }).orElseGet(() -> {
            List<OperacionDTO> emptyList = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList);
        });
    }

    @Operation(
            summary     = "Obtener las operaciones de GASTO del usuario para una CATEGORIA",
            description = "Devuelve todas las operaciones de gasto de un usuario para la categoria solicitada, " +
                    "Contendrá una lista vacía si no existen las operaciones."
    )
    @GetMapping("/lista/gastos/{usuarioId}/categoria/{categoriaId}")
    public ResponseEntity<List<OperacionDTO>> getGastosDeCategoria(@PathVariable Long usuarioId,
                                                                   @PathVariable Long categoriaId) {
        return userRepository.findById(usuarioId).map(usuario ->{
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            List<OperacionDTO> operacionesDTO = operacionService.getGastosDeCategoria(usuario,categoria);
            return ResponseEntity.ok(operacionesDTO);
        }).orElseGet(() -> {
            List<OperacionDTO> emptyList = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList);
        });
    }

    @Operation(
            summary     = "Obtener la suma TOTAL de INGRESOS del usuario",
            description = "Devuelve la suma de cada uno de los montos de ingresos de un usuario, " +
                    "Contendrá 0.0 si no existen las operaciones."
    )
    @GetMapping("/total/gastos/{usuarioId}")
    public ResponseEntity<Double> getTotalGastosDeUsuario(@PathVariable Long usuarioId){
        return userRepository.findById(usuarioId).map(usuario ->
                ResponseEntity.ok(operacionService.getTotalOperacionesDeGasto(usuario))).orElseGet(() ->
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0));
    }

    @Operation(
            summary     = "Obtener la suma del GASTO del usuario para una CATEGORIA",
            description = "Devuelve la suma de cada uno de los montos de gastos de un usuario " +
                    "para la categoria solicitada. Contendrá 0.0 si no existen las operaciones."
    )
    @GetMapping("/total/gastos/categoria/{usuarioId}/{categoriaId}")
    public ResponseEntity<Double> getTotalGastosDeCategoria(@PathVariable Long usuarioId,
                                                            @PathVariable Long categoriaId) {
        return userRepository.findById(usuarioId).map(usuario -> {
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            return ResponseEntity.ok(operacionService.getTotalGastosPorCategoria(usuario,categoria));
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0));
    }

    @Operation(
            summary     = "Efectuar una operacion de GASTO",
            description = "Toma el DTO de Operacion, le extrae el usuario que lo está creando para" +
                    "armar una operacion nueva y persistirla. Retorna un DTO vacío en caso no existir el usuario."
    )
    @PostMapping("/crear/gasto")
    public ResponseEntity<OperacionDTO> efectuarGasto( @RequestBody OperacionDTO operacionDTO) {
        Long usuarioId = operacionDTO.getUsuarioId();
        return userRepository.findById(usuarioId).map(usuario -> {
            Long categoriaId = operacionDTO.getCategoriaId();
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            OperacionDTO gastoEfectuado = operacionService.efectuarGasto(operacionDTO,usuario,categoria);
            return ResponseEntity.ok(gastoEfectuado);
        }).orElseGet( () -> {
            OperacionDTO emptyoperacionDTO = new OperacionDTO();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyoperacionDTO);
        });
    }

    @Operation(
            summary     = "Crear una operacion de GASTO FIJO",
            description = "Toma el DTO de Operacion, le extrae el usuario que lo está creando para" +
                    "armar una operacion nueva y persistirla. Retorna un DTO vacío en caso no existir el usuario."
    )
    @PostMapping("/crear/gastofijo")
    public ResponseEntity<OperacionDTO> crearGastoFijo( @RequestBody OperacionDTO operacionDTO) {
        Long usuarioId = operacionDTO.getUsuarioId();
        return userRepository.findById(usuarioId).map(usuario -> {
            Long categoriaId = operacionDTO.getCategoriaId();
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            OperacionDTO gastoFijo = operacionService.crearGastoFijo(operacionDTO,usuario,categoria);
            return ResponseEntity.ok(gastoFijo);
        }).orElseGet( () -> {
            OperacionDTO emptyoperacionDTO = new OperacionDTO();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyoperacionDTO);
        });
    }

    @Operation(
            summary     = "Cambiar la categoria de un GASTO",
            description = "Toma el id de la Operacion y id de la categoria nueva."
    )
    @PutMapping("/cambiar/categoria/{categoriaId}/operacion/{operacionId}")
    public ResponseEntity<OperacionDTO> cambiarCategoriaOperacion(@PathVariable Long operacionId,
                                                                  @PathVariable Long categoriaId) {
        OperacionDTO operacionActualizada  = operacionService.cambiarCategoriaOperacion(operacionId, categoriaId);
        return ResponseEntity.ok(operacionActualizada);
    }

    @Operation(
            summary     = "Confirmar una operacion de GASTO o INGRESO de tipo fijo",
            description = "Recupera la operación a partir del id, "+
                    "calcula la nueva fechaProgramada, "+
                    "/confirmar/{operacionid}/?fechaEfectuada=2023-04-01" +
                    "registra la fecha pasada por parámetro en fechaEfectuada"
    )

    @PutMapping("/confirmar/{operacionId}")
    public ResponseEntity<OperacionDTO> confirmarOperacion(@PathVariable Long operacionId,
                                                           @RequestParam("fechaEfectuada")
                                                           String fechaEfectuadaString) {
        LocalDate fechaEfectuada = LocalDate.parse(fechaEfectuadaString);
        OperacionDTO operacionConfirmada = operacionService.confirmarOperacion(operacionId, fechaEfectuada);
        return ResponseEntity.ok(operacionConfirmada);
    }


//:::::::::::::::::::::::::::::::::::::::::INGRESOS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    @Operation(
            summary     = "Obtener TODAS las operaciones de INGRESO del usuario",
            description = "Devuelve las operaciones del usuario cuyo tipo es ingreso y para todas las categorias, " +
                    "Contendrá una lista vacía si no existen las operaciones."
    )
    @GetMapping("/lista/ingresos/{usuarioId}")
    public ResponseEntity<List<OperacionDTO>> getOperacionesDeIngreso(@PathVariable Long usuarioId) {
        return userRepository.findById(usuarioId).map(usuario ->{
            List<OperacionDTO> operacionesDTO = operacionService.getOperacionesDeIngreso(usuario);
            return ResponseEntity.ok(operacionesDTO);
        }).orElseGet(() -> {
            List<OperacionDTO> emptyList = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList);
        });
    }
    @Operation(
            summary     = "Obtener la suma TOTAL de INGRESOS del usuario",
            description = "Devuelve la suma de cada uno de los montos de ingresos de un usuario, " +
                    "Contendrá 0.0 si no existen las operaciones."
    )
    @GetMapping("/total/ingresos/{usuarioId}")
    public ResponseEntity<Double> getTotalIngresosDeUsuario(@PathVariable Long usuarioId){
        return userRepository.findById(usuarioId).map(usuario ->
                ResponseEntity.ok(operacionService.getTotalOperacionesDeIngreso(usuario))).orElseGet(() ->
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0));
    }

    @Operation(
            summary     = "Efectuar una operacion de INGRESO",
            description = "Toma el DTO de Operacion, le extrae el usuario que lo está creando para" +
                    "armar una operacion nueva y persistirla. Retorna un DTO vacío en caso no existir el usuario."
    )
    @PostMapping("/ingreso")
    public ResponseEntity<OperacionDTO> efectuarIngreso( @RequestBody OperacionDTO operacionDTO) {
        Long usuarioId = operacionDTO.getUsuarioId();
        return userRepository.findById(usuarioId).map(usuario -> {
            OperacionDTO ingresoEfectuado = operacionService.efectuarIngreso(operacionDTO,usuario);
            return ResponseEntity.ok(ingresoEfectuado);
        }).orElseGet( () -> {
            OperacionDTO emptyoperacionDTO = new OperacionDTO();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyoperacionDTO);
        });
    }

    @Operation(
            summary     = "Crear una operacion de INGRESO FIJO",
            description = "Toma el DTO de Operacion, le extrae el usuario que lo está creando para" +
                    "armar una operacion nueva y persistirla. Retorna un DTO vacío en caso no existir el usuario."
    )
    @PostMapping("/ingresofijo")
    public ResponseEntity<OperacionDTO> crearIngresoFijo( @RequestBody OperacionDTO operacionDTO) {
        Long usuarioId = operacionDTO.getUsuarioId();
        return userRepository.findById(usuarioId).map(usuario -> {
            OperacionDTO ingresoFijo = operacionService.crearIngresoFijo(operacionDTO,usuario);
            return ResponseEntity.ok(ingresoFijo);
        }).orElseGet( () -> {
            OperacionDTO emptyoperacionDTO = new OperacionDTO();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyoperacionDTO);
        });
    }
}

