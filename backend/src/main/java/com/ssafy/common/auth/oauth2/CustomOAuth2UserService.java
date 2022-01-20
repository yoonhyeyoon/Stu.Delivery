package com.ssafy.common.auth.oauth2;

import com.ssafy.common.auth.oauth2.user.OAuth2UserInfo;
import com.ssafy.common.auth.oauth2.user.OAuth2UserInfoFactory;
import com.ssafy.db.entity.AuthProvider;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest)
        throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest,
        OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
            oAuth2UserRequest.getClientRegistration().getRegistrationId(),
            oAuth2User.getAttributes());

        // 소셜 측에서 해당 이메일 없을 때
        if (!StringUtils.hasLength(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("OAuth2 provider 로부터 해당 이메일을 찾지 못했습니다.");
        }

        Optional<User> userOptional = userRepository.findByUserId(oAuth2UserInfo.getEmail());
        User user;

        // DB에 해당 이메일(userId) 있을 때
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // 해당 userId에 대해 현재 로그인한 소셜과 DB에 저장된 소셜이 다를 경우
            if (!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("이미 '" + user.getProvider() + "'로 가입된 이메일입니다. 해당 소셜로 로그인해주세요.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            // DB에 해당 이메일(userId) 없을 때, 소셜에서 받아온 정보로 회원가입
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setNickName(oAuth2UserInfo.getName());
        user.setUserId(oAuth2UserInfo.getEmail());
        user.setProfileImg(oAuth2UserInfo.getImageUrl());
        user.setAuthStatus(true);
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setNickName(oAuth2UserInfo.getName());
        existingUser.setProfileImg(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }
}
