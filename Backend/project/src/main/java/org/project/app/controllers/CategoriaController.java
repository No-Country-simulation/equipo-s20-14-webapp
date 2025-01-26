package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.project.app.dto.categoria.CategoriaDTO;
import org.project.app.model.Categoria;
import org.project.app.repository.UserRepository;
import org.project.app.service.CategoriaService;
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
    private final CategoriaService categoriaService;
    public CategoriaController(UserRepository userRepository,
                               CategoriaService categoriaService) {
        this.userRepository = userRepository;
        this.categoriaService = categoriaService;
    }
    @Operation(
            summary     = "Obtener categorías predeterminadas y las del usuario",
            description = "Devuelve las categorías predeterminadas más las creadas por el usuario, " +
                          "Contendrá solo las predeterminadas si no existen las del usuario."
    )
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<CategoriaDTO>> getCategorias(@PathVariable Long usuarioId) {
        return userRepository.findById(usuarioId).map(usuario -> {
            List<CategoriaDTO> categoriasDTO =
                    listarCategoriaDTO(categoriaService.getCategorias(usuario));
            return ResponseEntity.ok(categoriasDTO);
        }).orElseGet(() -> {
            List<CategoriaDTO> categoriasPredeterminadasDTO =
                    listarCategoriaDTO(categoriaService.getCategoriasPredeterminadas());
            return ResponseEntity.ok(categoriasPredeterminadasDTO);
        });
    }
    @Operation(
            summary     = "Crear una categoria personal",
            description = "Toma el DTO de Categoria, le extrae el usuario que la está creando para" +
                          "finalmente persistir el nombre de la nueva categoria junto al usuario."
    )
    @PostMapping("/crear")
    public ResponseEntity<CategoriaDTO> crearCategoriaPersonal(@RequestBody CategoriaDTO categoriaDTO) {
        //Obtiene Id del usuario que la está creando
        Long usuarioId = categoriaDTO.getUsuario_Id();
        return userRepository.findById(usuarioId).map(usuario -> {
            String nombreCategoria = categoriaDTO.getNombre();
            Categoria categoria = categoriaService.crearCategoriaPersonal(nombreCategoria, usuario);
            return ResponseEntity.ok(armarCategoriaDTO(categoria));
        }).orElseGet(() -> {
        CategoriaDTO emptyCategoriaDTO = new CategoriaDTO();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyCategoriaDTO);
        });
    }
    private CategoriaDTO armarCategoriaDTO(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        dto.setUsuario_Id(categoria.getUsuario().getId());
        return dto;
    }
    private List<CategoriaDTO> listarCategoriaDTO(List<Categoria> categorias){
    	return categorias.stream().map(this::armarCategoriaDTO).
                collect(Collectors.toList());
    }
}


