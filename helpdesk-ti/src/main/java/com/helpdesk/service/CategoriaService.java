package com.helpdesk.service;

import com.helpdesk.dto.CategoriaDTO;
import com.helpdesk.entity.Categoria;
import com.helpdesk.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Categoria obtenerPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));
    }

    public Categoria crear(CategoriaDTO dto) {
        if (categoriaRepository.existsByNombre(dto.getNombre())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una categoría con ese nombre");
        }
        Categoria cat = new Categoria();
        cat.setNombre(dto.getNombre());
        cat.setDescripcion(dto.getDescripcion());
        cat.setRequiereValidacionProveedor(
                dto.getRequiereValidacionProveedor() != null ? dto.getRequiereValidacionProveedor() : false);
        return categoriaRepository.save(cat);
    }

    public Categoria actualizar(Long id, CategoriaDTO dto) {
        Categoria cat = obtenerPorId(id);
        cat.setNombre(dto.getNombre());
        cat.setDescripcion(dto.getDescripcion());
        if (dto.getRequiereValidacionProveedor() != null) {
            cat.setRequiereValidacionProveedor(dto.getRequiereValidacionProveedor());
        }
        return categoriaRepository.save(cat);
    }

    public void eliminar(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        }
        categoriaRepository.deleteById(id);
    }
}
