import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "./logo.png";

class Header extends Component {
  constructor(props) {
    super(props);

    // state 초기값 설정
    this.state = {
      isCollapse: false,
      searchValue: null,
    };
  }
  clickLogo() {}

  render() {
    console.log(this.props.isLogin);
    const appName = "Stu.Delivery";

    // 로그아웃
    const onLogout = () => {
      localStorage.removeItem("JWT");
      document.location.href = "/main";
    };

    return (
      <>
        <header className="app-header">
          <div className="container">
            <div className="app-branding">
              <div className="app-title">
                <img src={logo} />
              </div>
            </div>
            <div className="app-options">
              <nav className="app-nav">
                {this.props.isLogin ? (
                  <ul>
                    <li>
                      <button onClick={onLogout}>로그아웃</button>
                    </li>
                    <li>
                      <p>내 스터디</p>
                    </li>
                    <li>
                      <p>스터디 목록</p>
                    </li>
                    <li>
                      <p>스터디 만들기</p>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <a href="/login">로그인</a>
                    </li>
                    <li>
                      <a href="/signup">회원가입</a>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
