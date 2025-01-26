package org.project.app.service;

import org.project.app.dto.operacion.OperacionDTO;
import org.project.app.model.Categoria;
import org.project.app.model.Operacion;
import org.project.app.model.User;
import org.project.app.repository.OperacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperacionService {

    private final OperacionRepository operacionRepository;

    public OperacionService(OperacionRepository operacionRepository)
    {
        this.operacionRepository = operacionRepository;
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
    public List<Operacion> getOperacionesDeGasto(User usuario) {
        return operacionRepository.findByUsuarioAndTipo(usuario,
                Operacion.TipoOperacion.GASTO);
    }
    public List<Operacion> getGastosDeCategoria(User usuario, Categoria categoria) {
        return operacionRepository.findByUsuarioAndTipoAndCategoria(usuario,
                Operacion.TipoOperacion.GASTO, categoria);
    }
    
    public Double sumarMontos(List<Operacion> operaciones) {
        return operaciones.stream()
                          .mapToDouble(Operacion::getMonto)
                          .sum();
    }
    
    public Operacion efectuarIngreso(OperacionDTO dto,
                                     User usuario) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fecha(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.INGRESO)
                .EsFijo(false)
                .estado(Operacion.Estado.EFECTUADA)
                .usuario(usuario)
                .build();
        return operacionRepository.save(operacion);
    }
    public Operacion crearIngresoFijo(OperacionDTO dto,
                                      User usuario) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fecha(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.INGRESO)
                .EsFijo(true)
                .cicloDias(dto.getCicloDias())
                .estado(Operacion.Estado.EN_PROCESO)
                .usuario(usuario)
                .build();
        return operacionRepository.save(operacion);
    }
    public Operacion efectuarGasto(OperacionDTO dto,
                                   User usuario,
                                   Categoria categoria) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fecha(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.GASTO)
                .EsFijo(false)
                .estado(Operacion.Estado.EFECTUADA)
                .usuario(usuario)
                .categoria(categoria)
                .build();
        return operacionRepository.save(operacion);
    }
    public Operacion crearGastoFijo(OperacionDTO dto,
                                    User usuario,
                                    Categoria categoria) {
        Operacion operacion = Operacion.builder()//Armar la operacion
                .descripcion(dto.getDescripcion())
                .fecha(dto.getFecha())
                .monto(dto.getMonto())
                .tipo(Operacion.TipoOperacion.GASTO)
                .EsFijo(true)
                .cicloDias(dto.getCicloDias())
                .estado(Operacion.Estado.EN_PROCESO)
                .usuario(usuario)
                .categoria(categoria)
                .build();
        return operacionRepository.save(operacion);
    }

}

