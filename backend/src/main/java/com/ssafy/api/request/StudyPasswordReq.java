package com.ssafy.api.request;


import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyPasswordRequest")
public class StudyPasswordReq {
    String password;
}
