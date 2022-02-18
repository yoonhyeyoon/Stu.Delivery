import StudyInfo from "../../components/study/info/StudyInfo";
import StudyHeader from "../../components/study/lounge/header/StudyHeader";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loadStudy } from "../../redux/study";
import { useParams } from "react-router";

function Info() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchStudyInfo = async () => {
      axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}`,
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
