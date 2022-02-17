import React, { Component } from "react";
import "./StreamComponent.css";

export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log("PROPS: ", this.props);
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        "signal:userChanged",
        (event) => {
          const data = JSON.parse(event.data);
          if (data.isScreenShareActive !== undefined) {
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        }
      );
    }
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  handleOnClick(obj) {
    console.log("handleOnClick");
    console.log(obj.videoRef.current);
    const vid = document.getElementById(obj.videoRef.current.id);

    vid.style.width = "100%";
    vid.style.height = "auto";
    vid.style.transition = "width 0.5s ease";
  }

  render() {
    return (
      <video
        autoPlay={true}
        id={"video-" + this.props.user.getStreamManager().stream.streamId}
        ref={this.videoRef}
        muted={this.props.mutedSound}
        onClick={() => this.handleOnClick(this)}
      />
    );
  }
}
