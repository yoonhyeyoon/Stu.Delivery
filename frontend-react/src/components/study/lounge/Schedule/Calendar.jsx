import React from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/daygrid/main.css";
import styles from "./Schedule.module.css";
import "./Calendar.css";

function Calendar({ schedules }) {
  const study = useSelector((state) => state.study.study);

  const scheduleEvent = (schedules) => {
    const events = [];
    const offset = new Date().getTimezoneOffset() * 60000;
    if (schedules) {
      for (var i in schedules) {
        events.push({
          title: schedules[i].title,
          date: new Date(new Date(schedules[i].time) - offset),
          backgroundColor: "#bf7a26",
        });
      }
      return events;
    }
  };
  return (
    <div className={styles.schedule_calendar}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        height={600}
        events={scheduleEvent(schedules)}
        locale="ko"
      />
    </div>
  );
}
export default Calendar;
