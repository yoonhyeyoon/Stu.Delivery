import React, { useState } from "react";
import axios from "axios";
import styles from "./Schedule.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setHeader } from "../../../../utils/api";
import SelectDate from "./SelectDate";

function Schedule({ schedule }) {
  const [show, setShow] = useState(false);
  const study_id = 1;
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (localStorage.getItem("isMember")) {
      setShow(true);
    }
  };
  const [newTitle, setNewTitle] = useState(schedule.title);
  const [newContent, setNewContent] = useState(schedule.content);
  const [newStartDate, setNewStartDate] = useState(new Date(schedule.time));
  const contentLimit = 200;
  const onTitleHandler = (event) => {
    setNewTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setNewContent(event.target.value);
  };

  const handleUpdateSchedule = async (event) => {
    event.preventDefault();
    if (newTitle === "") {
      return alert("제목을 입력하세요.");
    } else if (newContent === "") {
      return alert("내용을 입력하세요.");
    } else {
      axios({
        method: "put",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/schedule/${schedule.id}`,
        data: {
          title: newTitle,
          content: newContent,
          time: newStartDate.toISOString(),
        },
        headers: setHeader(),
      })
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => console.log(err.response));
      handleClose();
    }
  };

  const handleRemoveMemo = async (event) => {
    event.preventDefault();
    axios({
      method: "delete",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/schedule/${schedule.id}`,
      headers: setHeader(),
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err.response.data));
  };
  return (
    <>
      <div onClick={handleShow} className={styles.form}>
        <p>{schedule.title}</p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleUpdateSchedule}>
          <SelectDate startDate={newStartDate} setStartDate={setNewStartDate} />
          <Form.Control
            type="text"
            value={newTitle}
            placeholder="일정명"
            onChange={onTitleHandler}
          />
          <Form.Control
            as="textarea"
            cols="30"
            rows="10"
            placeholder="상세내용"
            value={newContent}
            onChange={onContentHandler}
          />
          <div>
            <small>
              {newContent.length}/{contentLimit}
            </small>
            <Button type="submit">수정</Button>
            <Button onClick={handleRemoveMemo}>삭제</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
export default Schedule;
