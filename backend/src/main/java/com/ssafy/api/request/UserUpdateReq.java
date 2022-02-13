package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdateReq")
public class UserUpdateReq {
    String nick_name;
    String profile_img;
    String birth;
    String determination;
    List<Map<String, String>> categories;
}