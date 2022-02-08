import React, { useState } from "react";
import { updateMemo, removeMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setHeader } from "../../../../utils/api";

function EditMemo({ memo }) {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(memo.title);
  const [newContent, setNewContent] = useState(memo.content);
  const contentLimit = 200;
  const study_id = 1;

  const onTitleHandler = (event) => {
    setNewTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setNewContent(event.target.value);
  };

  const handleUpdateMemo = async (event) => {
    event.preventDefault();
    if (newTitle === "") {
      return alert("제목을 입력하세요.");
    } else if (newContent === "") {
      return alert("내용을 입력하세요.");
    } else {
      axios({
        method: "put",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/board/${memo.study_board_id}`,
        data: {
          title: newTitle,
          content: newContent,
        },
        headers: setHeader(),
      })
        .then((res) => {
          // console.log(res);
          const resData = res.data;
          dispatch(
            updateMemo(
              resData.study_memo.board_id,
              resData.title,
              resData.content,
              resData.user_id,
              resData.created_at
            )
          );
          window.location.reload();
        })
        .catch((err) => console.log(err.response));
      handleClose();
    }
  };

  const handleRemoveMemo = async () => {
    dispatch(removeMemo(memo.study_board_id));
    axios({
      method: "delete",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/board/${memo.study_board_id}`,
      headers: setHeader(),
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div>
      {memo.user_id === user.id ? (
        <>
          <a onClick={handleShow} className={styles.btn}>
            수정
          </a>
          <a onClick={handleRemoveMemo} className={styles.btn}>
            삭제
          </a>
        </>
      ) : null}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleUpdateMemo}>
          <Form.Control
            type="text"
            value={newTitle}
            placeholder="제목"
            onChange={onTitleHandler}
          />
          <Form.Control
            as="textarea"
            cols="30"
            rows="10"
            placeholder="내요오옹"
            value={newContent}
            onChange={onContentHandler}
          ></Form.Control>
          <div>
            <small>
              {newContent.length}/{contentLimit}
            </small>
            <Button type="submit">게시</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
export default EditMemo;
