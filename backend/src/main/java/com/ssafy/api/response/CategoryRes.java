package com.ssafy.api.response;

import com.ssafy.db.entity.Category;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CategoryResponse")
public class CategoryRes {
    @ApiModelProperty(name = "카테고리 ID", example = "1")
    Long id;

    @ApiModelProperty(name = "카테고리 이름", example = "react")
    String name;

    public static CategoryRes of(Category category) {
        CategoryRes res = new CategoryRes();
        res.setId(category.getId());
        res.setName(category.getName());
        return res;
    }
}
