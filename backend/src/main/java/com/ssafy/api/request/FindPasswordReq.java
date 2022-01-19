package com.ssafy.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindPasswordReq {
    @ApiModelProperty(name="유저 ID", example="ssafy@gmail.com")
    String id;
}
