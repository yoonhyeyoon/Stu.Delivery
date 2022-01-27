package com.ssafy.api.controller;

import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.api.response.StudyCreateRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.auth.CustomUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.ArrayList;
import java.util.List;
import javassist.tools.web.BadHttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "스터디 API", tags = {"Study"})
@RestController
@RequestMapping("/v1/study")
public class StudyController {

    @Autowired
    StudyService studyService;

    @GetMapping
    @ResponseBody
    @ApiOperation(value = "스터디 리스트 가져오기", notes = "스터디 리스트를 가져온다.")
    public ResponseEntity<List<StudyListRes>> getStudyList() {
        List<Study> studyList = this.studyService.getStudyList();
        List<StudyListRes> res = new ArrayList<>();
        for(Study study: studyList) {
            res.add(StudyListRes.of(study));
        }
        return ResponseEntity.ok(res);
    }

    @PostMapping
    @ApiOperation(value = "스터디 생성하기", notes = "스터디를 생성한다.")
    public ResponseEntity<StudyCreateRes> createStudy(
        @ApiIgnore Authentication authentication, @RequestBody StudyCreatePostReq studyCreatePostReq
    ) {
        CustomUserDetails userDetails = (CustomUserDetails)authentication.getDetails();
        User master = userDetails.getUser();
        Study study = this.studyService.createStudy(master, studyCreatePostReq);
        return ResponseEntity.status(200).body(StudyCreateRes.of(study));
    }
}
