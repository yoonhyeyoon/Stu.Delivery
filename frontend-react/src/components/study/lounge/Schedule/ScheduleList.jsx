import React, { useEffect, useState } from "react";
// import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Schedule from "./Schedule.jsx";
import AddSchedule from "./AddSchedule.jsx";
import styles from "./Schedule.module.css";
import DataGridPro from "@mui/x-data-grid-pro";

function ScheduleList() {
  const [schedules, setSchedules] = useState();
  useEffect(() => {
    const study_id = 1;
    const fetchSchedule = async () => {
      await axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/schedule`,
      })
        .then((res) => {
          // console.log(res.data);
          setSchedules(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchSchedule();
  }, []);

  return (
    <div className={styles.frame}>
      <AddSchedule />
      {schedules &&
        schedules.map((schedule) => (
          <Schedule key={schedule.id} schedule={schedule} />
        ))}
    </div>
  );
}
export default ScheduleList;
