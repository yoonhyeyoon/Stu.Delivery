package com.ssafy.api.response;

import com.ssafy.db.entity.RegularSchedule;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyMember;
import io.swagger.annotations.ApiModel;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyResponse")
public class StudyRes {
    Long id;
    String name;
    String introduction;
    Long master_id;
    Boolean is_private;
    String thumbnail_url;
    String link_url;
    Integer max_user_num;
    String start_at;
    String finish_at;
    List<RegularScheduleListRes> regular_schedules;
    List<UserRes> members;

    public static StudyRes of(Study study) {
        StudyRes res = new StudyRes();
        res.setId(study.getId());
        res.setName(study.getName());
        res.setIntroduction(study.getIntroduction());
        res.setMaster_id(study.getMaster().getId());
        res.setIs_private(study.getIsPrivate());
        res.setThumbnail_url(study.getThumbnailUrl());
        res.setLink_url(study.getLinkUrl());
        res.setMax_user_num(study.getMaxUserNum());
        res.setStart_at(study.getStartAt().toString());
        res.setFinish_at(study.getFinishAt().toString());
        res.setRegular_schedules(study.getRegularSchedules().stream().map((RegularSchedule rs) -> {
            return RegularScheduleListRes.of(rs);
        }).collect(Collectors.toList()));
        res.setMembers(study.getStudyMembers().stream().map((StudyMember sm) -> {
            return UserRes.of(sm.getUser());
        }).collect(Collectors.toList()));
        return res;
    }
}
