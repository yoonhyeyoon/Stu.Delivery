import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDateTimePicker from "@mui/lab/StaticDateTimePicker";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import styles from "./Schedule.module.css";
import Box from "@mui/material/Box";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";

// import getYear from "date-fns/getYear";
// import getMonth from "date-fns/getMonth";

//추후에 커스텀할 것

function SelectDate({ startDate, setStartDate }) {
  const study = useSelector((state) => state.study.study);
  // console.log(new Date(study.start_at));
  registerLocale("ko", ko);
  // const [value, setValue] = useState(new Date());
  return (
    <div>
      {/* <LocalizationProvider
        // className={styles.date}
        dateAdapter={AdapterDateFns}
      >
        <DesktopDatePicker
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <input ref={inputRef} {...inputProps} />
              {InputProps?.endAdornment}
            </Box>
          )}
          label="Custom input"
          // className={styles.date}
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          onError={console.log}
          minDate={new Date(study.start_at)}
          maxDate={new Date(study.finish_at)}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
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
              <input ref={inputRef} {...inputProps} />
              {InputProps?.endAdornment}
            </Box>
          )}
        />
      </LocalizationProvider>
    </div>
    // <DatePicker
    //   locale="ko"
    //   selected={startDate}
    //   onChange={(date) => setStartDate(date)}
    //   timeInputLabel="Time:"
    //   dateFormat="yyyy년 MM월 dd일 h시mm분 aa"
    //   showTimeInput
    //   shouldCloseOnSelect={false}
    // ></DatePicker>
  );
}
export default SelectDate;
