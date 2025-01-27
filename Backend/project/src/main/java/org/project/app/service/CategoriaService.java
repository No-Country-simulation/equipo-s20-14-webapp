package org.project.app.service;

import org.project.app.dto.categoria.CategoriaDetalleDTO;
import org.project.app.dto.categoria.CategoriaListaDTO;
import org.project.app.service.OperacionService;
import org.project.app.service.PresupuestoService;
import org.project.app.model.Categoria;
import org.project.app.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.project.app.repository.CategoriaRepository;
@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final OperacionService operacionService;
    private final PresupuestoService presupuestoService;
    public CategoriaService(CategoriaRepository categoriaRepository,
                            OperacionService operacionService,
                            PresupuestoService presupuestoService) {
        this.categoriaRepository = categoriaRepository;
        this.operacionService = operacionService;
        this.presupuestoService = presupuestoService;
    }

    public List<CategoriaListaDTO> getCategoriasPredeterminadas() {
        return listarCategoriaDTO(categoriaRepository.
                findByUsuarioIsNull());
    }
    public List<CategoriaListaDTO> getCategorias(User usuario) {
        return listarCategoriaDTO(categoriaRepository.
                findByUsuarioOrUsuarioIsNull(usuario));
    }

    public CategoriaDetalleDTO getCategoriaDetalle(User usuario, Categoria categoria){
        double totalGasto = operacionService.getTotalGastosPorCategoria(usuario, categoria);
        double totalPresupuesto = presupuestoService.getTotalPresupuestosPorCategoria(usuario, categoria);
        return new CategoriaDetalleDTO(categoria.getNombre(),
                totalPresupuesto,totalGasto);
    }
    public Categoria crearCategoriaPersonal(String nombre, User usuario) {
        Categoria categoria = Categoria.builder()
            .nombre(nombre)
            .usuario(usuario)
            .build();
        return categoriaRepository.save(categoria);
    }
    private CategoriaListaDTO armarCategoriaDTO(Categoria categoria) {
        return new CategoriaListaDTO(categoria.getId(),categoria.getNombre());
    }
    private List<CategoriaListaDTO> listarCategoriaDTO(List<Categoria> categorias){
        return categorias.stream().map(this::armarCategoriaDTO).
                collect(Collectors.toList());
    }
}
