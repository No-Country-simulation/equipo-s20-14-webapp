package org.project.app.repository;

import org.project.app.model.Categoria;
import org.project.app.model.Operacion;
import org.project.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperacionRepository extends JpaRepository<Operacion, Long> {
    List<Operacion> findByUsuario(User usuario);
    List<Operacion> findByUsuarioAndTipo(User usuario, Operacion.TipoOperacion tipo);
    List<Operacion> findByUsuarioAndTipoAndCategoria(User usuario, 
    Operacion.TipoOperacion tipo, Categoria categoria);
}

