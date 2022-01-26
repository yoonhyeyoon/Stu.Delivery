package com.ssafy.api.controller;

import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.auth.CustomUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
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
    public ResponseEntity<List<Study>> getStudyList() {
        return ResponseEntity.ok(this.studyService.getStudyList());
    }

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> createStudy(
        @ApiIgnore Authentication authentication, @RequestBody StudyCreatePostReq studyCreatePostReq
    ) {
        CustomUserDetails userDetails = (CustomUserDetails)authentication.getDetails();
        User master = userDetails.getUser();
        Study study = this.studyService.createStudy(master, studyCreatePostReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
