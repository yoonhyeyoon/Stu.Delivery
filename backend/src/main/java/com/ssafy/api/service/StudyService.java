package com.ssafy.api.service;

import com.ssafy.api.request.ScheduleReq;
import com.ssafy.api.request.StudyBoardReq;
import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.api.response.ScheduleRes;
import com.ssafy.api.response.StudyBoardRes;
import com.ssafy.api.response.StudyCreateRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.db.entity.User;
import java.util.List;

public interface StudyService {
    // 스터디
    List<StudyListRes> getStudyList();
    StudyCreateRes createStudy(User master, StudyCreatePostReq studyCreatePostReq);
    void joinStudy(User user, Long studyId);
    StudyRes getStudy(Long studyId);

    // 스터디 보드
    StudyBoardRes createStudyBoard(User user, Long studyId, StudyBoardReq req);
    List<StudyBoardRes> listStudyBoard(Long studyId);
    StudyBoardRes getStudyBoard(Long studyId, Long boardId);
    StudyBoardRes updateStudyBoard(User user, Long studyId, Long boardId, StudyBoardReq req);
    void deleteStudyBoard(User user, Long studyId, Long boardId);

    // 스터디 일정
    ScheduleRes createSchedule(User user, Long studyId, ScheduleReq req);
    List<ScheduleRes> listSchedule(Long studyId);
    ScheduleRes getSchedule(Long studyId, Long scheduleId);
    ScheduleRes updateSchedule(User user, Long studyId, Long scheduleId, ScheduleReq req);
    void deleteSchedule(User user, Long studyId, Long scheduleId);

}
