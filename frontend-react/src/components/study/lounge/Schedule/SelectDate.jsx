import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDateTimePicker from "@mui/lab/StaticDateTimePicker";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
// import getYear from "date-fns/getYear";
// import getMonth from "date-fns/getMonth";

//추후에 커스텀할 것

function SelectDate({ startDate, setStartDate }) {
  registerLocale("ko", ko);
  const _ = require("lodash");

  // console.log(startDate.toISOString());
  // const years = _.range(2021, getYear(new Date()) + 1, 1);
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  const [value, setValue] = useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        label="With error handler"
        onError={console.log}
        minDate={new Date("2022-01-01T00:00")}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
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
