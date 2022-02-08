import React from "react";

import ProgressBar from "../../progressbar/ProgressBar";

const Dashboard = () => {
  let nickname = "귐기";

  let interests = ["리액트", "Vue.js"];
  let aspire = "아자아자";
  let percent = 0;

  return (
    <div className="container">
      <h2 className="dashboard">대시보드</h2>
      <div className="profile">
        <p className="nickname">{nickname}</p>
      </div>
      <div className="attendance">
        <h3 className="sub-title">출석현황</h3>
      </div>
      <div className="interest">
        <h3 className="sub-title">관심사</h3>
      </div>
      <div className="aspire">
        <h3 className="sub-title">나의 한마디</h3>
        <div className="content">{aspire}</div>
      </div>
      <div className="goals">
        <h3 className="sub-title">목표</h3>
        <ProgressBar width={400} percent={percent} />
      </div>
    </div>
  );
};

export default Dashboard;
