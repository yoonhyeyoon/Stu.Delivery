package com.ssafy.api.response;

import com.ssafy.db.entity.Schedule;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ScheduleResponse")
public class ScheduleRes {
    @ApiModelProperty(name = "스터디 ID", example = "1")
    Long study_id;

    @ApiModelProperty(name = "일정 제목", example = "알고리즘 코드 리뷰")
    String title;

    @ApiModelProperty(name = "일정 내용", example = "알고리즘 문제 풀이에 대한 코드 리뷰시간")
    String content;

    @ApiModelProperty(name = "일정 시간", example = "2022-02-02 20:00")
    String time;

    public static ScheduleRes of(Schedule schedule) {
        ScheduleRes res = new ScheduleRes();
        res.setStudy_id(schedule.getStudy().getId());
        res.setTitle(schedule.getTitle());
        res.setContent(schedule.getContent());
        res.setTime(schedule.getTime().toString());
        return res;
    }
}
