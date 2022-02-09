package com.ssafy.api.controller;

import com.ssafy.api.request.ScheduleReq;
import com.ssafy.api.request.StudyBoardReq;
import com.ssafy.api.request.StudyReq;
import com.ssafy.api.response.ScheduleRes;
import com.ssafy.api.response.StudyBoardRes;
import com.ssafy.api.response.StudyCreateRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.auth.CustomUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "스터디 API", tags = {"Study"})
@RestController
@RequestMapping("/v1/study")
public class StudyController {

    @Autowired
    StudyService studyService;

    @GetMapping
    @ApiOperation(value = "스터디 리스트 가져오기", notes = "스터디 리스트를 가져온다.")
    public ResponseEntity<List<StudyListRes>> getStudyList() {
        List<StudyListRes> res = this.studyService.getStudyList();
        return ResponseEntity.ok(res);
    }

    @PostMapping
    @ApiOperation(value = "스터디 생성하기", notes = "스터디를 생성한다.")
    public ResponseEntity<StudyCreateRes> createStudy(
        @ApiIgnore Authentication authentication, @RequestBody StudyReq studyCreatePostReq
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        StudyCreateRes res = this.studyService.createStudy(user, studyCreatePostReq);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{study_id}")
    @ApiOperation(value = "스터디 수정하기", notes = "스터디 정보를 수정한다.")
    public ResponseEntity<StudyCreateRes> updateStudy(
        @ApiIgnore Authentication authentication, @PathVariable Long study_id, @RequestBody StudyReq studyReq
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        StudyCreateRes res = this.studyService.updateStudy(user, study_id, studyReq);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{study_id}")
    @ApiOperation(value = "스터디 가져오기", notes = "스터디 정보를 가져온다.")
    public ResponseEntity<StudyRes> getStudy(@PathVariable Long study_id) {
        StudyRes res = this.studyService.getStudy(study_id);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/{study_id}")
    @ApiOperation(value = "스터디 가입하기", notes = "로그인한 사용자가 해당 스터디에 가입한다.")
    public ResponseEntity<BaseResponseBody> joinStudy(
        @ApiIgnore Authentication authentication, @PathVariable Long study_id
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        studyService.joinStudy(user, study_id);
        return ResponseEntity.ok(BaseResponseBody.of(200, "스터디 가입에 성공하였습니다."));
    }

    @DeleteMapping("/{study_id}")
    @ApiOperation(value = "스터디 삭제하기", notes = "스터디장이 해당 스터디를 삭제한다.")
    public ResponseEntity<BaseResponseBody> deleteStudy(
        @ApiIgnore Authentication authentication, @PathVariable Long study_id
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        studyService.deleteStudy(user, study_id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{study_id}/members")
    @ApiOperation(value = "스터디 탈퇴하기", notes = "해당 이메일의 스터디원을 탈퇴시킨다.")
    public ResponseEntity<BaseResponseBody> deleteStudyMember(
        @ApiIgnore Authentication authentication, @PathVariable Long study_id, @RequestParam String email
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        studyService.deleteStudyMember(user, study_id, email);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{study_id}/board")
    @ApiOperation(value = "스터디 보드 게시글 생성하기", notes = "스터디 보드 글을 생성한다.")
    public ResponseEntity<StudyBoardRes> createBoard(@ApiIgnore Authentication authentication,
        @PathVariable Long study_id, @RequestBody StudyBoardReq req) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        StudyBoardRes res = studyService.createStudyBoard(user, study_id, req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{study_id}/board")
    @ApiOperation(value = "스터디 보드 리스트 가져오기", notes = "스터디 보드 리스트를 가져온다.")
    public ResponseEntity<List<StudyBoardRes>> listBoard(@PathVariable Long study_id) {
        List<StudyBoardRes> res = studyService.listStudyBoard(study_id);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{study_id}/board/{board_id}")
    @ApiOperation(value = "스터디 보드 가져오기", notes = "해당 스터디 보드 게시글을 가져온다.")
    public ResponseEntity<StudyBoardRes> listBoard(@PathVariable Long study_id,
        @PathVariable Long board_id) {
        StudyBoardRes res = studyService.getStudyBoard(study_id, board_id);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{study_id}/board/{board_id}")
    @ApiOperation(value = "스터디 보드 수정하기", notes = "해당 스터디 보드 게시글을 수정한다.")
    public ResponseEntity<StudyBoardRes> updateBoard(@ApiIgnore Authentication authentication,
        @PathVariable Long study_id, @PathVariable Long board_id,
        @RequestBody StudyBoardReq req) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        StudyBoardRes res = studyService.updateStudyBoard(user, study_id, board_id, req);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{study_id}/board/{board_id}")
    @ApiOperation(value = "스터디 보드 삭제하기", notes = "해당 스터디 보드 게시글을 삭제한다.")
    public ResponseEntity<BaseResponseBody> deleteBoard(@ApiIgnore Authentication authentication,
        @PathVariable Long study_id, @PathVariable Long board_id) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        studyService.deleteStudyBoard(user, study_id, board_id);
        return ResponseEntity.ok(BaseResponseBody.of(200, "스터디 보드 삭제에 성공하였습니다."));
    }

    @PostMapping("/{study_id}/schedule")
    @ApiOperation(value = "스터디 일정 생성하기", notes = "해당 스터디에 일정을 추가한다.")
    public ResponseEntity<ScheduleRes> createSchedule(@ApiIgnore Authentication authentication,
        @PathVariable Long study_id, @RequestBody ScheduleReq req) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        ScheduleRes res = studyService.createSchedule(user, study_id, req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{study_id}/schedule")
    @ApiOperation(value = "스터디 일정 리스트 가져오기", notes = "일정 리스트를 가져온다.")
    public ResponseEntity<List<ScheduleRes>> listSchedule(@PathVariable Long study_id) {
        List<ScheduleRes> res = studyService.listSchedule(study_id);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{study_id}/schedule/{schedule_id}")
    @ApiOperation(value = "스터디 일정 가져오기", notes = "해당 스터디 일정을 가져온다.")
    public ResponseEntity<ScheduleRes> getSchedule(@PathVariable Long study_id, @PathVariable Long schedule_id) {
        ScheduleRes res = studyService.getSchedule(study_id, schedule_id);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{study_id}/schedule/{schedule_id}")
    @ApiOperation(value = "스터디 일정 수정하기", notes = "해당 스터디 일정을 수정한다.")
    public ResponseEntity<ScheduleRes> updateSchedule(@ApiIgnore Authentication authentication,
        @PathVariable Long study_id, @PathVariable Long schedule_id,
        @RequestBody ScheduleReq req) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        ScheduleRes res = studyService.updateSchedule(user, study_id, schedule_id, req);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{study_id}/schedule/{schedule_id}")
    @ApiOperation(value = "스터디 일정 삭제하기", notes = "해당 스터디 일정을 삭제한다.")
    public ResponseEntity<BaseResponseBody> deleteSchedule(@ApiIgnore Authentication authentication,
        @PathVariable Long study_id, @PathVariable Long schedule_id) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        studyService.deleteSchedule(user, study_id, schedule_id);
        return ResponseEntity.ok(BaseResponseBody.of(200, "스터디 일정 삭제에 성공하였습니다."));
    }

}
