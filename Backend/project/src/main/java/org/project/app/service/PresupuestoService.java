package org.project.app.service;

import org.project.app.dto.presupuesto.PresupuestoDTO;
import org.project.app.model.Categoria;
import org.project.app.model.Presupuesto;
import org.project.app.model.User;
import org.project.app.repository.PresupuestoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PresupuestoService {

    private final PresupuestoRepository presupuestoRepository;
    public PresupuestoService(PresupuestoRepository presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }

    public List<Presupuesto> getByUsuario(User usuario) {
        return presupuestoRepository.
        findByUsuario(usuario);
    }
    public List<Presupuesto> getPresupuestosPorCategoria(User usuario, Categoria categoria) {
        return presupuestoRepository.
                findByUsuarioAndCategoria(usuario, categoria);
    }

    public Presupuesto crearPresupuesto(PresupuestoDTO dto,
                                        User usuario,
                                        Categoria categoria) {
        Presupuesto presupuesto = Presupuesto.builder()//Armar el presupuesto
                .fechaInicio(dto.getFechaInicio())
                .duracion(dto.getDuracion())
                .monto(dto.getMonto())
                .fechaCreacion(LocalDate.now())
                .usuario(usuario)
                .categoria(categoria)
                .build();
        return presupuestoRepository.save(presupuesto);
    }
}

