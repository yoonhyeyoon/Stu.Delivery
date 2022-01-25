package com.ssafy.db.entity;

import java.time.DayOfWeek;
import java.time.LocalTime;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class RegularSchedule extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @NotNull
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    private LocalTime time;

    public void setStudy(Study study) {
        this.study = study;

        if (!study.getRegularSchedules().contains(this)) {
            study.getRegularSchedules().add(this);
        }
    }
}
