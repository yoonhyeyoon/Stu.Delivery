package com.ssafy.db.repository;

import com.ssafy.db.entity.StudyBoard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyBoardRepository extends JpaRepository<StudyBoard, Long> {
    List<StudyBoard> findAllByStudyId(Long studyId);
}
