package com.ssafy.db.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * 스터디 모델 정의.
 */
@Entity(name = "study")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Study extends BaseEntity{

    @NotNull
    @OneToOne
    @JoinColumn(name = "master_id")
    private User master;

    @NotNull
    @Column(length = 50)
    private String name;

    @NotNull
    private String introduction;

    @NotNull
    private Boolean isPrivate;

    @Column(length = 50)
    private String password;

    private String thumbnailUrl;

    @Column(length = 100)
    private String linkUrl;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ColumnDefault("8")
    private Integer maxUserNum;

    private String lockerUrl;

    private LocalDate startAt;

    private LocalDate finishAt;

    @Column(length = 50)
    private String privateRoomId;

    @Column(length = 50)
    private String meetingRoomId;

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE)
    private List<RegularSchedule> regularSchedules = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE)
    private List<StudyMember> studyMembers = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE)
    private List<StudyBoard> studyBoards = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE)
    private List<StudyCategory> studyCategories = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE)
    private List<Schedule> schedules = new ArrayList<>();

    public void addStudyMember (StudyMember studyMember) {
        this.studyMembers.add(studyMember);
        if (studyMember.getStudy() != this) {
            studyMember.setStudy(this);
        }
    }

    public void addRegularSchedule (RegularSchedule regularSchedule) {
        this.regularSchedules.add(regularSchedule);
        if (regularSchedule.getStudy() != this) {
            regularSchedule.setStudy(this);
        }
    }
}
