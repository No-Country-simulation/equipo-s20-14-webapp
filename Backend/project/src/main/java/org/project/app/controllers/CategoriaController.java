package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.project.app.dto.categoria.CrearCategoriaDTO;
import org.project.app.dto.categoria.CategoriaDetalleDTO;
import org.project.app.dto.categoria.CategoriaListaDTO;
import org.project.app.model.Categoria;
import org.project.app.repository.CategoriaRepository;
import org.project.app.repository.UserRepository;
import org.project.app.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Categorias", description = "Gestionar todos los End-Points de categorias.")
@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    private final UserRepository userRepository;
    private final CategoriaRepository categoriaRepository;
    private final CategoriaService categoriaService;
    public CategoriaController(UserRepository userRepository,
                               CategoriaRepository categoriaRepository,
                               CategoriaService categoriaService) {
        this.userRepository = userRepository;
        this.categoriaRepository = categoriaRepository;
        this.categoriaService = categoriaService;
    }

    @Operation(
            summary     = "Obtener categorías predeterminadas y las del usuario",
            description = "Devuelve las categorías predeterminadas más las creadas por el usuario, " +
                    "Contendrá solo las predeterminadas si no existen las del usuario."
    )
    @GetMapping("/lista/{usuarioId}")
    public ResponseEntity<List<CategoriaListaDTO>> getCategorias(@PathVariable Long usuarioId) {
        return userRepository.findById(usuarioId).map(usuario -> {
            List<CategoriaListaDTO> categoriasUsuario = categoriaService.getCategorias(usuario);
            return ResponseEntity.ok(categoriasUsuario);
        }).orElseGet(() -> {
            List<CategoriaListaDTO> categoriasPredeterminadas = categoriaService.getCategoriasPredeterminadas();
            return ResponseEntity.ok(categoriasPredeterminadas);
        });
    }

    @Operation(
            summary     = "Obtener el detalle de una categoria",
            description = "Devuelve el detalle:nombre,totalPresupuesto,totalGasto,totalDisponible" +
                           "de la categoria indicada del usuario. Devolverá los campos vacío si no existe."
    )
    @GetMapping("/detalle/{usuarioId}/{categoriaId}")
    public ResponseEntity <CategoriaDetalleDTO> getCategoriaDetalle(@PathVariable Long usuarioId,
                                                                    @PathVariable Long categoriaId) {
        return userRepository.findById(usuarioId).map(usuario -> {
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            CategoriaDetalleDTO detalleCategoria = categoriaService.getCategoriaDetalle(usuario,categoria);
            return ResponseEntity.ok(detalleCategoria);
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
    public ResponseEntity<String> crearCategoriaPersonal(@RequestBody CrearCategoriaDTO crearCategoriaDTO) {
        //Obtiene Id del usuario que la está creando
        Long usuarioId = crearCategoriaDTO.getUsuario_Id();
        return userRepository.findById(usuarioId).map(usuario -> {
            String nombre = crearCategoriaDTO.getNombre();
            Categoria categoria = categoriaService.crearCategoriaPersonal(nombre, usuario);
            return ResponseEntity.ok(crearCategoriaDTO.getNombre());
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(""));
    }

}


