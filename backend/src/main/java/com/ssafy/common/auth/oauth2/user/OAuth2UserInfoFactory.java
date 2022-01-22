package com.ssafy.common.auth.oauth2.user;


import com.ssafy.common.auth.oauth2.OAuth2AuthenticationProcessingException;
import com.ssafy.db.entity.AuthProvider;
import java.util.Iterator;
import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.github.toString())) {
            return new GithubOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("죄송합니다. 아직 '" + registrationId + " 로그인'은 지원하지 않습니다.");
        }
    }
}
