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
	@ApiModelProperty(name="User ID")
	String userId;

	Boolean activated;
	Boolean authStatus;
	String determination;
	String nickName;
	String profileImg;
	Time totalStudy;
	LocalDateTime updatedAt;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		res.setActivated(true);
		res.setAuthStatus(user.getAuthStatus());
		res.setDetermination(user.getDetermination());
		res.setNickName(user.getNickName());
		res.setProfileImg(user.getProfileImg());
		res.setTotalStudy(user.getTotalStudy());
		res.setUpdatedAt(user.getUpdatedAt());

		return res;
	}
}
