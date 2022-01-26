package com.ssafy.api.response;

import com.ssafy.db.entity.Study;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyCreateResponse")
public class StudyCreateRes {
    @ApiModelProperty(name = "스터디 ID", example = "4")
    Long id;

    @ApiModelProperty(name = "스터디 링크 url", example = "http://test.com/study/urlurl")
    String link_url;

    public static StudyCreateRes of(Study study) {
        StudyCreateRes res = new StudyCreateRes();
        res.setId(study.getId());
        res.setLink_url(study.getLinkUrl());
        return res;
    }
}
