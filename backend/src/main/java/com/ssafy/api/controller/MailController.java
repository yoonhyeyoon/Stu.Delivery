package com.ssafy.api.controller;

import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.MailService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.AuthKey;
import com.ssafy.common.auth.CustomUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "메일 API", tags = {"Mail."})
@RestController
@RequestMapping("/v1/mail")
public class MailController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserRepositorySupport userRepositorySupport;
    @Autowired
    private MailService mailService;

    // 인증 메일 재전송
    @GetMapping("/send")
    @ApiOperation(value = "인증 메일 전송하기", notes = "jwt 토큰을 통해 이메일로 인증 메일을 전송한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> send(
        @ApiIgnore Authentication authentication) throws Exception {

        // 유저 정보 가져오기
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        // 새 key 생성
        String authKey = new AuthKey().getKey(50);
        user.setAuthKey(authKey);

        // 메일 전송
        mailService.sendConfirmMail(user, authKey);

        // 변경된 key 저장
        userRepository.save(user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 메일 인증
    @GetMapping("/valid")
    @ApiOperation(value = "본인 인증", notes = "메일로 전송된 링크를 통해 본인 인증을 실시한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public String emailConfirm(@RequestParam(value = "email") @ApiParam(value = "아이디") String email,
        @RequestParam(value = "authKey") @ApiParam(value = "인증키") String authKey) throws Exception {
        return userService.updateAuthStatus(email, authKey);
    }

    @PatchMapping("/password")
    @ApiOperation(value = "비밀번호 찾기", notes = "입력한 이메일로 변경된 비밀번호를 전송한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> findPwd(
        @ApiIgnore Authentication authentication) throws Exception {

        // 유저 정보 가져오기
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        mailService.sendFindPwdMail(user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
