import React, { useState } from "react";
import { insertMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddMemo() {
  const user = useSelector((state) => state.user.user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentLimit = 200;

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const setHeader = () => {
    const token = localStorage.getItem("JWT");
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return header;
  };
  const handleAddMemo = async (event) => {
    event.preventDefault();
    if (title === "") {
      return alert("제목을 입력하세요.");
    } else if (content === "") {
      return alert("내용을 입력하세요.");
    } else {
      const study_id = 1;
      axios({
        method: "post",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/board`,
        data: {
          title: title,
          content: content,
        },
        headers: setHeader(),
      })
        .then((res) => {
          console.log(res);
          const resData = res.data;
          dispatch(
            insertMemo(
              resData.study_board_id,
              resData.title,
              resData.content,
              resData.user_id,
              resData.created_at
            )
          );
          window.location.reload();
        })
        .catch((err) => console.log(err.response.data));
      handleClose();
    }
  };

  return (
    <div>
      {localStorage.getItem("isMember") ? (
        <a onClick={handleShow} className={styles.btn}>
          + 보드 추가하기
        </a>
      ) : null}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleAddMemo}>
          <Form.Control
            type="text"
            value={title}
            placeholder="제목"
            onChange={onTitleHandler}
          />
          <Form.Control
            as="textarea"
            cols="30"
            rows="10"
            placeholder="내요오옹"
            value={content}
            onChange={onContentHandler}
          ></Form.Control>
          <div>
            <small>
              {content.length}/{contentLimit}
            </small>
            <Button type="submit">게시</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
export default AddMemo;
