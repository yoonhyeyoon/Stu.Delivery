package com.ssafy.api.service;

import com.ssafy.api.request.CategoryReq;
import com.ssafy.api.response.CategoryRes;
import com.ssafy.common.exception.enums.ExceptionEnum;
import com.ssafy.common.exception.response.ApiException;
import com.ssafy.db.entity.Category;
import com.ssafy.db.repository.CategoryRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryRes> listCategory() {
        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryRes> resList = new ArrayList<>();
        for (Category category : categoryList) {
            resList.add(CategoryRes.of(category));
        }
        return resList;
    }

    @Override
    public CategoryRes createCategory(CategoryReq req) {
        if (categoryRepository.findByName(req.getName()).isPresent()) {
            throw new ApiException(ExceptionEnum.CONFLICT_CATEGORY);
        }
        Category category = new Category();
        category.setName(req.getName());

        Category resCategory = categoryRepository.save(category);
        CategoryRes res = CategoryRes.of(resCategory);
        return res;
    }

    @Override
    public CategoryRes getCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_CATEGORY));
        return CategoryRes.of(category);
    }

    @Override
    public CategoryRes updateCategory(Long categoryId, CategoryReq req) {
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_CATEGORY));
        if (categoryRepository.findByName(req.getName()).isPresent()) {
            throw new ApiException(ExceptionEnum.CONFLICT_CATEGORY);
        }

        category.setName(req.getName());

        Category resCategory = categoryRepository.save(category);
        CategoryRes res = CategoryRes.of(resCategory);
        return res;
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_CATEGORY));

        categoryRepository.delete(category);
        return;
    }
}
