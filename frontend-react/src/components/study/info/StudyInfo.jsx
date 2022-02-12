import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Members from "./Members";

function StudyInfo() {
  const study = useSelector((state) => state.study.study);
  // console.log(study.members.length);
  return (
    <div>
      {study ? (
        <div>
          <div>
            <h5>스터디 이름</h5>
            <p>{study.name}</p>
          </div>
          <div>
            <h5>카테고리</h5>
          </div>
          <div>
            <h5>스터디 설명</h5>
            <p>{study.introduction}</p>
          </div>
          <div>
            <h5>
              스터디 회원 ({study.members && study.members.length}/
              {study.max_user_num})
            </h5>
            <Members members={study.members} />
            {/* <ul>
              {study.members.map((member) => (
                <li key={member.id}>{member.nickname}</li>
              ))}
            </ul> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default StudyInfo;
