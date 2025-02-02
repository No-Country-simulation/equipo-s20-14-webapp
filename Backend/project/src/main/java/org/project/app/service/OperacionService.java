package org.project.app.service;

import jakarta.transaction.Transactional;
import org.project.app.dto.operacion.gasto.*;
import org.project.app.dto.operacion.ingreso.*;
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
    public List<DetalleIngresoUsuarioDTO> getOperacionesDeIngreso(User usuario)
    {
        List<Operacion> ingresosDeUsuario = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.INGRESO);
        return(listarDetalleIngresosUsuarioDTO(ingresosDeUsuario));
    }
    public double getTotalOperacionesDeIngreso(User usuario)
    {
        List<Operacion> ingresosDeUsuario = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.INGRESO);
        return this.sumarMontos(ingresosDeUsuario);
    }
    public List<DetalleGastoUsuarioDTO> getOperacionesDeGasto(User usuario) {
        List<Operacion> gastosDeUsuario = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.GASTO);
        return listarDetalleGastosUsuarioDTO(gastosDeUsuario);
    }
    public double getTotalOperacionesDeGasto(User usuario) {
        List<Operacion> operaciones = operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.GASTO);
        return this.sumarMontos(operaciones);
    }

    public List<DetalleGastoCategoriaDTO> getGastosDeCategoria(User usuario, Categoria categoria) {

        List<Operacion> gastosDeCategoria = operacionRepository.
                findByUsuarioAndTipoAndCategoria(usuario,
                Operacion.TipoOperacion.GASTO, categoria);
        return listarDetalleGastosCategoriaDTO(gastosDeCategoria);
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

    public DetalleIngresoExtraDTO efectuarIngreso(OperacionIngresoExtraDTO dto,
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
        Operacion ingresoEfectuado = operacionRepository.save(operacion);
        return new DetalleIngresoExtraDTO(
                ingresoEfectuado.getId(),
                ingresoEfectuado.getFechaEfectuada(),
                ingresoEfectuado.getMonto(),
                ingresoEfectuado.getDescripcion(),
                ingresoEfectuado.getEstado().name());
    }
    public DetalleIngresoFijoDTO crearIngresoFijo(OperacionIngresoFijoDTO dto,
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
        Operacion ingresoProgramado = operacionRepository.save(operacion);
        return new DetalleIngresoFijoDTO(
                ingresoProgramado.getId(),
                ingresoProgramado.getEstado().name(),
                ingresoProgramado.getMonto(),
                ingresoProgramado.getDescripcion(),
                ingresoProgramado.getFechaProgramada(),
                ingresoProgramado.getCicloDias());
    }
    public DetalleGastoExtraDTO efectuarGasto(OperacionGastoExtraDTO dto,
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
        Operacion gastoEfectuado = operacionRepository.save(operacion);
        return new DetalleGastoExtraDTO(
                gastoEfectuado.getId(),
                gastoEfectuado.getFechaEfectuada(),
                gastoEfectuado.getMonto(),
                gastoEfectuado.getDescripcion(),
                gastoEfectuado.getEstado().name(),
                categoria.getId());
    }
    public DetalleGastoFijoDTO crearGastoFijo(OperacionGastoFijoDTO dto,
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
        Operacion gastoProgramado = operacionRepository.save(operacion);
        return new DetalleGastoFijoDTO(gastoProgramado.getId(),
                gastoProgramado.getEstado().name(),
                gastoProgramado.getMonto(),
                gastoProgramado.getDescripcion(),
                gastoProgramado.getFechaProgramada(),
                gastoProgramado.getCicloDias(),
                categoria.getId());
    }
    private DetalleGastoCategoriaDTO armarDetalleGastosCategoriaDTO(Operacion operacion) {
        return new DetalleGastoCategoriaDTO(operacion.getId(),
                operacion.getEsFijo(),
                operacion.getCicloDias(),
                operacion.getMonto(),
                operacion.getDescripcion(),
                operacion.getFechaEfectuada(),
                operacion.getEstado().name(),
                operacion.getFechaProgramada());
    }
    private List<DetalleGastoCategoriaDTO> listarDetalleGastosCategoriaDTO(List<Operacion> operaciones){
        return operaciones.stream().map(this::armarDetalleGastosCategoriaDTO).
                collect(Collectors.toList());
    }
    private DetalleGastoUsuarioDTO armarDetalleGastosUsuarioDTO(Operacion operacion) {
        return new DetalleGastoUsuarioDTO(operacion.getId(),
                operacion.getEsFijo(),
                operacion.getCicloDias(),
                operacion.getMonto(),
                operacion.getDescripcion(),
                operacion.getFechaEfectuada(),
                operacion.getEstado().name(),
                operacion.getFechaProgramada(),
                operacion.getCategoria().getId());
    }
    private List<DetalleGastoUsuarioDTO> listarDetalleGastosUsuarioDTO(List<Operacion> operaciones){
        return operaciones.stream().map(this::armarDetalleGastosUsuarioDTO).
                collect(Collectors.toList());
    }
    private List<DetalleIngresoUsuarioDTO> listarDetalleIngresosUsuarioDTO(List<Operacion> operaciones){
        return operaciones.stream().map(this::armarDetalleIngresosUsuarioDTO).
                collect(Collectors.toList());
    }
    private DetalleIngresoUsuarioDTO armarDetalleIngresosUsuarioDTO(Operacion operacion) {
        return new DetalleIngresoUsuarioDTO(operacion.getId(),
                operacion.getEsFijo(),
                operacion.getCicloDias(),
                operacion.getMonto(),
                operacion.getDescripcion(),
                operacion.getFechaEfectuada(),
                operacion.getEstado().name(),
                operacion.getFechaProgramada());
    }
}

