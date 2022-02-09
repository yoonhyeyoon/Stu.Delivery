import StudyInfo from "../../components/study/info/StudyInfo";
import StudyHeader from "../../components/study/lounge/header/StudyHeader";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loadStudy } from "../../redux/study";

function Info() {
  const dispatch = useDispatch();
  const study = useSelector((state) => state.study.study);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const study_id = 1;
    const fetchStudyInfo = async () => {
      axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}`,
      })
        .then((res) => {
          // console.log(res);
          dispatch(loadStudy(res.data));
        })
        .catch((err) => console.log(err));
    };
    fetchStudyInfo();
  }, []);

  return (
    <>
      <StudyHeader />
      <StudyInfo />
    </>
  );
}
export default Info;
