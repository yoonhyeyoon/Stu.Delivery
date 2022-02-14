package com.ssafy.db.repository;

import static com.ssafy.db.entity.QStudy.study;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QStudy;
import com.ssafy.db.entity.QStudyCategory;
import com.ssafy.db.entity.Study;
import java.util.List;
import java.util.Objects;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class StudyRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public StudyRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        super(Study.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    QStudy study = QStudy.study;
    QStudyCategory studyCategory = QStudyCategory.studyCategory;

    public List<Study> findAllByName(Pageable pageable, String name, List<Long> categories) {
        JPAQuery<Study> query;
        if (categories.size() == 0) {
            query = jpaQueryFactory
                .selectFrom(study)
                .where(study.name.contains(name));
        } else {
            query = jpaQueryFactory
                .selectFrom(study)
                .where(
                    study.name.contains(name),
                    study.id.in(
                        JPAExpressions
                            .select(studyCategory.study.id)
                            .from(studyCategory)
                            .where(studyCategory.category.id.in(categories))
                    )
                );
        }

        List<Study> studyList = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, query)
            .fetch();

        return studyList;
    }

}
