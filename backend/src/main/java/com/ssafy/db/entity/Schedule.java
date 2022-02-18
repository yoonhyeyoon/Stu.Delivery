package com.ssafy.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Schedule extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @NotNull
    @Column(length = 100)
    private String title;

    private String content;

    private LocalDateTime time;

}
