import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Mypage.css";

import Dashboard from "./dashboard/Dashboard";
import Withdrawal from "./withdrawal/Withdrawal";
import Update from "./update/Update";
import CheckPwd from "./update/checkpwd/CheckPwd";
import SocialRoute from "./SocialRoute";

const MyPage = () => {
  return (
    <>
      <div className="container">
        <Routes>
          {/* <SocialRoute path="update/check" element={<CheckPwd />}></SocialRoute> */}
          <Route
            path="update/check"
            element={
              <SocialRoute>
                <CheckPwd />
              </SocialRoute>
            }
          ></Route>
          <Route path="update" element={<Update />}></Route>
          {/* <Route path="study" element={<MyStudy />}></Route> */}
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="withdrawal" element={<Withdrawal />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default MyPage;
