package com.ssafy.api.response;

import com.ssafy.db.entity.StudyCategory;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserCategory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("StudyMemberResponse")
public class StudyMemberRes {
	@ApiModelProperty(name = "id", value = "1")
	Long id;

	@ApiModelProperty(name="email", value = "")
	String email;

	@ApiModelProperty(name="Nickname")
	String nickname;

	@ApiModelProperty(name="Profile Image")
	String profile_img;

	@ApiModelProperty(name = "category")
	List<CategoryRes> category;

	@ApiModelProperty(name = "determination")
	String determination;
	
	public static StudyMemberRes of(User user) {
		StudyMemberRes res = new StudyMemberRes();
		res.setId((user.getId()));
		res.setEmail(user.getEmail());
		res.setNickname(user.getNickName());
		res.setProfile_img(user.getProfileImg());
		res.setCategory(user.getUserCategories().stream().map((UserCategory uc) -> {
			return CategoryRes.of(uc.getCategory());
		}).collect(Collectors.toList()));
		res.setDetermination(user.getDetermination());
		return res;
	}
}
