import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./StudyHeader.module.css";
// import Button from "@material-ui/core/Button";
import StudyNameUrl from "./StudyNameUrl";
import StudyBtn from "./StudyBtn";
import Button from "react-bootstrap/Button";
// import Entrance from "./Entrance";

function StudyHeader() {
  const study = useSelector((state) => state.study.study);
  const handlePrivate = () => {
    axios({
      method: "post",
      url: `https://i6d201.p.ssafy.io:8443/openvidu/api/sessions/${study.private_room_id}/connection`,
      headers: {
        Authorization: `Basic btoa("OPENVIDUAPP:" + "STUDELIVERY")`,
      },
    })
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.errorMessage);
      });
  };
  const handleMeeting = () => {
    axios({
      method: "post",
      url: `https://i6d201.p.ssafy.io:8443/openvidu/api/sessions/${study.meeting_room_id}/connection`,
      headers: {
        Authorization: `Basic btoa("OPENVIDUAPP:" + "STUDELIVERY")`,
      },
    })
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.errorMessage);
      });
  };
  return (
    <div className={styles.frame}>
      {study ? (
        <>
          <div>
            <StudyNameUrl study={study} />
            {window.location.pathname === `/study/${study.id}` ? (
              <>
                <Button className={styles.btn}>
                  <Link to={`/study/${study.id}/info`}>스터디 정보</Link>
                </Button>
                <Button className={styles.btn} onClick={handlePrivate}>
                  <Link to={`/study/${study.id}`}>개인 열람실</Link>
                </Button>
                <Button className={styles.btn} onClick={handleMeeting}>
                  <Link to={`/study/${study.id}`}>회의실</Link>
                </Button>
              </>
            ) : (
              <StudyBtn />
            )}
          </div>
          {/* <div className={styles.entrance}>
            <Entrance />
          </div> */}
        </>
      ) : null}
    </div>
  );
}
export default StudyHeader;
