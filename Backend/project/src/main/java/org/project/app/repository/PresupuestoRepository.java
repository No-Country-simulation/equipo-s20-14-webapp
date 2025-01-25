package org.project.app.repository;

import org.project.app.model.Presupuesto;
import org.project.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PresupuestoRepository extends JpaRepository<Presupuesto, Long> {
    List<Presupuesto> findByUsuario(User usuario);
}

