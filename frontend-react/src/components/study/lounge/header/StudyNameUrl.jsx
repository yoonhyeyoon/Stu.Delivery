import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./StudyHeader.module.css";
import Button from "react-bootstrap/Button";

function StudyNameUrl({ info }) {
  const doCopy = (text) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사하기가 지원되지 않는 브라우저입니다.");
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = "fixed";

    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();

    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("클립보드에 복사되었습니다.");
  };

  return (
    <div className={styles.textAria}>
      <h1>{info.name}</h1>
      <div>
        {info.link_url}
        <a onClick={() => doCopy(info.link_url)}>
          <i className="far fa-copy"></i>
        </a>
      </div>
    </div>
  );
}
export default StudyNameUrl;
