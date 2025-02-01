package org.project.app.service.impl;

import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.category.CategoryDto;
import org.project.app.dto.category.RequestCategoryDto;
import org.project.app.mapper.CategoryMapper;
import org.project.app.model.Category;
import org.project.app.repository.CategoryRepository;
import org.project.app.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    @Override
    @Transactional
    public ExtendedBaseResponse<CategoryDto> createCategory(RequestCategoryDto requestCategoryDto) {
        Category category = Category.builder()
                .name(requestCategoryDto.name())
                .build();
        categoryRepository.save(category);
        CategoryDto categoryDto = categoryMapper.toDto(category);
        return ExtendedBaseResponse.of(BaseResponse.created("Categoria creada exitosamente"), categoryDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<CategoryDto>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtos = categoryMapper.entityListToDtoList(categories);
        return ExtendedBaseResponse.of(BaseResponse.ok("Categorias obtenidas exitosamente"), categoryDtos);
    }

    @Override
    public BaseResponse deleteCategory(Long id) {
        categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
        categoryRepository.deleteById(id);
        return BaseResponse.ok("Categoria eliminada exitosamente");
    }
}
