import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import 'main.css 파일이 위치한 경로'

function Calendar({ schedules }) {
  const scheduleEvent = (schedules) => {
    const events = [];
    if (schedules) {
      for (var i in schedules) {
        // console.log(schedules[i]);
        events.push({ title: schedules[i].title, date: schedules[i].time });
      }
      return events;
    }
  };
  console.log(scheduleEvent(schedules));
  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        // weekends={false}
        events={scheduleEvent(schedules)}
      />
    </div>
  );
}
export default Calendar;
