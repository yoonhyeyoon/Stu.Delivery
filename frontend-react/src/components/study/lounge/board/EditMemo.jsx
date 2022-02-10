import React, { useState } from "react";
import { updateMemo, removeMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setHeader } from "../../../../utils/api";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function EditMemo({ memo }) {
  const user = useSelector((state) => state.user.user);
  const study = useSelector((state) => state.study.study);
  // console.log(study);
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
        })
        .catch((err) => console.log(err.response));
      handleClose();
      window.location.reload();
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
        // console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      {memo.user_id === user.id || study.master_id === user.id ? (
        <>
          <EditIcon onClick={handleShow} className={styles.btn} />
          <DeleteIcon onClick={handleRemoveMemo} className={styles.btn} />
        </>
      ) : null}
      <Modal open={show} onClose={handleClose}>
        <div className={styles.modal}>
          <CloseIcon className={styles.close} onClick={handleClose} />
          <form>
            <div className={styles.modalTextAria}>
              {/* <h2 id="unstyled-modal-title">제목</h2> */}
              <h3>메모</h3>
              <input type="text" value={newTitle} onChange={onTitleHandler} />
              <h3>상세내용</h3>
              <textarea
                className={styles.content}
                value={newContent}
                onChange={onContentHandler}
              />
            </div>
            <div className={styles.modalBottom}>
              <h3>
                {newContent.length}/{contentLimit}
              </h3>
              <button onClick={handleUpdateMemo}>수정하기</button>
              {/* {memo.created_at && memo.created_at.slice(0, 10)}
              <EditMemo memo={memo} /> */}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default EditMemo;
