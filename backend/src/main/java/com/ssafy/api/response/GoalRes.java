package com.ssafy.api.response;

import com.ssafy.db.entity.Goal;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GoalResponse")
public class GoalRes {
    Long id;
    Long user_id;
    String content;
    Boolean is_completed;

    public static GoalRes of(Goal goal) {
        GoalRes res = new GoalRes();
        res.setId(goal.getId());
        res.setUser_id(goal.getUser().getId());
        res.setContent(goal.getContent());
        res.setIs_completed(goal.getIsCompleted());

        return res;
    }
}
