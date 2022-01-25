package com.ssafy.api.service;

import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.db.entity.Study;
import java.util.List;

public interface StudyService {
    List<Study> getStudyList();
    Study createStudy(StudyCreatePostReq studyCreatePostReq);
}
