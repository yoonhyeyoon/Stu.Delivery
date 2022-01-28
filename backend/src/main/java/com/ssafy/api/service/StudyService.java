package com.ssafy.api.service;

import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import java.util.List;
import javassist.tools.web.BadHttpRequest;

public interface StudyService {
    List<Study> getStudyList();
    Study createStudy(User master, StudyCreatePostReq studyCreatePostReq);
    void joinStudy(User user, Long studyId);
}
