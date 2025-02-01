package org.project.app.service;

import jakarta.transaction.Transactional;
import org.project.app.dto.presupuesto.CrearPresupuestoDTO;
import org.project.app.dto.presupuesto.PresupuestoDTO;
import org.project.app.model.Categoria;
import org.project.app.model.Presupuesto;
import org.project.app.model.User;
import org.project.app.repository.CategoriaRepository;
import org.project.app.repository.PresupuestoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PresupuestoService {

    private final PresupuestoRepository presupuestoRepository;
    private final CategoriaRepository categoriaRepository;
    public PresupuestoService(PresupuestoRepository presupuestoRepository,
                              CategoriaRepository categoriaRepository) {
        this.presupuestoRepository = presupuestoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<PresupuestoDTO> getByUsuario(User usuario) {
        return listarPresupuestoDTO(presupuestoRepository.
        findByUsuario(usuario));
    }
    public List<PresupuestoDTO> getPresupuestosPorCategoria(User usuario, Categoria categoria) {
        return listarPresupuestoDTO(presupuestoRepository.
                findByUsuarioAndCategoria(usuario, categoria));
    }
    public double getTotalPresupuestosPorCategoria(User usuario, Categoria categoria){
        List<Presupuesto> presupuestos = presupuestoRepository.
                findByUsuarioAndCategoria(usuario, categoria);
        return this.sumarMontos(presupuestos);
    }
    private double sumarMontos(List<Presupuesto> presupuestos) {
        return presupuestos.stream()
                          .mapToDouble(Presupuesto::getMonto)
                          .sum();
    }

    @Transactional
    public PresupuestoDTO cambiarCategoriaPresupuesto(Long operacionId, Long categoriaId) {
        Presupuesto presupuesto = presupuestoRepository.findById(operacionId)
                .orElseThrow(() -> new RuntimeException("Operación no encontrada"));
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        presupuesto.setCategoria(categoria);
        presupuestoRepository.save(presupuesto);
        return armarPresupuestoDTO(presupuesto);
    }
    /*public void chequearActualizarVencimiento(Long presupuestoId) {
        Presupuesto presupuesto = presupuestoRepository.findById(presupuestoId)
                .orElseThrow(() -> new RuntimeException("Presupuesto no encontrado"));

        LocalDate fechaVencimiento = presupuesto.getFechaInicio().plusDays(presupuesto.getDuracion());
        LocalDate fechaHoy = LocalDate.now();

        if (presupuesto.getEstado() == Presupuesto.Estado.VIGENTE && fechaHoy.isAfter(fechaVencimiento)) {
            presupuesto.setEstado(Presupuesto.Estado.VENCIDO);
            presupuestoRepository.save(presupuesto);
        }
    }*/
    

    public PresupuestoDTO crearPresupuesto(CrearPresupuestoDTO dto,
                                           User usuario,
                                           Categoria categoria) {
        Presupuesto presupuesto = Presupuesto.builder()//Armar el presupuesto
                //.fechaInicio(dto.getFechaInicio())
                //.duracion(dto.getDuracion())
                .monto(dto.getMonto())
                //.fechaCreacion(LocalDate.now())
                .usuario(usuario)
                .categoria(categoria)
                .build();
        presupuestoRepository.save(presupuesto);
        return armarPresupuestoDTO(presupuesto);
    }

    private PresupuestoDTO armarPresupuestoDTO(Presupuesto presupuesto) {
        PresupuestoDTO dto = new PresupuestoDTO();
        dto.setId(presupuesto.getId());
        /*dto.setFechaInicio(presupuesto.getFechaInicio());
        dto.setDuracion(presupuesto.getDuracion());*/
        dto.setMonto(presupuesto.getMonto());
        dto.setCategoriaId(presupuesto.getCategoria().getId());
        dto.setUsuarioId(presupuesto.getUsuario().getId());
        return dto;
    }

    private List<PresupuestoDTO> listarPresupuestoDTO(List<Presupuesto> presupuestos){
        return presupuestos.stream().map(this::armarPresupuestoDTO).
                collect(Collectors.toList());
    }

}

