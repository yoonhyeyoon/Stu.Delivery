import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import CheckPwd from "./update/checkpwd/CheckPwd";
import Update from "./update/Update";

const SocialRoute = ({ socialLogin }) => {
  if (
    // 소셜 로그인을 진행한 사용자 또는 일반 사용자 중 비밀번호 확인 절차를 거친 사용자는 Update 컴포넌트로 이동
    socialLogin === "true" ||
    localStorage.getItem("is_authenticated") === "true"
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="check" />;
  }
};

export default SocialRoute;
