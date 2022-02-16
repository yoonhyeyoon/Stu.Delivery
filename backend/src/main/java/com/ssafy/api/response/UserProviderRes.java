package com.ssafy.api.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserProviderResponse")
public class UserProviderRes {
    Boolean is_oauth2_login;
    String provider;

    public static UserProviderRes of(User user) {
        UserProviderRes res = new UserProviderRes();

        String providerName = user.getProvider().name();

        res.setIs_oauth2_login(!"local".equals(providerName));
        res.setProvider(providerName);
        return res;
    }
}
