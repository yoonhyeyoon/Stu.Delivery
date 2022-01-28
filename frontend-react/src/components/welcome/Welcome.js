import React from "react";

const Welcome = () => {
  const signup = () => {
    window.location.href = "/signup";
  };

  const login = () => {
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div className="title">안녕하세요!</div>
      <button className="signup" onClick={signup}>
        회원가입
      </button>
      <button className="login" onClick={login}>
        로그인
      </button>
    </div>
  );
};

export default Welcome;
