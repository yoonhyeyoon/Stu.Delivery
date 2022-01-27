package com.ssafy.api.service;

import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.common.exception.handler.BadRequestException;
import com.ssafy.db.entity.Location;
import com.ssafy.db.entity.RegularSchedule;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserStudy;
import com.ssafy.db.repository.RegularScheduleRepository;
import com.ssafy.db.repository.StudyRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserStudyRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javassist.tools.web.BadHttpRequest;
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
            throw new BadRequestException("start_at 혹은 finish_at 데이터 형식이 잘못되었습니다.");
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
                throw new BadRequestException("regularSchedules 입력이 잘못되었습니다.");
            }
            RegularSchedule regularSchedule;
            try {
                regularSchedule = RegularSchedule.parseToRegularSchedule(dayOfWeek, time);
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("day_of_week 입력 형식이 잘못되었습니다.");
            } catch (DateTimeParseException e) {
                throw new BadRequestException("time 입력 형식이 잘못되었습니다.");
            }
            regularSchedule.setStudy(resStudy);
            regularSchedules.add(regularSchedule);
        }

        regularScheduleRepository.saveAll(regularSchedules);

        return resStudy;
    }
}
