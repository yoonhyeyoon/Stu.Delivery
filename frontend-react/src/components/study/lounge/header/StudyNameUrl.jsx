import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./StudyHeader.module.css";
import Button from "react-bootstrap/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { style } from "@mui/system";

function StudyNameUrl({ study }) {
  return (
    <div className={styles.text_aria}>
      <h1>{study.name}</h1>
    </div>
  );
}
export default StudyNameUrl;
