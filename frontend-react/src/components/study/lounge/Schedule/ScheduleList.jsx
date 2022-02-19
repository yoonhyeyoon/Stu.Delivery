import React from "react";
import Schedule from "./Schedule.jsx";
import AddSchedule from "./AddSchedule.jsx";
import styles from "./Schedule.module.css";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

function ScheduleList({ schedules }) {
  function date_ascending(a, b) {
    var dateA = new Date(a["time"]).getTime();
    var dateB = new Date(b["time"]).getTime();
    return dateA > dateB ? 1 : -1;
  }

  return (
    <div className={styles.schedule_list}>
      <AddSchedule />
      <Box className={styles.frame}>
        <List>
          <TransitionGroup>
            {schedules &&
              schedules.sort(date_ascending).map((schedule) => (
                <Collapse key={schedule.id} timeout={500}>
                  <Schedule key={schedule.id} schedule={schedule} />
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
}
export default ScheduleList;
