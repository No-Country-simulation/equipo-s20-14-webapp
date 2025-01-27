package org.project.app.service;

import jakarta.transaction.Transactional;
import org.project.app.dto.operacion.OperacionDTO;
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
    public List<OperacionDTO> getOperaciones(User usuario)
    {
        return listarOperacionDTO(operacionRepository.findByUsuario(usuario));
    }
    public List<OperacionDTO> getOperacionesDeIngreso(User usuario)
    {
        return listarOperacionDTO(operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.INGRESO));
    }
    public double getTotalOperacionesDeIngreso(User usuario)
    {
        List<Operacion> operaciones = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.INGRESO);
        return this.sumarMontos(operaciones);
    }
    public List<OperacionDTO> getOperacionesDeGasto(User usuario) {
        return listarOperacionDTO(operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.GASTO));
    }
    public double getTotalOperacionesDeGasto(User usuario) {
        List<Operacion> operaciones = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.GASTO);
        return this.sumarMontos(operaciones);
    }

    public List<OperacionDTO> getGastosDeCategoria(User usuario, Categoria categoria) {
        return listarOperacionDTO(operacionRepository.
                findByUsuarioAndTipoAndCategoria(usuario,
                Operacion.TipoOperacion.GASTO, categoria));
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
    public OperacionDTO confirmarOperacion(Long operacionId, LocalDate fechaEfectuada) {
        Operacion operacion = operacionRepository.findById(operacionId)
                .orElseThrow(() -> new RuntimeException("Operación no encontrada"));
        operacion.setEstado(Operacion.Estado.EFECTUADA);
        operacion.setFechaProgramada(operacion.getFechaProgramada().plusDays(operacion.getCicloDias()));
        operacion.setFechaEfectuada(fechaEfectuada);
        operacionRepository.save(operacion);
        return armarOperacionDTO(operacion);
    }
    @Transactional
    public OperacionDTO cambiarCategoriaOperacion(Long operacionId, Long categoriaId) {
        Operacion operacion = operacionRepository.findById(operacionId)
                .orElseThrow(() -> new RuntimeException("Operación no encontrada"));

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        operacion.setCategoria(categoria);
        operacionRepository.save(operacion);
        return armarOperacionDTO(operacion);
    }

    public OperacionDTO efectuarIngreso(OperacionDTO dto,
                                        User usuario) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaEfectuada(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.INGRESO)
                .EsFijo(false)
                .estado(Operacion.Estado.EFECTUADA)
                .usuario(usuario)
                .build();
        operacionRepository.save(operacion);
        return armarOperacionDTO(operacion);
    }
    public OperacionDTO crearIngresoFijo(OperacionDTO dto,
                                      User usuario) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaProgramada(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.INGRESO)
                .EsFijo(true)
                .cicloDias(dto.getCicloDias())
                .estado(Operacion.Estado.PROGRAMADA)
                .usuario(usuario)
                .build();
        operacionRepository.save(operacion);
        return armarOperacionDTO(operacion);
    }
    public OperacionDTO efectuarGasto(OperacionDTO dto,
                                      User usuario,
                                      Categoria categoria) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaEfectuada(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.GASTO)
                .EsFijo(false)
                .estado(Operacion.Estado.EFECTUADA)
                .usuario(usuario)
                .categoria(categoria)
                .build();
        operacionRepository.save(operacion);
        return armarOperacionDTO(operacion);
    }
    public OperacionDTO crearGastoFijo(OperacionDTO dto,
                                       User usuario,
                                       Categoria categoria) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fechaProgramada(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.GASTO)
                .EsFijo(true)
                .cicloDias(dto.getCicloDias())
                .estado(Operacion.Estado.PROGRAMADA)
                .usuario(usuario)
                .categoria(categoria)
                .build();
        operacionRepository.save(operacion);
        return armarOperacionDTO(operacion);
    }
    private OperacionDTO armarOperacionDTO(Operacion operacion) {
        OperacionDTO dto = new OperacionDTO();
        dto.setId(operacion.getId());
        dto.setDescripcion(operacion.getDescripcion());
        dto.setFecha(operacion.getFechaProgramada());
        dto.setMonto(operacion.getMonto());
        dto.setTipo(operacion.getTipo().name());
        dto.setCicloDias(operacion.getCicloDias());
        dto.setEstado(operacion.getEstado().name());
        dto.setCategoriaId(operacion.getCategoria().getId());
        dto.setUsuarioId(operacion.getUsuario().getId());
        return dto;
    }
    private List<OperacionDTO> listarOperacionDTO(List<Operacion> operaciones){
        return operaciones.stream().map(this::armarOperacionDTO).
                collect(Collectors.toList());
    }

}

