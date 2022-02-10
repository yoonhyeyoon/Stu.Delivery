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
  const [info, setInfo] = useState();

  useEffect(() => {
    const study_id = 1;
    const fetchStudyInfo = async () => {
      axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}`,
      })
        .then((res) => {
          // console.log(res);
          setInfo(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchStudyInfo();
  }, []);

  return (
    <div className={styles.frame}>
      {info ? (
        <>
          <StudyNameUrl info={info} />
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
