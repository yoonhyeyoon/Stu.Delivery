import React from "react";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import styles from "./Schedule.module.css";
import Box from "@mui/material/Box";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";

function SelectDate({ startDate, setStartDate }) {
  const study = useSelector((state) => state.study.study);

  registerLocale("ko", ko);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDateTimePicker
          label="Custom input"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          minDate={new Date(study.start_at)}
          maxDate={new Date(study.finish_at)}
          inputFormat="yyyy/MM/dd hh:mm a"
          renderInput={(params) => <TextField {...params} />}
          mask="___/__/__ __:__ _M"
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <input className={styles.date} ref={inputRef} {...inputProps} />
              {InputProps?.endAdornment}
            </Box>
          )}
        />
      </LocalizationProvider>
    </div>
  );
}
export default SelectDate;
