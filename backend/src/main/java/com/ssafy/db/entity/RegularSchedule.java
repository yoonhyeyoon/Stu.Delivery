package com.ssafy.db.entity;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.EnumUtils;

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

    public static RegularSchedule parseToRegularSchedule(String dayOfWeekStr, String timeStr) throws DateTimeParseException, IllegalArgumentException {
        DayOfWeek dayOfWeek = DayOfWeek.valueOf(dayOfWeekStr);
        LocalTime time = LocalTime.parse(timeStr, DateTimeFormatter.ISO_TIME);

        RegularSchedule regularSchedule = new RegularSchedule();
        regularSchedule.setDayOfWeek(dayOfWeek);
        regularSchedule.setTime(time);

        return regularSchedule;
    }

    public void setStudy(Study study) {
        this.study = study;

        if (!study.getRegularSchedules().contains(this)) {
            study.getRegularSchedules().add(this);
        }
    }
}
