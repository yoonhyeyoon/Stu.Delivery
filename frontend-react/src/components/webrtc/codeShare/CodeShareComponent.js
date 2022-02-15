import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";

import { Tooltip } from "@material-ui/core";

export default class CodeShareComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    const styleCodeShare = { display: this.props.codeShareDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleCodeShare}>
          <div id="chatToolbar">
            <span>
              {this.props.user.getStreamManager().stream.session.sessionId} -
              CodeShare
            </span>
            <IconButton id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton>
            <div>
              <span>코드 공유 넣을 곳!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
