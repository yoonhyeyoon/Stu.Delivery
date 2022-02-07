package com.ssafy.api.service;

import com.ssafy.api.request.UserPasswordUpdateReq;
import com.ssafy.common.auth.AuthKey;
import com.ssafy.common.exception.enums.ExceptionEnum;
import com.ssafy.common.exception.response.ApiException;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.AuthProvider;
import java.time.LocalDateTime;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.transaction.annotation.Transactional;

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
	MailService mailService;

	@Override
	@Transactional
	public User createUser(UserRegisterPostReq userRegisterInfo) throws Exception {

		if (userRepository.findByEmail(userRegisterInfo.getEmail()).isPresent()) {
			return null;
		}

		User user = new User();
		user.setEmail(userRegisterInfo.getEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setNickName(userRegisterInfo.getNickname());
		user.setCreatedAt(LocalDateTime.now());
		user.setProvider(AuthProvider.local);

		// authKey 생성
		String authKey = new AuthKey().getKey(50);
		user.setAuthKey(authKey);
		user.setAuthStatus(false);

		mailService.sendConfirmMail(user, authKey);

		return userRepository.save(user);
	}

	@Override
	public User getUserByEmail(String email) {
		// 디비에 유저 정보 조회 (email 을 통한 조회).
		User user = userRepositorySupport.findUserByEmail(email).orElseThrow(() -> new ApiException(
			ExceptionEnum.NOT_FOUND_USER));
		return user;
	}

	@Override
	public Boolean isEmailPresent(String email) {
		Boolean flag = userRepositorySupport.findUserByEmail(email).isPresent();
		return flag;
	}

	// authState 변경
	@Override
	public String updateAuthStatus(String email, String authKey) {
		User user = userRepositorySupport.findUserByEmail(email).get();

		if (user.getAuthKey().equals(authKey)) {
			user.setAuthStatus(true);
			userRepository.save(user);

			return "SUCCESS";

		} else {
			return "FAILED";
		}
	}

	@Override
	public void updateUser(User user) {
		userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	@Override
	public Boolean isValidPassword(User user, Map<String, String> req) {
		String password = req.get("password");
		if (password == null) {
			throw new ApiException(ExceptionEnum.RUNTIME_EXCEPTION);
		}
		return passwordEncoder.matches(password, user.getPassword());
	}

	@Override
	public void updatePassword(User user, UserPasswordUpdateReq req) {
		if (!passwordEncoder.matches(req.getCur(), user.getPassword())) {
			throw new ApiException(ExceptionEnum.UNAUTHORIZED_USER_PASSWORD);
		}
		user.setPassword(passwordEncoder.encode(req.getPassword()));
		userRepository.save(user);
		return;
	}

}
