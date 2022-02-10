package com.ssafy.api.service;

import com.ssafy.api.request.CategoryReq;
import com.ssafy.api.response.CategoryRes;
import java.util.List;

public interface CategoryService {

    List<CategoryRes> listCategory();
    CategoryRes createCategory(CategoryReq req);
    CategoryRes getCategory(Long categoryId);
    CategoryRes updateCategory(Long categoryId, CategoryReq req);
    void deleteCategory(Long categoryId);
}
