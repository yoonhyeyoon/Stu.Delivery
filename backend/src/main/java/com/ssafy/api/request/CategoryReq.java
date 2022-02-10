package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CategoryRequest")
public class CategoryReq {
    @ApiModelProperty(name = "카테고리 이름", example = "react")
    String name;
}
