import React, { useState } from "react";
import { updateMemo, removeMemo } from "../../../../redux/memos";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditMemo({ defaultTitle, defaultContent, board_id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const contentLimit = 200;
  const study_id = 1;

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const setHeader = () => {
    const token = localStorage.getItem("accessToken");
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return header;
  };

  const handleUpdateMemo = async (event) => {
    event.preventDefault();
    if (title === "") {
      return alert("제목을 입력하세요.");
    } else if (content === "") {
      return alert("내용을 입력하세요.");
    } else {
      axios({
        method: "put",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/board/${board_id}`,
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
            updateMemo(
              resData.study_board_id,
              resData.title,
              resData.content,
              resData.user_id,
              resData.created_at
            )
          );
        })
        .catch((err) => console.log(err.response.data));
      handleClose();
    }
  };

  const handleRemoveMemo = async () => {
    dispatch(removeMemo(board_id));
    axios({
      method: "delete",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/board/${board_id}`,
      headers: setHeader(),
    });
  };

  return (
    <div>
      <a onClick={handleShow} className={styles.btn}>
        수정
      </a>
      <a onClick={handleRemoveMemo} className={styles.btn}>
        삭제
      </a>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleUpdateMemo}>
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
export default EditMemo;
