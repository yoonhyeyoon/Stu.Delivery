package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyBoardCreatePostRequest")
public class StudyBoardReq {
    @ApiModelProperty(name = "제목", example = "공지사항")
    String title;
    @ApiModelProperty(name = "내용", example = "공지사항 내용입니다")
    String content;
}
