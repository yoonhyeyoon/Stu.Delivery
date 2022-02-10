import MemoList from "../../components/study/lounge/board/MemoList";
import StudyHeader from "../../components/study/lounge/header/StudyHeader";
import ScheduleList from "../../components/study/lounge/Schedule/ScheduleList";
import React from "react";

function Lounge() {
  return (
    <>
      <StudyHeader />
      <MemoList />
      <ScheduleList />
    </>
  );
}
export default Lounge;
