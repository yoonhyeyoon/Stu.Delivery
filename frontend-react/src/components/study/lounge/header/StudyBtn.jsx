import React, { useEffect, useState, useRef } from "react";
import styles from "./StudyHeader.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { is_member_check, setHeader } from "../../../../utils/api";
import { useSelector } from "react-redux";
// import Button from "@material-ui/core/Button";
import Button from "react-bootstrap/Button";

function StudyBtn() {
  const study = useSelector((state) => state.study.study);
  const user = useSelector((state) => state.user.user);
  const isMember = is_member_check(study, user);

  // console.log(study, user, isMember);
  const handleSignUpStudy = async (event) => {
    event.preventDefault();
    const study_id = 1;
    axios({
      method: "post",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/member`,
      headers: setHeader(),
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.errorMessage);
      });
  };

  return (
    <>
      {isMember ? (
        <Button className={styles.btn}>
          <Link to="/study" className={styles.btn_link}>
            스터디 라운지
          </Link>
        </Button>
      ) : (
        <Button
          class="btn btn-primary shadow-none"
          onClick={handleSignUpStudy}
          className={styles.btn}
        >
          스터디 가입
        </Button>
      )}
    </>
  );
}
export default StudyBtn;
