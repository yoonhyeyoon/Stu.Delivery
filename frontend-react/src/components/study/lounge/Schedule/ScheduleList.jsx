import React, { useEffect, useState, useRef } from "react";
// import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Schedule from "./Schedule.jsx";
import AddSchedule from "./AddSchedule.jsx";
import styles from "./Schedule.module.css";

function ScheduleList() {
  return (
    <div className={styles.frame}>
      {/* <AddSchedule /> */}
      {/* {memos &&
        memos.map((memo) => (
          <Schedule
            key={memo.study_board_id}
            title={memo.title}
            content={memo.content}
            created={memo.created_at}
            user_id={memo.user_id}
            id={memo.study_board_id}
            box={box}
          />
        ))} */}
    </div>
  );
}
export default ScheduleList;
