package com.ssafy.api.controller;

import com.ssafy.api.request.GoalReq;
import com.ssafy.api.request.UserPasswordUpdateReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.response.GoalRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.api.response.UserProviderRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.response.UserSimpleRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.CustomUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/v1/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping()
    @ApiOperation(value = "회원 정보 가져오기(수정페이지용)", notes = "로그인한 회원의 정보 수정 페이지에 뿌려줄 회원 정보를 가져온다.")
    public ResponseEntity<UserRes> getUserDetail(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        UserRes res = userService.getUserDetail(user);
        return ResponseEntity.ok(res);
    }

    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
        @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo)
        throws Exception {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        User user = userService.createUser(registerInfo);

        if (user != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

        } else {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "email already exist"));
        }

    }

    @PutMapping()
    @ApiOperation(value = "회원정보 수정", notes = "로그인한 회원의 정보를 수정한다.")
    public ResponseEntity<UserRes> updateUser(
        @ApiIgnore Authentication authentication, @RequestBody UserUpdateReq req) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        UserRes res = userService.updateUser(user, req);

        return ResponseEntity.ok(res);
    }

    @DeleteMapping()
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<BaseResponseBody> signOut(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.deleteUser(user);
        return ResponseEntity.ok(BaseResponseBody.of(200, "회원탈퇴 성공!"));
    }

    @GetMapping("/provider")
    @ApiOperation(value = "로그인 제공자 확인", notes = "로그인한 사용자의 계정의 provider를 확인한다.")
    public ResponseEntity<UserProviderRes> getUserProvider(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        UserProviderRes res = userService.getUserProvider(user);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/password-valid")
    @ApiOperation(value = "비밀번호 확인", notes = "해당 비밀번호가 로그인한 사용자의 비밀번호와 일치하는지 확인한다.")
    public ResponseEntity<BaseResponseBody> checkPassword(@ApiIgnore Authentication authentication,
        @RequestBody Map<String, String> req) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Boolean flag = userService.isValidPassword(user, req);
        System.out.println(flag);
        if (flag) {
            return ResponseEntity.ok(BaseResponseBody.of(200, "맞는 비밀번호입니다."));
        } else {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "틀린 비밀번호입니다."));
        }
    }

    @PatchMapping("/password")
    @ApiOperation(value = "비밀번호 변경", notes = "비밀번호를 변경한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> updatePassword(
        @ApiIgnore Authentication authentication,
        @RequestBody @ApiParam(value = "변경할 비밀번호", required = true) UserPasswordUpdateReq userPasswordUpdateReq) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.updatePassword(user, userPasswordUpdateReq);
        return ResponseEntity.ok(BaseResponseBody.of(200, "비밀번호 변경 완료"));
    }

    @GetMapping("/me")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserSimpleRes> getUserInfo(@ApiIgnore Authentication authentication) {
        /*
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        User user = userService.getUserByEmail(email);

        return ResponseEntity.status(200).body(UserSimpleRes.of(user));
    }

    @GetMapping("/email-valid")
    @ApiOperation(value = "이메일 중복 확인", notes = "이미 등록된 이메일인지 확인한다.")
    public ResponseEntity<? extends BaseResponseBody> isValidEmail(
        @RequestParam(value = "email") String email) {
        if (userService.isEmailPresent(email)) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "False"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "True"));
        }
    }

    @ApiOperation(value = "내 스터디 목록 가져오기")
    @GetMapping("/mystudy")
    public ResponseEntity<List<StudyRes>> getMyStudyList(@ApiIgnore Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        List<StudyRes> res = userService.getMyStudyList(email);
        return ResponseEntity.ok(res);
    }

    @ApiOperation(value = "목표 생성하기")
    @PostMapping("/goal")
    public ResponseEntity<GoalRes> createGoal(@ApiIgnore Authentication authentication, @RequestBody GoalReq req) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        GoalRes res = userService.createGoal(user, req);
        return ResponseEntity.ok(res);
    }

    @ApiOperation(value = "단일 목표 가져오기")
    @GetMapping("/goal/{goal_id}")
    public ResponseEntity<GoalRes> getGoal(@ApiIgnore Authentication authentication, @PathVariable Long goal_id) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        GoalRes res = userService.getGoal(user, goal_id);
        return ResponseEntity.ok(res);
    }

    @ApiOperation(value = "목표 리스트 가져오기")
    @GetMapping("/goal")
    public ResponseEntity<List<GoalRes>> getGoalList(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        List<GoalRes> res = userService.getGoalList(user);
        return ResponseEntity.ok(res);
    }

    @ApiOperation(value = "목표 content 수정하기")
    @PutMapping("/goal/{goal_id}")
    public ResponseEntity<GoalRes> updateGoal(
        @ApiIgnore Authentication authentication,
        @PathVariable Long goal_id,
        @RequestBody GoalReq req
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        GoalRes res = userService.updateGoal(user, goal_id, req);
        return ResponseEntity.ok(res);
    }

    @ApiOperation(value = "목표 완료여부 토글")
    @PatchMapping("/goal/{goal_id}/toggle")
    public ResponseEntity<GoalRes> toggleGoalComplete(
        @ApiIgnore Authentication authentication,
        @PathVariable Long goal_id
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        GoalRes res = userService.toggleGoalComplete(user, goal_id);
        return ResponseEntity.ok(res);
    }

    @ApiOperation(value = "목표 삭제하기")
    @DeleteMapping("/goal/{goal_id}")
    public ResponseEntity<BaseResponseBody> deleteGoal(
        @ApiIgnore Authentication authentication,
        @PathVariable Long goal_id
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.deleteGoal(user, goal_id);
        return ResponseEntity.noContent().build();
    }
}
