import React from "react";

const unjoin = () => {
  console.log("회원탈퇴");
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
