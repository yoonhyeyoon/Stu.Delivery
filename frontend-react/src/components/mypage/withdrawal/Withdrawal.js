import React from "react";
import axios from "axios";
import { setHeader } from "../../../utils/api";

const unjoin = () => {
  console.log("회원탈퇴");

  axios({
    method: "delete",
    url: "https://i6d201.p.ssafy.io/api/v1/users",
    headers: setHeader(),
  })
    .then((response) => {
      alert("회원탈퇴가 완료되었습니다.");
      localStorage.clear(); // localStorage 비우기
      window.location.href = "/";
    })
    .catch((e) => {
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
      console.log(e.response);
    });
};

const Withdrawal = () => {
  return (
    <div className="withdrawal">
      <h2>회원탈퇴</h2>
      <h2 className="message">
        정말로 Stu.Delivery를 떠나실 거에요? 저희와 조금 더 함께했으면 좋겠어요
        ㅠㅠ
      </h2>
      <button className="no">아니오</button>
      <button className="yes" onClick={unjoin}>
        예
      </button>
    </div>
  );
};

export default Withdrawal;
