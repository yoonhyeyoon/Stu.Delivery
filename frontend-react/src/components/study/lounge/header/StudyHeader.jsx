import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./StudyHeader.module.css";
import StudyNameUrl from "./StudyNameUrl";
import StudyBtn from "./StudyBtn";
import Button from "react-bootstrap/Button";

function StudyHeader() {
  const study = useSelector((state) => state.study.study);
  const user = useSelector((state) => state.user.user);

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

                <Link
                  to={{
                    pathname: `/study/${study.id}/webrtc`,
                  }}
                >
                  <Button className={styles.btn}>회의실</Button>
                </Link>
                <Link
                  to={{
                    pathname: `/study/${study.id}/webrtcstudy`,
                  }}
                >
                  <Button className={styles.btn}>개인 열람실</Button>
                </Link>
              </>
            ) : (
              <StudyBtn />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
export default StudyHeader;
