import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoConference from "./Webrtc/VideoConference";
import "./StudyGroup.css";

const StudyGroup = (props) => {
  let history = useNavigate();

  return (
    <div>
      <div className="study-group">
        <VideoConference />
      </div>
    </div>
  );
};

export default StudyGroup;
