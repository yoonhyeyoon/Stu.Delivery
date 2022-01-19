package com.ssafy.api.service;

import com.ssafy.common.auth.AuthKey;
import com.ssafy.common.util.MailUtils;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRepositorySupport userRepositorySupport;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private JavaMailSender mailSender;

	@Override
	@Transactional
	public User createUser(UserRegisterPostReq userRegisterInfo) throws Exception {
		User user = new User();
		user.setUserId(userRegisterInfo.getId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setNickName(userRegisterInfo.getNickname());
		user.setCreatedAt(LocalDateTime.now());

		// authKey 생성
		String authKey = new AuthKey().getKey(50);
		user.setAuthKey(authKey);
		user.setAuthStatus(false);

		sendMail(user, authKey);

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	// authState 변경
	@Override
	public String updateAuthStatus(String userId, String authKey) {
		User user = userRepositorySupport.findUserByUserId(userId).get();

		if (user.getAuthKey().equals(authKey)) {
			user.setAuthStatus(true);
			userRepository.save(user);

			return "SUCCESS";

		} else {
			return "FAILED";
		}
	}

	// 메일 전송
	public void sendMail(User user, String authKey) throws Exception {

		MailUtils sendMail = new MailUtils(mailSender);

		sendMail.setSubject("[Stu.Delivery] 회원가입 이메일 인증");
		sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
			.append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
			.append("<a href='http://localhost:8080/api/v1/mail/valid?userId=")
			.append(user.getUserId())
			.append("&authKey=")
			.append(authKey)
			.append("' target='_blenk'>이메일 인증 확인</a>")
			.toString());

		sendMail.setFrom("dev.js.pekah@gmail.com", "Stu.Delivery");
		sendMail.setTo(user.getUserId());
		sendMail.send();
	}
}
