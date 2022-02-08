import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import "./Mypage.css";

import MyStudy from "./study/MyStudy";
import Dashboard from "./dashboard/Dashboard";
import Withdrawal from "./withdrawal/Withdrawal";
import Update from "./update/Update";
import CheckPwd from "./update/checkpwd/CheckPwd";

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <nav className="side-nav">
        <ul>
          <li>
            <Link to="update/check">회원정보수정</Link>
          </li>
          <li>
            <Link to="study">내 스터디</Link>
          </li>
          <li>
            <Link to="dashboard">대시보드</Link>
          </li>
          <li>
            <Link to="withdrawal">회원탈퇴</Link>
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
      <Routes>
        <Route path="update/check" element={<CheckPwd />}></Route>
        <Route path="update" element={<Update />}></Route>
        <Route path="study" element={<MyStudy />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="withdrawal" element={<Withdrawal />}></Route>
      </Routes>
    </div>
  );
};

export default MyPage;
