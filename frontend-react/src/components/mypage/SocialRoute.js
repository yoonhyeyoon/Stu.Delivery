import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import CheckPwd from "./update/checkpwd/CheckPwd";
import Update from "./update/Update";

const SocialRoute = ({ socialLogin }) => {
  //   const socialLogin = localStorage.getItem("is_oauth2_login");
  console.log(!!socialLogin);

  if (
    socialLogin === "true" ||
    localStorage.getItem("is_authenticated") === "true"
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="check" />;
  }
};

export default SocialRoute;
