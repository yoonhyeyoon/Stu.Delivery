package com.ssafy.api.service;

import com.ssafy.api.request.ScheduleReq;
import com.ssafy.api.request.StudyBoardReq;
import com.ssafy.api.request.StudyPasswordReq;
import com.ssafy.api.request.StudyReq;
import com.ssafy.api.response.ScheduleRes;
import com.ssafy.api.response.StudyBoardRes;
import com.ssafy.api.response.StudyListRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.db.entity.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudyService {
    // 스터디
    List<StudyRes> getStudyList(Pageable pageable, String name, List<Long> categories);
    StudyRes createStudy(User user, StudyReq studyReq);
    StudyRes updateStudy(User user, Long studyId, StudyReq studyReq);
    StudyRes getStudy(Long studyId);
    void deleteStudy(User user, Long studyId);
    Boolean checkPassword(Long studyId, StudyPasswordReq req);

    // 스터디 멤버
    void joinStudy(User user, Long studyId);
    void updateMaster(User user, Long studyId, String email);
    void deleteStudyMember(User user, Long studyId, String email);

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
