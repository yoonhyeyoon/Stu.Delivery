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
            element={
              <SocialRoute
                socialLogin={localStorage.getItem("is_oauth2_login")}
              />
            }
          >
            <Route path="update" element={<Update />}></Route>
          </Route>
          <Route path="check" element={<CheckPwd />}></Route>
          {/* <Route path="study" element={<MyStudy />}></Route> */}
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="withdrawal" element={<Withdrawal />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default MyPage;
