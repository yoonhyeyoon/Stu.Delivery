package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity(name = "goal")
@Getter
@Setter
public class Goal extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @ColumnDefault("")
    private String content;

    @NotNull
    @ColumnDefault("false")
    private Boolean isCompleted;
}
