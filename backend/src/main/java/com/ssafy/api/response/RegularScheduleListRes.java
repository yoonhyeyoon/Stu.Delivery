package com.ssafy.api.response;

import com.ssafy.db.entity.RegularSchedule;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RegularScheduleListResponse")
public class RegularScheduleListRes {
    private Long id;
    private String dayOfWeek;
    private String time;

    public static RegularScheduleListRes of(RegularSchedule regularSchedule) {
        RegularScheduleListRes res = new RegularScheduleListRes();
        res.setId(regularSchedule.getId());
        res.setDayOfWeek(regularSchedule.getDayOfWeek().toString());
        res.setTime(regularSchedule.getTime().toString());
        return res;
    }
}
