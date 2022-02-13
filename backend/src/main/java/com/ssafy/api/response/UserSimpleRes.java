package com.ssafy.api.response;

import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserSimpleResponse")
public class UserSimpleRes {
	@ApiModelProperty(name = "id", value = "1")
	Long id;

	@ApiModelProperty(name="email", value = "")
	String email;

	@ApiModelProperty(name="Nickname")
	String nickname;

	@ApiModelProperty(name="Profile Image")
	String profile_img;
	
	public static UserSimpleRes of(User user) {
		UserSimpleRes res = new UserSimpleRes();
		res.setId((user.getId()));
		res.setEmail(user.getEmail());
		res.setNickname(user.getNickName());
		res.setProfile_img(user.getProfileImg());
		return res;
	}
}
