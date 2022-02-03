package com.ssafy.api.controller;

import com.ssafy.api.request.UserPasswordUpdateReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.CustomUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @DeleteMapping()
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<BaseResponseBody> signOut(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.deleteUser(user);
        return ResponseEntity.ok(BaseResponseBody.of(200, "회원탈퇴 성공!"));
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
    public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
        /*
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        User user = userService.getUserByEmail(email);

        return ResponseEntity.status(200).body(UserRes.of(user));
    }

    @GetMapping("/updateUser")
    @ApiOperation(value = "회원정보 수정", notes = "로그인한 회원의 정보를 수정한다.")
    public ResponseEntity<? extends BaseResponseBody> updateUser(
        @RequestBody UserUpdateReq userUpdateReq) {

        userService.updateUser(userUpdateReq.getUser());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @ApiOperation(value = "이메일 중복 확인", notes = "이미 등록된 이메일인지 확인한다.")
    @GetMapping("/email-valid")
    public ResponseEntity<? extends BaseResponseBody> isValidEmail(
        @RequestParam(value = "email") String email) {
        if (userService.isEmailPresent(email)) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "False"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "True"));
        }
    }
}
