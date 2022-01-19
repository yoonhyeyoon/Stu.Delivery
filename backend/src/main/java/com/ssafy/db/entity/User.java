package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

/**
 * 유저 모델 정의.
 */
@Entity(name = "user")
@Getter
@Setter
public class User extends BaseEntity{

    @Column(
        name = "user_id",
        nullable = false,
        length = 50
    )
    private String userId;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(
        name = "password",
        nullable = false
    )
    private String password;

    @Column(
        name = "nick_name",
        nullable = false,
        length = 10
    )
    private String nickName;

    @Column(
        name = "profile_img",
        length = 50
    )
    private String profileImg;

    private Date birth;

    private String determination;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Boolean activated;

    private Time totalStudy;

    private String authKey;

    private Boolean authStatus;
}
