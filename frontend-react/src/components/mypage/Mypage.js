import React from "react";
import "./Mypage.css";

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <nav className="side-nav">
        <ul>
          <li>
            <p>회원정보수정</p>
          </li>
          <li>
            <p>내 스터디 조회</p>
          </li>
          <li>
            <p>대시보드</p>
          </li>
          <li>
            <p>회원탈퇴</p>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const MyPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="contents">"hello Mypage!"</div>
    </div>
  );
};

export default MyPage;
