package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.project.app.dto.categoria.CategoriaDTO;
import org.project.app.dto.categoria.CategoriaDetalleDTO;
import org.project.app.dto.categoria.CategoriaListaDTO;
import org.project.app.model.Categoria;
import org.project.app.model.Operacion;
import org.project.app.model.Presupuesto;
import org.project.app.repository.CategoriaRepository;
import org.project.app.repository.UserRepository;
import org.project.app.service.CategoriaService;
import org.project.app.service.OperacionService;
import org.project.app.service.PresupuestoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
@Tag(name = "Categorias", description = "Gestionar todos los End-Points de categorias.")
@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    private final UserRepository userRepository;
    private final CategoriaRepository categoriaRepository;
    private final CategoriaService categoriaService;
    private final OperacionService operacionService;
    private final PresupuestoService presupuestoService;
    public CategoriaController(UserRepository userRepository,
                               CategoriaRepository categoriaRepository,
                               CategoriaService categoriaService,
                               OperacionService operacionService,
                               PresupuestoService presupuestoService) {
        this.userRepository = userRepository;
        this.categoriaRepository = categoriaRepository;
        this.categoriaService = categoriaService;
        this.operacionService = operacionService;
        this.presupuestoService = presupuestoService;
    }

    @Operation(
            summary     = "Obtener categorías predeterminadas y las del usuario",
            description = "Devuelve las categorías predeterminadas más las creadas por el usuario, " +
                    "Contendrá solo las predeterminadas si no existen las del usuario."
    )
    @GetMapping("/lista/{usuarioId}")
    public ResponseEntity<List<CategoriaListaDTO>> getCategorias(@PathVariable Long usuarioId) {
        return userRepository.findById(usuarioId).map(usuario -> {
            List<CategoriaListaDTO> categoriasDTO =
                    listarCategoriaDTO(categoriaService.getCategorias(usuario));
            return ResponseEntity.ok(categoriasDTO);
        }).orElseGet(() -> {
            List<CategoriaListaDTO> categoriasPredeterminadasDTO =
                    listarCategoriaDTO(categoriaService.getCategoriasPredeterminadas());
            return ResponseEntity.ok(categoriasPredeterminadasDTO);
        });
    }

    @Operation(
            summary     = "Obtener el detalle de una categoria",
            description = "Devuelve el detalle:nombre,totalPresupuesto,totalGasto,Disponible" +
                           "de la categoria indicada del usuario. Devolverá los campos vacío si no existe."
    )
    @GetMapping("/detalle/{usuarioId}/{categoriaId}")
    public ResponseEntity <CategoriaDetalleDTO> getCategoriaDetalle(@PathVariable Long usuarioId,
                                                                    @PathVariable Long categoriaId) {
        return userRepository.findById(usuarioId).map(usuario -> {
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            double totalGasto = operacionService.getTotalGastosPorCategoria(usuario, categoria);
            double totalPresupuesto = presupuestoService.getTotalPresupuestosPorCategoria(usuario, categoria);
            CategoriaDetalleDTO detalleDTO = new CategoriaDetalleDTO(categoria.getNombre(),
                    totalPresupuesto,totalGasto);
            return ResponseEntity.ok(detalleDTO);
        }).orElseGet(() -> {
            CategoriaDetalleDTO emptydetalleDTO = new CategoriaDetalleDTO();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptydetalleDTO);});
    }

    @Operation(
            summary     = "Crear una categoria personal",
            description = "Toma el DTO de Categoria, le extrae el usuario que la está creando para" +
                    "finalmente persistir el nombre de la nueva categoria junto al usuario."
    )
    @PostMapping("/crear")
    public ResponseEntity<String> crearCategoriaPersonal(@RequestBody CategoriaDTO categoriaDTO) {
        //Obtiene Id del usuario que la está creando
        Long usuarioId = categoriaDTO.getUsuario_Id();
        return userRepository.findById(usuarioId).map(usuario -> {
            String nombre = categoriaDTO.getNombre();
            Categoria categoria = categoriaService.crearCategoriaPersonal(nombre, usuario);
            return ResponseEntity.ok(categoria.getNombre());
        }).orElseGet(() -> {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        });
    }
    private CategoriaListaDTO armarCategoriaDTO(Categoria categoria) {
        return new CategoriaListaDTO(categoria.getId(),categoria.getNombre());
    }
    private List<CategoriaListaDTO> listarCategoriaDTO(List<Categoria> categorias){
        return categorias.stream().map(this::armarCategoriaDTO).
                collect(Collectors.toList());
    }
}


