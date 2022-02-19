import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import HighlightOff from "@material-ui/icons/HighlightOff";

import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";

import "../chat/ChatComponent.css";

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

  componentDidMount() {
    Sharedb.types.register(richText.type);

    const socket = new WebSocket("wss://i6d201.p.ssafy.io:9000");
    const connection = new Sharedb.Connection(socket);

    const doc = connection.get(
      "documents",
      this.props.user.getStreamManager().stream.session.sessionId
    );

    doc.subscribe(function (err) {
      if (err) return console.error(err);

      if (doc.type === null) {
        doc.create([{ insert: "Hello World!" }], "rich-text");
      }

      const toolbarOptions = [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }],
        ["clean"],
      ];
      const options = {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      };
      let quill = new Quill("#editor", options);

      quill.setContents(doc.data);

      quill.on("text-change", function (delta, oldDelta, source) {
        if (source !== "user") return;
        doc.submitOp(delta, { source: quill });
      });

      doc.on("op", function (op, source) {
        if (source === quill) return;
        quill.updateContents(op);
      });
    });
    return () => {
      connection.close();
    };
  }

  componentDidUpdate() {}

  render() {
    const styleCodeShare = {
      display: this.props.codeShareDisplay,
      overflow: "auto",
      background: "#f2f2e8",
      boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.7)",
    };
    return (
      <div id="chatContainer" style={{ background: "#f2dcc2" }}>
        <div id="chatComponent" style={styleCodeShare}>
          <div
            id="chatToolbar"
            style={{ background: "#f2f2e8", color: "black" }}
          >
            <span>에디터</span>
            <IconButton id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton>
            <div style={{ border: "0" }}>
              <div id="editor"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
