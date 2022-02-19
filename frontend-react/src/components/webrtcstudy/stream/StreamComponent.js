import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
  }

  render() {
    return (
      <div>
        <div className="pointer nickname">
          <div className="hearder_bar" onClick={this.toggleNicknameForm}>
            <span id="nickname">{this.props.user.getNickname()}</span>
            {this.props.user.isLocal() && <span id=""> (edit)</span>}
          </div>
        </div>

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
