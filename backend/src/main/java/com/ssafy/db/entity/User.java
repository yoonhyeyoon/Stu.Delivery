package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
    private String password;

    @Column(
        name = "nick_name",
        nullable = false,
        length = 30
    )
    private String nickName;

    @Column(
        name = "profile_img"
    )
    private String profileImg;

    private Date birth;

    private String determination;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private Boolean activated;

    private Time totalStudy;

    private String authKey;

    private Boolean authStatus;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Attendance> attendanceList = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Goal> goals = new ArrayList<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;
}
