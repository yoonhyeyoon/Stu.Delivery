package com.ssafy.db.repository;

import com.ssafy.db.entity.UserStudy;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStudyRepository extends JpaRepository<UserStudy, Long> {
    Optional<UserStudy> findByUserIdAndStudyId(Long userId, Long studyId);
}
