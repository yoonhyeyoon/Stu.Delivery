package com.ssafy.db.entity;

import java.sql.Time;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "attendance")
@Getter
@Setter
public class Attendance extends BaseEntity {
    private LocalDateTime date;
    private Time studyTime;

    @ManyToOne
    private User user;
}
