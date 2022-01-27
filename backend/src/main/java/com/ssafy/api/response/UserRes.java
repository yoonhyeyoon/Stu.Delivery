package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.sql.Time;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID", value = "")
	String user_id;

	@ApiModelProperty(name="Nickname")
	String nickname;

	@ApiModelProperty(name="Profile Image")
	String profile_img;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUser_id(user.getUserId());
		res.setNickname(user.getNickName());
		res.setProfile_img(user.getProfileImg());
		return res;
	}
}
