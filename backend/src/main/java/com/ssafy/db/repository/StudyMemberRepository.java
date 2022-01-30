package com.ssafy.db.repository;

import com.ssafy.db.entity.StudyMember;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyMemberRepository extends JpaRepository<StudyMember, Long> {
    Optional<StudyMember> findByUserIdAndStudyId(Long userId, Long studyId);
}
