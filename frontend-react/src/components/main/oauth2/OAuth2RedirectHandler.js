import React from "react";
import { setJwtToken } from "../../../utils/api";
import { Navigate, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = (props) => {
  const GetUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    const location = useLocation();

    // URL로부터 access token 추출
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = GetUrlParameter("token");
  const error = GetUrlParameter("error");

  // 토큰을 성공적으로 받았을 경우 /profile로 이동, 토큰 실패시 error state 추가
  if (token) {
    console.log("set token!");
    setJwtToken(token);
    return (
      <Navigate
        to={{
          pathname: "/mypage/dashboard",
          // eslint-disable-next-line no-restricted-globals
          state: { from: location },
        }}
      />
    );
  } else {
    console.log("error!");
    return (
      <Navigate
        to={{
          pathname: "/",
          // eslint-disable-next-line no-restricted-globals
          state: { from: location, error: error },
        }}
      />
    );
  }
};

export default OAuth2RedirectHandler;
