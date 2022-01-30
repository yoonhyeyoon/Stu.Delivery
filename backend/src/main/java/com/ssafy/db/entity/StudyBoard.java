package com.ssafy.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name = "study_board")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class StudyBoard extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne
    @JoinColumn(name = "writer_id")
    private User writer;

    @NotNull
    @Column(length = 100)
    String title;

    @NotNull
    String content;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

}
