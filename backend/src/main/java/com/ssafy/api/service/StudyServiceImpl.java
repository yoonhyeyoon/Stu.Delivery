package com.ssafy.api.service;

import com.ssafy.api.request.StudyCreatePostReq;
import com.ssafy.db.entity.Location;
import com.ssafy.db.entity.RegularSchedule;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserStudy;
import com.ssafy.db.repository.RegularScheduleRepository;
import com.ssafy.db.repository.StudyRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserStudyRepository;
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
    UserRepository userRepository;

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
    public Study createStudy(StudyCreatePostReq req) {
        // 스터디 생성
        Study study = new Study();
        study.setMaster(req.getMaster());
        study.setName(req.getName());
        study.setIntroduction(req.getIntroduction());
        study.setIsPrivate(req.getIs_private());
        study.setPassword(req.getPassword());
        study.setThumbnailUrl(req.getThumbnail_url());
        study.setLinkUrl(req.getLink_url());
        study.setMaxUserNum(req.getMax_user_num());
        study.setStartAt(req.getStart_at());
        study.setFinishAt(req.getFinish_at());
        Study resStudy = studyRepository.save(study);

        // 스터디장 스터디 가입
        UserStudy userStudy = new UserStudy();
        userStudy.setStudy(study);
        userStudy.setUser(req.getMaster());
        userStudy.setLocation(Location.offline);
        userStudyRepository.save(userStudy);

        // 정기 일정 추가
        List<RegularSchedule> regularSchedules = req.getRegular_schedules();
        for (RegularSchedule regularSchedule: regularSchedules) {
            regularSchedule.setStudy(resStudy);
        }
        regularScheduleRepository.saveAll(regularSchedules);

        return resStudy;
    }
}
