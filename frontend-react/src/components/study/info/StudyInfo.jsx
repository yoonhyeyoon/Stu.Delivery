import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function StudyInfo() {
  const [info, setInfo] = useState();

  useEffect(() => {
    const study_id = 1;
    const fetchStudyInfo = async () => {
      axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}`,
      })
        .then((res) => {
          // console.log(res);
          setInfo(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchStudyInfo();
  }, []);

  return (
    <div>
      {info && (
        <div>
          <h1>스터디 정보</h1>
          <div>
            <h5>스터디 이름</h5>
            <p>{info.name}</p>
          </div>
          <div>
            <h5>카테고리</h5>
          </div>
          <div>
            <h5>스터디 설명</h5>
            <p>{info.introduction}</p>
          </div>
          <div>
            <h5>스터디 회원</h5>
            {info.members.length}/{info.max_user_num}
            <ul>
              {info.members.map((member) => (
                <li key={member.id}>{member.nickname}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default StudyInfo;
