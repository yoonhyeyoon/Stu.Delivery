import React, { Component } from "react";

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
    const name = "React";
    return (
      <el-row className="main-header">
        <div className="hide-on-small">
          <div className="react">{name}확인글자</div>
        </div>
      </el-row>
    );
  }
}

export default Header;
