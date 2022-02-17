package com.ssafy.api.service;

import com.ssafy.api.request.ScheduleReq;
import com.ssafy.api.request.StudyBoardReq;
import com.ssafy.api.request.StudyPasswordReq;
import com.ssafy.api.request.StudyReq;
import com.ssafy.api.response.ScheduleRes;
import com.ssafy.api.response.StudyBoardRes;
import com.ssafy.api.response.StudyDetailRes;
import com.ssafy.api.response.StudyRes;
import com.ssafy.common.exception.enums.ExceptionEnum;
import com.ssafy.common.exception.response.ApiException;
import com.ssafy.db.entity.Category;
import com.ssafy.db.entity.Location;
import com.ssafy.db.entity.RegularSchedule;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyBoard;
import com.ssafy.db.entity.StudyCategory;
import com.ssafy.db.entity.StudyMember;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RegularScheduleRepository;
import com.ssafy.db.repository.ScheduleRepository;
import com.ssafy.db.repository.StudyBoardRepository;
import com.ssafy.db.repository.StudyCategoryRepository;
import com.ssafy.db.repository.StudyMemberRepository;
import com.ssafy.db.repository.StudyRepository;
import com.ssafy.db.repository.StudyRepositorySupport;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("studyService")
public class StudyServiceImpl implements StudyService {

    @Autowired
    StudyRepository studyRepository;

    @Autowired
    StudyRepositorySupport studyRepositorySupport;

    @Autowired
    StudyMemberRepository studyMemberRepository;

    @Autowired
    RegularScheduleRepository regularScheduleRepository;

    @Autowired
    StudyBoardRepository studyBoardRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    StudyCategoryRepository studyCategoryRepository;

    @Override
    public List<StudyRes> getStudyList(Pageable pageable, String name, List<Long> categories) {
        List<Study> studyList = studyRepositorySupport.findAllByName(pageable, name, categories);
        List<StudyRes> res = new ArrayList<>();
        for (Study study : studyList) {
            res.add(StudyRes.of(study));
        }
        return res;
    }

    @Override
    @Transactional
    public StudyRes createStudy(User user, StudyReq req) {
        // 스터디 생성
        Study study = new Study();
        study.setMaster(user);
        study.setName(req.getName());
        study.setIntroduction(req.getIntroduction());
        study.setIsPrivate(req.getIs_private());
        study.setPassword(req.getPassword());
        study.setThumbnailUrl(req.getThumbnail_url());
        study.setLinkUrl(req.getLink_url());
        study.setMaxUserNum(req.getMax_user_num());
        // 개인 열람실, 회의실 session ID 생성
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String uniqueId = sdf.format(Calendar.getInstance().getTime()) + "_"
            + RandomStringUtils.randomAlphanumeric(6);
        String privateRoomId = "p_" + uniqueId;
        String meetingRoomId = "m_" + uniqueId;
        study.setPrivateRoomId(privateRoomId);
        study.setMeetingRoomId(meetingRoomId);
        // 날짜 형식 변환 후 저장
        try {
            study.setStartAt(LocalDate.parse(req.getStart_at(), DateTimeFormatter.ISO_DATE));
            study.setFinishAt(LocalDate.parse(req.getFinish_at(), DateTimeFormatter.ISO_DATE));
        } catch (DateTimeParseException e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
        }
        // 스터디 DB에 생성
        Study resStudy = studyRepository.save(study);

        // 스터디장 스터디 가입
        StudyMember studyMember = new StudyMember();
        studyMember.setStudy(resStudy);
        studyMember.setUser(user);
        studyMember.setLocation(Location.offline);
        studyMemberRepository.save(studyMember);

        // 정기 일정 추가
        List<Map<String, String>> schList = req.getRegular_schedules();
        if (schList != null) {
            List<RegularSchedule> regularSchedules = new ArrayList<>();
            for (Map<String, String> schMap : schList) {
                String dayOfWeek = schMap.get("day_of_week");
                String time = schMap.get("time");
                if (dayOfWeek == null || time == null) {
                    throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
                }
                RegularSchedule regularSchedule;
                try {
                    regularSchedule = RegularSchedule.parseToRegularSchedule(dayOfWeek, time);
                } catch (IllegalArgumentException e) {
                    throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
                } catch (DateTimeParseException e) {
                    throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
                }
                regularSchedules.add(regularSchedule);
            }

            List<RegularSchedule> resRegularScheduleList = regularScheduleRepository.saveAll(regularSchedules);
            resStudy.setRegularSchedules(resRegularScheduleList);
        }

        // 카테고리 추가
        if (req.getCategories() == null || req.getCategories().size() == 0) {
            throw new ApiException(ExceptionEnum.BAE_REQUEST_STUDY);
        } else {
            List<StudyCategory> studyCategoryList = new ArrayList<>();
            for (Map<String, String> categoryMap : req.getCategories()) {
                Category category = new Category();
                category.setId(Long.parseLong(categoryMap.get("id")));
                category.setName(categoryMap.get("name"));

                StudyCategory studyCategory = new StudyCategory();
                studyCategory.setStudy(study);
                studyCategory.setCategory(category);

                studyCategoryList.add(studyCategory);
            }

            List<StudyCategory> resStudyCategoryList = studyCategoryRepository.saveAll(studyCategoryList);
            resStudy.setStudyCategories(resStudyCategoryList);
        }

        return StudyRes.of(resStudy);
    }

    @Override
    @Transactional
    public StudyRes updateStudy(User user, Long studyId, StudyReq req) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        if (study.getMaster().getId() != user.getId()) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_STUDY);
        }
        study.setName(req.getName());
        study.setIntroduction(req.getIntroduction());
        study.setIsPrivate(req.getIs_private());
        study.setPassword(req.getPassword());
        study.setThumbnailUrl(req.getThumbnail_url());
        study.setLinkUrl(req.getLink_url());
        study.setMaxUserNum(req.getMax_user_num());
        try {
            study.setStartAt(LocalDate.parse(req.getStart_at(), DateTimeFormatter.ISO_DATE));
            study.setFinishAt(LocalDate.parse(req.getFinish_at(), DateTimeFormatter.ISO_DATE));
        } catch (DateTimeParseException e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
        }
        Study resStudy = studyRepository.save(study);

        // 정기 일정 추가
        List<Map<String, String>> schList = req.getRegular_schedules();
        if (schList != null) {
            List<RegularSchedule> regularSchedules = new ArrayList<>();

            for (Map<String, String> schMap : schList) {
                String dayOfWeek = schMap.get("day_of_week");
                String time = schMap.get("time");
                if (dayOfWeek == null || time == null) {
                    throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
                }
                RegularSchedule regularSchedule;
                try {
                    regularSchedule = RegularSchedule.parseToRegularSchedule(dayOfWeek, time);
                } catch (IllegalArgumentException e) {
                    throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
                } catch (DateTimeParseException e) {
                    throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
                }
                regularSchedules.add(regularSchedule);
            }

            regularScheduleRepository.deleteAllByStudyId(studyId);
            List<RegularSchedule> resRegularScheduleList = regularScheduleRepository.saveAll(regularSchedules);
            resStudy.setRegularSchedules(resRegularScheduleList);
        }

        // 카테고리 추가
        if (req.getCategories() != null) {
            List<StudyCategory> studyCategoryList = new ArrayList<>();
            for (Map<String, String> categoryMap : req.getCategories()) {
                Category category = new Category();
                category.setId(Long.parseLong(categoryMap.get("id")));
                category.setName(categoryMap.get("name"));

                StudyCategory studyCategory = new StudyCategory();
                studyCategory.setStudy(study);
                studyCategory.setCategory(category);

                studyCategoryList.add(studyCategory);
            }

            studyCategoryRepository.deleteAllByStudyId(studyId);
            List<StudyCategory> resStudyCategoryList = studyCategoryRepository.saveAll(studyCategoryList);
            resStudy.setStudyCategories(resStudyCategoryList);
        }

        return StudyRes.of(resStudy);
    }

    @Override
    public StudyDetailRes getStudy(Long studyId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        return StudyDetailRes.of(study);
    }

    @Override
    public void deleteStudy(User user, Long studyId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        if (study.getMaster().getId() != user.getId()) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_STUDY);
        }
        studyRepository.delete(study);
        return;
    }

    @Override
    public Boolean checkPassword(Long studyId, StudyPasswordReq req) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        return study.getPassword().equals(req.getPassword());
    }

    @Override
    public void joinStudy(User user, Long studyId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        if (studyMemberRepository.findByUserIdAndStudyId(user.getId(), study.getId()).isPresent()) {
            throw new ApiException(ExceptionEnum.CONFLICT_STUDY_MEMBER);
        }
        StudyMember studyMember = new StudyMember();
        studyMember.setStudy(study);
        studyMember.setUser(user);
        studyMember.setLocation(Location.offline);
        studyMemberRepository.save(studyMember);
    }

    @Override
    public void updateMaster(User user, Long studyId, String email) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));

        StudyMember studyMember = study.getStudyMembers().stream()
            .filter(member -> member.getUser().getEmail().equals(email))
            .findFirst()
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY_MEMBER));

        if (study.getMaster().getId() != user.getId()) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_STUDY_MEMBER);
        }

        study.setMaster(studyMember.getUser());
        studyRepository.save(study);

        return;
    }

    @Override
    public void deleteStudyMember(User user, Long studyId, String email) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));

        StudyMember studyMember = study.getStudyMembers().stream()
            .filter(member -> member.getUser().getEmail().equals(email))
            .findFirst()
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY_MEMBER));

        if (study.getMaster().getId() == user.getId()) {
            if (study.getMaster().getEmail().equals(email)) {
                // 스터디장이 탈퇴를 할 때
                throw new ApiException(ExceptionEnum.CONFLICT_STUDY_MASTER_DELETE);
            } else {
                // 스터디장이 다른 회원을 탈퇴시킬 때
                studyMemberRepository.delete(studyMember);
            }
        } else if (user.getEmail().equals(email)) {
            // 스터디원이 탈퇴를 할 때
            studyMemberRepository.delete(studyMember);
        } else {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_STUDY_MEMBER);
        }

        return;
    }

    @Override
    public StudyBoardRes createStudyBoard(User user, Long studyId, StudyBoardReq req) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));

        // 스터디보드 5개로 제한
        if (study.getStudyBoards().size() >= 5) {
            throw new ApiException(ExceptionEnum.CONFLICT_STUDY_BOARD);
        }

        // 스터디보드 생성
        StudyBoard studyBoard = new StudyBoard();
        studyBoard.setWriter(user);
        studyBoard.setStudy(study);
        studyBoard.setTitle(req.getTitle());
        studyBoard.setContent(req.getContent());
        StudyBoard resStudyBoard = studyBoardRepository.save(studyBoard);
        return StudyBoardRes.of(resStudyBoard);
    }

    @Override
    public List<StudyBoardRes> listStudyBoard(Long studyId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        List<StudyBoard> boards = study.getStudyBoards();
        List<StudyBoardRes> res = new ArrayList<>();
        for (StudyBoard board : boards) {
            res.add(StudyBoardRes.of(board));
        }
        return res;
    }

    @Override
    public StudyBoardRes getStudyBoard(Long studyId, Long boardId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        StudyBoard studyBoard = studyBoardRepository.findById(boardId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY_BOARD));
        if (study.getId() != studyBoard.getStudy().getId()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_STUDY_BOARD);
        }

        return StudyBoardRes.of(studyBoard);
    }

    @Override
    public StudyBoardRes updateStudyBoard(User user, Long studyId, Long boardId,
        StudyBoardReq req) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        StudyBoard studyBoard = studyBoardRepository.findById(boardId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY_BOARD));
        if (study.getId() != studyBoard.getStudy().getId()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_STUDY_BOARD);
        }
        if (studyBoard.getWriter().getId() != user.getId()) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_STUDY_BOARD);
        }

        studyBoard.setTitle(req.getTitle());
        studyBoard.setContent(req.getContent());
        studyBoardRepository.save(studyBoard);

        return StudyBoardRes.of(studyBoard);
    }

    @Override
    public void deleteStudyBoard(User user, Long studyId, Long boardId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        StudyBoard studyBoard = studyBoardRepository.findById(boardId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY_BOARD));
        if (study.getId() != studyBoard.getStudy().getId()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_STUDY_BOARD);
        }
        if (studyBoard.getWriter().getId() != user.getId()
            && study.getMaster().getId() != user.getId()) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_STUDY_BOARD);
        }

        studyBoardRepository.delete(studyBoard);
        return;
    }

    @Override
    public ScheduleRes createSchedule(User user, Long studyId, ScheduleReq req) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));

        if (!studyMemberRepository.findByUserIdAndStudyId(user.getId(), studyId).isPresent()) {
            throw new ApiException(ExceptionEnum.NOT_FOUND_STUDY_MEMBER);
        }

        Schedule schedule = new Schedule();
        schedule.setStudy(study);
        schedule.setTitle(req.getTitle());
        schedule.setContent(req.getContent());
        try {
            LocalDateTime time = LocalDateTime.parse(req.getTime(),
                DateTimeFormatter.ISO_DATE_TIME);
            schedule.setTime(time);
        } catch (DateTimeParseException e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
        }

        Schedule resSchedule = scheduleRepository.save(schedule);
        return ScheduleRes.of(resSchedule);
    }

    @Override
    public List<ScheduleRes> listSchedule(Long studyId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));

        List<Schedule> schedules = study.getSchedules();
        List<ScheduleRes> res = new ArrayList<>();
        for (Schedule schedule : schedules) {
            res.add(ScheduleRes.of(schedule));
        }
        return res;
    }

    @Override
    public ScheduleRes getSchedule(Long studyId, Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_SCHEDULE));

        if (!studyRepository.findById(studyId).isPresent()) {
            throw new ApiException(ExceptionEnum.NOT_FOUND_STUDY);
        }

        if (schedule.getStudy().getId() != studyId) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_SCHEDULE);
        }

        return ScheduleRes.of(schedule);
    }

    @Override
    public ScheduleRes updateSchedule(User user, Long studyId, Long scheduleId, ScheduleReq req) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        Schedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_SCHEDULE));
        if (study.getId() != schedule.getStudy().getId()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_SCHEDULE);
        }
        if (!studyMemberRepository.findByUserIdAndStudyId(user.getId(), studyId).isPresent()) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_SCHEDULE);
        }

        schedule.setTitle(req.getTitle());
        schedule.setContent(req.getContent());
        try {
            LocalDateTime time = LocalDateTime.parse(req.getTime(),
                DateTimeFormatter.ISO_DATE_TIME);
            schedule.setTime(time);
        } catch (DateTimeParseException e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
        }
        scheduleRepository.save(schedule);

        return ScheduleRes.of(schedule);
    }

    @Override
    public void deleteSchedule(User user, Long studyId, Long scheduleId) {
        Study study = studyRepository.findById(studyId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        Schedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_SCHEDULE));
        if (study.getId() != schedule.getStudy().getId()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_SCHEDULE);
        }
        if (!studyMemberRepository.findByUserIdAndStudyId(user.getId(), studyId).isPresent()) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_SCHEDULE);
        }

        scheduleRepository.delete(schedule);
        return;
    }
}
