import MemoList from "../../components/study/lounge/board/MemoList";
import StudyHeader from "../../components/study/lounge/header/StudyHeader";
import ScheduleList from "../../components/study/lounge/Schedule/ScheduleList";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loadStudy } from "../../redux/study";
import Calendar from "../../components/study/lounge/Schedule/Calendar";
import ScheduleFrame from "../../components/study/lounge/Schedule/ScheduleFrame";
import { useParams } from "react-router";

function Lounge() {
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
      <MemoList />
      <ScheduleFrame />
    </>
  );
}
export default Lounge;
