package com.ssafy.api.controller;

import com.ssafy.api.service.UserServiceImpl;
import com.ssafy.common.auth.AuthKey;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "메일 API", tags = {"Mail."})
@RestController
@RequestMapping("/api/v1/mail")
public class MailController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    UserRepository userRepository;

    // 인증 메일 재전송

    @GetMapping("/resend")
    public ResponseEntity<? extends BaseResponseBody> resend(@ApiIgnore Authentication authentication) throws Exception {

        // 유저 정보 가져오기
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        // 새 key 생성
        String authKey = new AuthKey().getKey(50);
        user.setAuthKey(authKey);

        // 메일 전송
        userService.sendMail(user, authKey);

        // 변경된 key 저장
        userRepository.save(user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 메일 인증

    @GetMapping("/valid")
    public String emailConfirm(@RequestParam(value = "userId") String userId, @RequestParam(value = "authKey") String authKey) throws Exception {
        return userService.updateAuthStatus(userId, authKey);
    }
}
