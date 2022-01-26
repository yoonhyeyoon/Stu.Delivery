import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

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
    const appName = "Stu.Delivery";
    return (
      <header className="app-header">
        <div className="container">
          <div className="app-branding">
            <div className="app-title">{appName}</div>
          </div>
          <div className="app-options">
            <nav className="app-nav">
              <ul>
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
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
