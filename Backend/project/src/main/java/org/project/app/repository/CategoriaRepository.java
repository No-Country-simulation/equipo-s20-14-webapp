package org.project.app.repository;
import org.project.app.model.Categoria;
import org.project.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByUsuarioOrUsuarioIsNull(User usuario);
    List<Categoria> findByUsuarioIsNull();
}

