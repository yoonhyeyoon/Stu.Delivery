package com.ssafy.db.repository;

import com.ssafy.db.entity.Goal;
import com.ssafy.db.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findAllByUserId(Long userId);
}
