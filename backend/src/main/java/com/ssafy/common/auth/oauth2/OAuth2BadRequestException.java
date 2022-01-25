package com.ssafy.common.auth.oauth2;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class OAuth2BadRequestException extends RuntimeException {
    public OAuth2BadRequestException(String message) {
        super(message);
    }

    public OAuth2BadRequestException(String message, Throwable cause) { super(message, cause); }
}
