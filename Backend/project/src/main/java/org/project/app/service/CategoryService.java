package org.project.app.service;

import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.category.CategoryDto;
import org.project.app.dto.category.RequestCategoryDto;

import java.util.List;

public interface CategoryService {
    ExtendedBaseResponse<CategoryDto> createCategory(RequestCategoryDto requestCategoryDto);

    ExtendedBaseResponse<List<CategoryDto>> getAllCategories();

    BaseResponse deleteCategory(Long id);

}
