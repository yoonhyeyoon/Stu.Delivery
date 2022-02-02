package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo) throws MessagingException, UnsupportedEncodingException, Exception;
	User getUserByEmail(String email);
	Boolean isEmailPresent(String email);
	String updateAuthStatus(String email, String authKey);
	void updateUser(User user);
}
