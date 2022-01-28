import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <div className="container">
          <div className="app-branding">
            <div className="app-title">Stu.Delivery</div>
          </div>
          <div className="app-option">
            <nav className="app-nav">
              <ul>
                <li>
                  <p>Contact us</p>
                </li>
                <li>
                  <p>공지사항</p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
