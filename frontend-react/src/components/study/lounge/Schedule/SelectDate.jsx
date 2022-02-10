import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// import getYear from "date-fns/getYear";
// import getMonth from "date-fns/getMonth";

//추후에 커스텀할 것

function SelectDate() {
  registerLocale("ko", ko);
  const _ = require("lodash");

  const [startDate, setStartDate] = useState(new Date());

  console.log(startDate.toISOString());
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
  return (
    <DatePicker
      locale="ko"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeInputLabel="Time:"
      dateFormat="yyyy년 MM월 dd일 h시mm분 aa"
      showTimeInput
      shouldCloseOnSelect={false}
    ></DatePicker>
  );
}
export default SelectDate;
