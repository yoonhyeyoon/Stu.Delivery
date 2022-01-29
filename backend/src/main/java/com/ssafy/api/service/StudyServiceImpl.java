package com.ssafy.api.service;

import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.common.exception.enums.ExceptionEnum;
import com.ssafy.common.exception.response.ApiException;
import com.ssafy.db.entity.Location;
import com.ssafy.db.entity.RegularSchedule;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserStudy;
import com.ssafy.db.repository.RegularScheduleRepository;
import com.ssafy.db.repository.StudyRepository;
import com.ssafy.db.repository.UserStudyRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("studyService")
public class StudyServiceImpl implements StudyService {
    @Autowired
    StudyRepository studyRepository;

    @Autowired
    UserStudyRepository userStudyRepository;

    @Autowired
    RegularScheduleRepository regularScheduleRepository;

    @Override
    public List<Study> getStudyList() {
        return studyRepository.findAll();
    }

    @Override
    @Transactional
    public Study createStudy(User master, StudyCreatePostReq req) {
        // 스터디 생성
        Study study = new Study();
        study.setMaster(master);
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
        } catch(DateTimeParseException e) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_DATE);
        }
        Study resStudy = studyRepository.save(study);

        // 스터디장 스터디 가입
        UserStudy userStudy = new UserStudy();
        userStudy.setStudy(study);
        userStudy.setUser(master);
        userStudy.setLocation(Location.offline);
        userStudyRepository.save(userStudy);

        // 정기 일정 추가
        List<Map<String, String>> schList = req.getRegular_schedules();
        List<RegularSchedule> regularSchedules = new ArrayList<>();
        for (Map<String, String> schMap: schList) {
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
            regularSchedule.setStudy(resStudy);
            regularSchedules.add(regularSchedule);
        }

        regularScheduleRepository.saveAll(regularSchedules);

        return resStudy;
    }

    @Override
    public void joinStudy(User user, Long studyId) {
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_STUDY));
        if (userStudyRepository.findByUserIdAndStudyId(user.getId(), study.getId()).isPresent()) {
            throw new ApiException(ExceptionEnum.CONFLICT_USER_STUDY);
        }
        UserStudy userStudy = new UserStudy();
        userStudy.setStudy(study);
        userStudy.setUser(user);
        userStudy.setLocation(Location.offline);
        userStudyRepository.save(userStudy);
    }
}
