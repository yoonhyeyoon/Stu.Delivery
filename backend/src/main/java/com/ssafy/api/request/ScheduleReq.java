package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ScheduleRequest")
public class ScheduleReq {
    @ApiModelProperty(name = "일정 제목", example = "알고리즘 코드 리뷰")
    String title;

    @ApiModelProperty(name = "일정 내용", example = "알고리즘 문제 풀이에 대한 코드 리뷰시간")
    String content;

    @ApiModelProperty(name = "일정 시간", example = "2022-02-02T20:00")
    String time;

}
