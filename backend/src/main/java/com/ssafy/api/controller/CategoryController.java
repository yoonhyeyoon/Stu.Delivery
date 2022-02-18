package com.ssafy.api.controller;

import com.ssafy.api.request.CategoryReq;
import com.ssafy.api.response.CategoryRes;
import com.ssafy.api.service.CategoryService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.BaseEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "카테고리 API", tags = {"Category"})
@RestController
@RequestMapping("/v1/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping
    @ApiOperation(value = "카테고리 리스트 가져오기", notes = "카테고리 리스트를 가져온다.")
    public ResponseEntity<List<CategoryRes>> getCategoryList() {
        List<CategoryRes> res = this.categoryService.listCategory();
        return ResponseEntity.ok(res);
    }

    @PostMapping
    @ApiOperation(value = "카테고리 생성하기", notes = "새로운 카테고리를 생성한다.")
    public ResponseEntity<CategoryRes> createCategory(@RequestBody CategoryReq req) {
        CategoryRes res = this.categoryService.createCategory(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{category_id}")
    @ApiOperation(value = "카테고리 가져오기", notes = "해당 카테고리 정보를 가져온다.")
    public ResponseEntity<CategoryRes> getCategory(@PathVariable Long category_id) {
        CategoryRes res = this.categoryService.getCategory(category_id);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{category_id}")
    @ApiOperation(value = "카테고리 수정하기", notes = "기존의 카테고리를 수정한다.")
    public ResponseEntity<CategoryRes> updateCategory(@PathVariable Long category_id,
        @RequestBody CategoryReq req) {
        CategoryRes res = this.categoryService.updateCategory(category_id, req);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{category_id}")
    @ApiOperation(value = "카테고리 삭제하기", notes = "카테고리를 삭제한다.")
    public ResponseEntity deleteCategory(@PathVariable Long category_id) {
        this.categoryService.deleteCategory(category_id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
