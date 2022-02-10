package com.ssafy.db.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "study_category")
@Getter
@Setter
public class StudyCategory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

}
