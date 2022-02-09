import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./StudyHeader.module.css";
import Button from "react-bootstrap/Button";
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
            <Button className={styles.btn}>
              <Link to="/study/info">스터디 정보</Link>
            </Button>
          ) : (
            <StudyBtn />
          )}
        </>
      ) : null}
    </div>
  );
}
export default StudyHeader;
