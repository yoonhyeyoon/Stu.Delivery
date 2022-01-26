package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyCreatePostRequest")
public class StudyCreatePostReq {
    @ApiModelProperty(name = "스터디 이름", example = "알고리즘 스터디")
    String name;
    @ApiModelProperty(name = "스터디 소개글", example = "알고리즘 스터디입니다.")
    String introduction;
    @ApiModelProperty(name = "비공개 여부", example = "true")
    Boolean is_private;
    @ApiModelProperty(name = "비밀번호", example = "123123")
    String password;
    @ApiModelProperty(name = "썸네일 url", example = "/resources/thumbnails/1.png")
    String thumbnail_url;
    @ApiModelProperty(name = "스터디 링크 url", example = "http://test.com/study/urlurl")
    String link_url;
    @ApiModelProperty(name = "최대 인원", example = "8")
    Integer max_user_num;
    @ApiModelProperty(name = "스터디 시작일", example = "2022-01-25")
    String start_at;
    @ApiModelProperty(name = "스터디 종료일", example = "2022-02-25")
    String finish_at;
    @ApiModelProperty(name = "정기 스터디 일정 리스트", example = "[\n"
        + "        {\n"
        + "            \"day_of_week\": \"MONDAY\",\n"
        + "            \"time\": \"18:00\"\n"
        + "        },\n"
        + "        {\n"
        + "            \"day_of_week\": \"TUESDAY\",\n"
        + "            \"time\": \"19:00\"\n"
        + "        }\n"
        + "    ]")
    List<Map<String, String>> regular_schedules;

}
