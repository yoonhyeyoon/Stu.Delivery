import React, { useEffect, useState, useRef } from "react";
import styles from "./StudyHeader.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { is_member_check, setHeader } from "../../../../utils/api";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import Modal from "react-bootstrap/Modal";
import StudyInfoUpdate from "../../info/StudyInfoUpdate";

function StudyBtn() {
  const params = useParams();

  const study = useSelector((state) => state.study.study);
  const user = useSelector((state) => state.user.user);
  const isMember = is_member_check(study, user);

  const handleSignUpStudy = async (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/member`,
      headers: setHeader(),
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.errorMessage);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {isMember ? (
        <Button className={styles.btn}>
          <Link to={`/study/${study.id}`}>스터디 라운지</Link>
        </Button>
      ) : (
        <Button onClick={handleSignUpStudy} className={styles.btn}>
          스터디 가입
        </Button>
      )}
      {study.master_id === user.id ? (
        <>
          <Button className={styles.btn} onClick={handleShow}>
            스터디 정보 수정
          </Button>
          <Modal show={show} onHide={handleClose}>
            <StudyInfoUpdate />
          </Modal>
        </>
      ) : null}
    </>
  );
}
export default StudyBtn;
