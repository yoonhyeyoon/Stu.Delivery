import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./StudyHeader.module.css";
// import Button from "@material-ui/core/Button";
import StudyNameUrl from "./StudyNameUrl";
import StudyBtn from "./StudyBtn";

function StudyHeader() {
  const study = useSelector((state) => state.study.study);

  return (
    <div className={styles.frame}>
      {study ? (
        <>
          <StudyNameUrl study={study} />
          {window.location.pathname === "/study" ? (
            <button className={styles.btn}>
              <Link to="/study/info">스터디 정보</Link>
            </button>
          ) : (
            <StudyBtn />
          )}
        </>
      ) : null}
    </div>
  );
}
export default StudyHeader;
