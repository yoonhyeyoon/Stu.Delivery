package com.ssafy.db.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저-스터디 중계테이블 모델 정의.
 */
@Entity
@Getter
@Setter
public class StudyMember extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Location location;
}
