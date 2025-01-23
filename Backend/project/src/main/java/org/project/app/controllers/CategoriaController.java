package org.project.app.controllers;

import org.project.app.dto.CategoriaDTO;
import org.project.app.model.Categoria;
import org.project.app.repository.UserRepository;
import org.project.app.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> getCategorias(Principal principal) {
        return userRepository.findByUsername(principal.getName())
            .map(usuario -> {
                List<CategoriaDTO> categorias = categoriaService.getCategorias(usuario).stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
                return ResponseEntity.ok(categorias);
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping("/personalizada")
    public ResponseEntity<CategoriaDTO> crearCategoriaPersonalizada(@RequestBody CategoriaDTO categoriaDTO, Principal principal) {
        return userRepository.findByUsername(principal.getName())
            .map(usuario -> {
                Categoria categoria = categoriaService.crearCategoriaPersonalizada(categoriaDTO.getNombre(), usuario);
                return ResponseEntity.ok(convertToDTO(categoria));
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    private CategoriaDTO convertToDTO(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        return dto;
    }
}

