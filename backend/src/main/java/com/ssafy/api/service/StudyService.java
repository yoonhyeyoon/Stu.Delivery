package com.ssafy.api.service;

import com.ssafy.api.request.StudyBoardReq;
import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.api.response.StudyBoardRes;
import com.ssafy.api.response.StudyCreateRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.db.entity.User;
import java.util.List;

public interface StudyService {
    List<StudyListRes> getStudyList();
    StudyCreateRes createStudy(User master, StudyCreatePostReq studyCreatePostReq);
    void joinStudy(User user, Long studyId);
    StudyRes getStudy(Long studyId);
    StudyBoardRes createStudyBoard(User user, Long studyId, StudyBoardReq req);
    List<StudyBoardRes> listStudyBoard(Long studyId);
    StudyBoardRes getStudyBoard(Long studyId, Long boardId);
    StudyBoardRes updateStudyBoard(User user, Long studyId, Long boardId, StudyBoardReq req);
    void deleteStudyBoard(User user, Long studyId, Long boardId);
}
