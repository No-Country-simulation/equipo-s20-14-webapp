package org.project.app.service;

import org.project.app.model.Categoria;
import org.project.app.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import org.project.app.repository.CategoriaRepository;
@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> getCategoriasPredeterminadas() {

        return categoriaRepository.findByUsuarioIsNull();
    }
    public List<Categoria> getCategorias(User usuario) {
        return categoriaRepository.findByUsuarioOrUsuarioIsNull(usuario);
    }

    public Categoria crearCategoriaPersonal(String nombre, User usuario) {
        Categoria categoria = Categoria.builder()
            .nombre(nombre)
            .usuario(usuario)
            .build();
        return categoriaRepository.save(categoria);
    }
}