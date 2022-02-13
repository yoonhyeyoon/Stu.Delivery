package com.ssafy.db.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Category extends BaseEntity {

    @NotNull
    @Column(length = 20)
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
    private List<StudyCategory> studyCategories = new ArrayList<>();

    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
    private List<UserCategory> userCategories = new ArrayList<>();
}
