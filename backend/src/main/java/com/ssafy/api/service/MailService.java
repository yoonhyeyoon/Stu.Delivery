package com.ssafy.api.service;

import com.ssafy.db.entity.User;

public interface MailService {
    void sendConfirmMail(User user, String authKey) throws Exception;
    void sendFindPwdMail(User user) throws Exception;
}
