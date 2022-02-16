package com.ssafy.api.service;

import com.ssafy.api.request.GoalReq;
import com.ssafy.api.request.UserPasswordUpdateReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.response.GoalRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.api.response.UserProviderRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.User;

import java.util.List;
import java.util.Map;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo) throws Exception;
	UserRes getUserDetail(User user);
	User getUserByEmail(String email);
	Boolean isEmailPresent(String email);
	String updateAuthStatus(String email, String authKey);
	UserRes updateUser(User user, UserUpdateReq req);
	void deleteUser(User user);
	Boolean isValidPassword(User user, Map<String, String> req);
	void updatePassword(User user, UserPasswordUpdateReq req);
	UserProviderRes getUserProvider(User user);

	// 내 스터디
	List<StudyRes> getMyStudyList(String email);

	// 목표
	GoalRes createGoal(User user, GoalReq req);
	List<GoalRes> getGoalList(User user);
	GoalRes getGoal(User user, Long goalId);
	GoalRes updateGoal(User user, Long goalId, GoalReq req);
	GoalRes toggleGoalComplete(User user, Long goalId);
	void deleteGoal(User user, Long goalId);
}
