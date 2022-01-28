package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ChangePasswordReq")
public class ChangePasswordReq {

    @ApiModelProperty(name = "현재 비밀번호", example = "test")
    String cur;

    @ApiModelProperty(name = "변경할 비밀번호", example = "change_password")
    String password;
}
