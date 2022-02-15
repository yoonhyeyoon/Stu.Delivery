package com.ssafy.api.service;

import com.ssafy.api.request.GoalReq;
import com.ssafy.api.request.UserPasswordUpdateReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.response.GoalRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.common.auth.AuthKey;
import com.ssafy.common.exception.enums.ExceptionEnum;
import com.ssafy.common.exception.response.ApiException;
import com.ssafy.db.entity.AuthProvider;
import com.ssafy.db.entity.Category;
import com.ssafy.db.entity.Goal;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyMember;
import com.ssafy.db.entity.UserCategory;
import com.ssafy.db.repository.GoalRepository;
import com.ssafy.db.repository.StudyMemberRepository;
import com.ssafy.db.repository.UserCategoryRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.parameters.P;
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
	UserCategoryRepository userCategoryRepository;

	@Autowired
	GoalRepository goalRepository;

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
	public UserRes getUserDetail(User user) {
		return UserRes.of(user);
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
	@Transactional
	public UserRes updateUser(User user, UserUpdateReq req) {
		user.setNickName(req.getNick_name());
		user.setProfileImg(req.getProfile_img());
		if (req.getBirth() != null) {
			try {
				user.setBirth(LocalDate.parse(req.getBirth(), DateTimeFormatter.ISO_DATE));
			} catch(DateTimeParseException e) {
				throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
			}
		}
		user.setDetermination(req.getDetermination());

		User resUser = userRepository.save(user);
		if (req.getCategories() != null) {
			List<UserCategory> userCategoryList = new ArrayList<>();

			for (Map<String, String> categoryMap : req.getCategories()) {
				Category category = new Category();
				category.setId(Long.parseLong(categoryMap.get("id")));
				category.setName(categoryMap.get("name"));

				UserCategory userCategory = new UserCategory();
				userCategory.setUser(resUser);
				userCategory.setCategory(category);

				userCategoryList.add(userCategory);
			}

			userCategoryRepository.deleteAllByUserId(user.getId());
			try {
				List<UserCategory> resUserCategoryList = userCategoryRepository.saveAll(userCategoryList);
				resUser.setUserCategories(resUserCategoryList);
			} catch(DataIntegrityViolationException e) {
				throw new ApiException(ExceptionEnum.NOT_FOUND_CATEGORY);
			}
		}

		return UserRes.of(resUser);
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

	@Override
	public List<StudyRes> getMyStudyList(String email) {
		User user = userRepositorySupport.findUserByEmail(email).get();
		List<StudyMember> myStudyMemberList = user.getStudyMembers();
		List<StudyRes> res = new ArrayList<>();
		for (StudyMember studyMember: myStudyMemberList) {
			res.add(StudyRes.of(studyMember.getStudy()));
		}
		return res;
	}

	@Override
	public GoalRes createGoal(User user, GoalReq req) {
		Goal goal = new Goal();
		goal.setUser(user);
		goal.setContent(req.getContent());
		goal.setIsCompleted(false);
		Goal resGoal = goalRepository.save(goal);

		return GoalRes.of(resGoal);
	}

	@Override
	public List<GoalRes> getGoalList(User user) {
		List<Goal> goalList = goalRepository.findAllByUserId(user.getId());
		List<GoalRes> res = new ArrayList<>();
		for (Goal goal: goalList) {
			res.add(GoalRes.of(goal));
		}
		return res;
	}

	@Override
	public GoalRes getGoal(User user, Long goalId) {
		Goal goal = goalRepository.findById(goalId).orElseThrow(
			() -> new ApiException(ExceptionEnum.NOT_FOUND_GOAL)
		);
		if (goal.getUser().getId() != user.getId()) {
			throw new ApiException(ExceptionEnum.UNAUTHORIZED_GOAL);
		}

		return GoalRes.of(goal);
	}

	@Override
	public GoalRes updateGoal(User user, Long goalId, GoalReq req) {
		Goal goal = goalRepository.findById(goalId).orElseThrow(
			() -> new ApiException(ExceptionEnum.NOT_FOUND_GOAL)
		);
		if (goal.getUser().getId() != user.getId()) {
			throw new ApiException(ExceptionEnum.UNAUTHORIZED_GOAL);
		}

		goal.setContent(req.getContent());
		Goal resGoal = goalRepository.save(goal);
		return GoalRes.of(resGoal);
	}

	@Override
	public GoalRes toggleGoalComplete(User user, Long goalId) {
		Goal goal = goalRepository.findById(goalId).orElseThrow(
			() -> new ApiException(ExceptionEnum.NOT_FOUND_GOAL)
		);
		if (goal.getUser().getId() != user.getId()) {
			throw new ApiException(ExceptionEnum.UNAUTHORIZED_GOAL);
		}

		goal.setIsCompleted(!goal.getIsCompleted());
		Goal resGoal = goalRepository.save(goal);
		return GoalRes.of(resGoal);
	}

	@Override
	public void deleteGoal(User user, Long goalId) {
		Goal goal = goalRepository.findById(goalId).orElseThrow(
			() -> new ApiException(ExceptionEnum.NOT_FOUND_GOAL)
		);
		if (goal.getUser().getId() != user.getId()) {
			throw new ApiException(ExceptionEnum.UNAUTHORIZED_GOAL);
		}

		goalRepository.delete(goal);
		return;
	}

}
