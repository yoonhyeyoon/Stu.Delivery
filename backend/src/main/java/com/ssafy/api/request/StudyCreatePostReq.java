package com.ssafy.api.request;

import com.ssafy.db.entity.RegularSchedule;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javassist.tools.web.BadHttpRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyCreatePostRequest")
public class StudyCreatePostReq {

    User master;
    String name;
    String introduction;
    Boolean is_private;
    String password;
    String thumbnail_url;
    String link_url;
    Integer max_user_num;
    LocalDate start_at;
    LocalDate finish_at;
    List<RegularSchedule> regular_schedules;

    public void setStart_at(String start_at) {
        this.start_at = LocalDate.parse(start_at, DateTimeFormatter.ISO_DATE);
    }

    public void setFinish_at(String finish_at) {
        this.finish_at = LocalDate.parse(finish_at, DateTimeFormatter.ISO_DATE);
    }

    public void setRegular_schedules(List<String> regularSchedules) throws BadHttpRequest {
        List<RegularSchedule> list = new ArrayList<>();
        for (String sch: regularSchedules) {
            String[] arr = sch.split(" ");
            if (arr.length != 2) {
                throw new BadHttpRequest();
            }
            DayOfWeek dayOfWeek = DayOfWeek.valueOf(arr[0]);
            LocalTime time = LocalTime.parse(arr[1], DateTimeFormatter.ISO_TIME);

            RegularSchedule regularSchedule = new RegularSchedule();
            regularSchedule.setDayOfWeek(dayOfWeek);
            regularSchedule.setTime(time);
            list.add(regularSchedule);
        }

        this.regular_schedules = list;
    }
}
