import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "./logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

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
    // console.log(this.props.isLogin);
    const appName = "Stu.Delivery";

    // 로그아웃
    const onLogout = () => {
      // 전체삭제
      localStorage.clear();
      document.location.href = "/main";
    };

    return (
      <>
        <header className="nav-wrapper fixed-top navbar navbar-toggleable-sm navbar-expand-md navbar-custom">
          <div className="container">
            <Navbar
              className="w-100"
              collapseOnSelect
              expand="lg"
              variant="dark"
            >
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Brand href="/">
                <img src={logo} alt="" />
              </Navbar.Brand>
              <Navbar.Collapse
                id="responsive-navbar-nav"
                className="app-options"
              >
                <Nav className="nav-justified w-100 nav-fill app-nav">
                  <Nav.Link href="/">내 스터디</Nav.Link>
                  <Nav.Link href="/studylist">스터디 목록</Nav.Link>
                  <Nav.Link href="/create">스터디 만들기</Nav.Link>
                  {localStorage.getItem("isLogin") ? (
                    <ul>
                      <li>
                        <a onClick={onLogout}>로그아웃</a>
                        {/* <button onClick={onLogout}>로그아웃</button> */}
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
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
