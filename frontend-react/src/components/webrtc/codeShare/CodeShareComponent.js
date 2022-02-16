import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import HighlightOff from "@material-ui/icons/HighlightOff";

import Quill from "quill";
import "quill/dist/quill.bubble.css";
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";

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
    // Registering the rich text type to make sharedb work
    // with our quill editor
    Sharedb.types.register(richText.type);

    // Connecting to our socket server
    const socket = new WebSocket("wss://i6d201.p.ssafy.io:9000");
    const connection = new Sharedb.Connection(socket);

    // Querying for our document
    const doc = connection.get(
      "documents",
      this.props.user.getStreamManager().stream.session.sessionId
    );

    doc.subscribe(function (err) {
      if (err) return console.error(err);

      if (doc.type === null) {
        /**
         * If there is no document with id "firstDocument" in memory
         * we are creating it and then starting up our ws server
         */
        doc.create([{ insert: "Hello World!" }], "rich-text");
      }

      const toolbarOptions = ["bold", "italic", "underline", "strike", "align"];
      const options = {
        theme: "bubble",
        modules: {
          toolbar: toolbarOptions,
        },
      };
      let quill = new Quill("#editor", options);
      /**
       * On Initialising if data is present in server
       * Updaing its content to editor
       */
      quill.setContents(doc.data);

      /**
       * On Text change publishing to our server
       * so that it can be broadcasted to all other clients
       */
      quill.on("text-change", function (delta, oldDelta, source) {
        if (source !== "user") return;
        doc.submitOp(delta, { source: quill });
      });

      /** listening to changes in the document
       * that is coming from our server
       */
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
            <div style={{ margin: "5%", border: "1px solid" }}>
              <div id="editor"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
