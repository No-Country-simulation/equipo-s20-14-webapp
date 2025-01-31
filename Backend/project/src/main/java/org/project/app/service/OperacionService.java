package org.project.app.service;

import jakarta.transaction.Transactional;
import org.project.app.dto.operacion.*;
import org.project.app.model.Categoria;
import org.project.app.model.Operacion;
import org.project.app.model.User;
import org.project.app.repository.CategoriaRepository;
import org.project.app.repository.OperacionRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OperacionService {

    private final OperacionRepository operacionRepository;
    private final CategoriaRepository categoriaRepository;


    public OperacionService(OperacionRepository operacionRepository, CategoriaRepository categoriaRepository)
    {
        this.operacionRepository = operacionRepository;
        this.categoriaRepository = categoriaRepository;
    }
    public List<Operacion> getOperaciones(User usuario)
    {
        return operacionRepository.findByUsuario(usuario);
    }
    public List<Operacion> getOperacionesDeIngreso(User usuario)
    {
        return operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.INGRESO);
    }
    public double getTotalOperacionesDeIngreso(User usuario)
    {
        List<Operacion> operaciones = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.INGRESO);
        return this.sumarMontos(operaciones);
    }
    public List<Operacion> getOperacionesDeGasto(User usuario) {
        return operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.GASTO);
    }
    public double getTotalOperacionesDeGasto(User usuario) {
        List<Operacion> operaciones = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.GASTO);
        return this.sumarMontos(operaciones);
    }

    public List<Operacion> getGastosDeCategoria(User usuario, Categoria categoria) {
        return operacionRepository.
                findByUsuarioAndTipoAndCategoria(usuario,
                Operacion.TipoOperacion.GASTO, categoria);
    }

    public double getTotalGastosPorCategoria(User usuario, Categoria categoria) {
        List<Operacion> operaciones = operacionRepository.
                findByUsuarioAndTipoAndCategoria(usuario,
                        Operacion.TipoOperacion.GASTO, categoria);
        return this.sumarMontos(operaciones);
    }
    
    private double sumarMontos(List<Operacion> operaciones) {
        return operaciones.stream()
                          .mapToDouble(Operacion::getMonto)
                          .sum();
    }
    
    public void chequearActualizarVencimiento(Long operacionId) {
        Operacion operacion = operacionRepository.findById(operacionId)
                .orElseThrow(() -> new RuntimeException("Operación no encontrada"));
                
        if (Boolean.TRUE.equals(operacion.getEsFijo())){ 
            LocalDate fechaVencimiento = operacion.getFechaProgramada().plusDays(operacion.getCicloDias());
            LocalDate fechaHoy = LocalDate.now();
            if (fechaHoy.isAfter(fechaVencimiento)) {
                if (operacion.getEstado() != Operacion.Estado.EFECTUADA) {
                    operacion.setEstado(Operacion.Estado.VENCIDA);
                } else {
                      operacion.setEstado(Operacion.Estado.PROGRAMADA);
                }
                operacionRepository.save(operacion);
            }
        }
    }
    @Transactional
    public Operacion confirmarOperacion(Long operacionId, LocalDate fechaEfectuada) {
        Operacion operacion = operacionRepository.findById(operacionId)
                .orElseThrow(() -> new RuntimeException("Operación no encontrada"));
        operacion.setEstado(Operacion.Estado.EFECTUADA);
        operacion.setFechaProgramada(operacion.getFechaProgramada().plusDays(operacion.getCicloDias()));
        operacion.setFechaEfectuada(fechaEfectuada);
        return operacionRepository.save(operacion);
    }
    @Transactional
    public Operacion cambiarCategoriaOperacion(Long operacionId, Long categoriaId) {
        Operacion operacion = operacionRepository.findById(operacionId)
                .orElseThrow(() -> new RuntimeException("Operación no encontrada"));

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        operacion.setCategoria(categoria);
        return operacionRepository.save(operacion);
    }

    public Operacion efectuarIngreso(OperacionIngresoExtraDTO dto,
                                        User usuario) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaEfectuada(dto.getFechaEfectuada())
                .monto(dto.getMonto())
                //Datos predeterminados-------------
                .tipo(Operacion.TipoOperacion.INGRESO)
                .EsFijo(Boolean.FALSE)
                .estado(Operacion.Estado.EFECTUADA)
                //----------------------------------
                .usuario(usuario)
                .build();
        return operacionRepository.save(operacion);
    }
    public Operacion crearIngresoFijo(OperacionIngresoFijoDTO dto,
                                         User usuario) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaProgramada(dto.getFechaProgramada())
                .monto(dto.getMonto())
                //Datos predeterminados-------------
                .tipo(Operacion.TipoOperacion.INGRESO)
                .EsFijo(Boolean.TRUE)
                .estado(Operacion.Estado.PROGRAMADA)
                //----------------------------------
                .cicloDias(dto.getCicloDias())
                .usuario(usuario)
                .build();
        return operacionRepository.save(operacion);
    }
    public Operacion efectuarGasto(OperacionGastoExtraDTO dto,
                                      User usuario,
                                      Categoria categoria) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaEfectuada(dto.getFechaEfectuada())
                .monto(dto.getMonto())
                //Datos predeterminados-------------
                .tipo(Operacion.TipoOperacion.GASTO)
                .EsFijo(Boolean.FALSE)
                .estado(Operacion.Estado.EFECTUADA)
                //----------------------------------
                .usuario(usuario)
                .categoria(categoria)
                .build();
        return operacionRepository.save(operacion);
    }
    public Operacion crearGastoFijo(OperacionGastoFijoDTO dto,
                                       User usuario,
                                       Categoria categoria) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaProgramada(dto.getFechaProgramada())
                .monto(dto.getMonto())
                //Datos predeterminados-------------
                .tipo(Operacion.TipoOperacion.GASTO)
                .EsFijo(Boolean.TRUE)
                .estado(Operacion.Estado.PROGRAMADA)
                //----------------------------------
                .cicloDias(dto.getCicloDias())
                .usuario(usuario)
                .categoria(categoria)
                .build();
       return operacionRepository.save(operacion);
    }
    private OperacionDTO armarOperacionDTO(Operacion operacion) {
        OperacionDTO dto = new OperacionDTO();
        dto.setId(operacion.getId());
        dto.setDescripcion(operacion.getDescripcion());
        if(operacion.getFechaProgramada() != null) {
            dto.setFechaProgramada(operacion.getFechaProgramada());
        }
        dto.setMonto(operacion.getMonto());
        dto.setTipo(operacion.getTipo().name());
        if(operacion.getCicloDias() != null){
            dto.setCicloDias(operacion.getCicloDias());}
        if(operacion.getFechaEfectuada() != null){
            dto.setFechaEfectuada(operacion.getFechaEfectuada());
        }
        dto.setEstado(operacion.getEstado().name());
        if(operacion.getCategoria().getId() != null){
            dto.setCategoriaId(operacion.getCategoria().getId());
        }
        dto.setUsuarioId(operacion.getUsuario().getId());
        return dto;
    }

    private List<OperacionDTO> listarOperacionDTO(List<Operacion> operaciones){
        return operaciones.stream().map(this::armarOperacionDTO).
                collect(Collectors.toList());
    }

}

