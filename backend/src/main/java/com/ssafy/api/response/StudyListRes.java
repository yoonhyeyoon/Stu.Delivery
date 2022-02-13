package com.ssafy.api.response;

import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyCategory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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

    @ApiModelProperty(name = "스터디 카테고리 리스트", example = "[\n"
        + "        {\n"
        + "            \"id\": 1,\n"
        + "            \"name\": \"react\"\n"
        + "        },\n"
        + "        {\n"
        + "            \"id\": 2,\n"
        + "            \"name\": \"spring\"\n"
        + "        }\n"
        + "    ]")
    List<CategoryRes> categories;

    public static StudyListRes of(Study study) {
        StudyListRes res = new StudyListRes();
        res.setId(study.getId());
        res.setName(study.getName());
        res.setMaster_id(study.getMaster().getId());
        res.setThumbnail_url(study.getThumbnailUrl());
        res.setMax_user_num(study.getMaxUserNum());
        res.setUser_num(study.getStudyMembers().size());
        res.setCategories(study.getStudyCategories().stream().map((StudyCategory sc) -> {
            return CategoryRes.of(sc.getCategory());
        }).collect(Collectors.toList()));
        return res;
    }
}
