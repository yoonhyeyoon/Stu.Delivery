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
import java.util.Map;
import javassist.tools.web.BadHttpRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyCreatePostRequest")
public class StudyCreatePostReq {

    String name;
    String introduction;
    Boolean is_private;
    String password;
    String thumbnail_url;
    String link_url;
    Integer max_user_num;
    String start_at;
    String finish_at;
    List<Map<String, String>> regular_schedules;

//    public void setStart_at(String start_at) {
//        this.start_at = LocalDate.parse(start_at, DateTimeFormatter.ISO_DATE);
//    }
//
//    public void setFinish_at(String finish_at) {
//        this.finish_at = LocalDate.parse(finish_at, DateTimeFormatter.ISO_DATE);
//    }

}
