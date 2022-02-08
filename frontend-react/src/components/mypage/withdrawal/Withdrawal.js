import React from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../../../constants";

const unjoin = () => {
  console.log("회원탈퇴");

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  axios({
    method: "delete",
    url: "https://i6d201.p.ssafy.io/api/v1/auth/login",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      console.log("회원탈퇴 되었습니다.");
      alert("회원탈퇴가 완료되었습니다.");
      localStorage.clear(); // localStorage 비우기
      window.location.href = "/main";
    })
    .catch((e) => {
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
      console.log("Error!");
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
