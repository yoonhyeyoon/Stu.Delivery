package com.ssafy.api.response;

import com.ssafy.db.entity.Study;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyListResponse")
public class StudyListRes {
    @ApiModelProperty(name = "스터디 ID", example = "4")
    Long id;

    @ApiModelProperty(name = "스터디 이름", example = "알고리즘 스터디!")
    String name;

    @ApiModelProperty(name = "스터디장 id", example = "4")
    Long master_id;

    @ApiModelProperty(name = "썸네일", example = "/resources/thumbnails/1.png")
    String thumbnail_url;

    @ApiModelProperty(name = "스터디 최대 인원", example = "8")
    Integer max_user_num;

    @ApiModelProperty(name = "스터디 현재 인원", example = "3")
    Integer user_num;

    public static StudyListRes of(Study study) {
        StudyListRes res = new StudyListRes();
        res.setId(study.getId());
        res.setName(study.getName());
        res.setMaster_id(study.getMaster().getId());
        res.setThumbnail_url(study.getThumbnailUrl());
        res.setMax_user_num(study.getMaxUserNum());
        res.setUser_num(study.getStudyMembers().size());
        return res;
    }
}
