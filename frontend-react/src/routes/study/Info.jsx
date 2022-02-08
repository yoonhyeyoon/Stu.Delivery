import StudyInfo from "../../components/study/info/StudyInfo";
import StudyHeader from "../../components/study/lounge/header/StudyHeader";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Info() {
  // const [info, setInfo] = useState();

  // useEffect(() => {
  //   const study_id = 1;
  //   const fetchStudyInfo = async () => {
  //     axios({
  //       method: "get",
  //       url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}`,
  //     })
  //       .then((res) => {
  //         // console.log(res);
  //         setInfo(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //     fetchStudyInfo();
  //   };
  // }, []);

  // const memberCheck = (member) => {
  //   return member.id === user.id;
  // };

  // useEffect(() => {
  //   if (info && user && info.members.find(memberCheck)) {
  //     setIsMember(true);
  //   }
  // }, []);

  // console.log(isMember);

  return (
    <>
      <StudyHeader />
      <StudyInfo />
    </>
  );
}
export default Info;
