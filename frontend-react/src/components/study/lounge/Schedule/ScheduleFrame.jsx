import Calendar from "./Calendar";
import ScheduleList from "./ScheduleList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Schedule.module.css";
import { useParams } from "react-router";

function ScheduleFrame() {
  const params = useParams();

  const [schedules, setSchedules] = useState();

  useEffect(() => {
    const study_id = 1;
    const fetchSchedule = async () => {
      await axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/schedule`,
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
    <div className={styles.schedule_wrap}>
      {schedules ? (
        <>
          <ScheduleList schedules={schedules} />
          <Calendar schedules={schedules} />
        </>
      ) : null}
    </div>
  );
}
export default ScheduleFrame;
