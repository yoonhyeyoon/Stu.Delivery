package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import java.io.UnsupportedEncodingException;
import javax.mail.MessagingException;

public interface MailService {
    void sendConfirmMail(User user, String authKey)
        throws MessagingException, UnsupportedEncodingException;
    void sendFindPwdMail(User user) throws Exception;
}
