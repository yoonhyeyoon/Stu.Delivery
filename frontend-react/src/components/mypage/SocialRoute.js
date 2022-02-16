import React from "react";
import { Navigate } from "react-router-dom";
import CheckPwd from "./update/checkpwd/CheckPwd";

const SocialRoute = ({ children }) => {
  const socialLogin = localStorage.getItem("is_oauth2_login");

  return socialLogin ? <CheckPwd /> : <Navigate to="update" />;
};

export default SocialRoute;
