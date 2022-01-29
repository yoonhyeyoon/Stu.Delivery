import React, { useState } from "react";
import { insertMemo } from "../../../../redux/memos";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function MemoInput() {
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
  const handleAddMemo = async (event) => {
    event.preventDefault();
    if (title === "") {
      return alert("제목을 입력하세요.");
    } else if ((content = "")) {
      return alert("내용을 입력하세요.");
    } else {
      const memo = {
        title: title,
        content: content,
      };
      axios({
        method: "post",
        url: "",
        data: memo,
      })
        .then((res) => {
          const resData = res.data;
          dispatch(insertMemo(resData.id, title, content));
        })
        .catch((err) => console.log(err));
      handleClose();
    }
  };

  return (
    <div>
      <a onClick={handleShow} className={styles.btn}>
        + 보드추가하기
      </a>
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
export default MemoInput;
