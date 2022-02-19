import React, { useState } from "react";
import { insertMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";
import { Box, Modal } from "@mui/material";

import { is_member_check, setHeader } from "../../../../utils/api";

import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router";

function AddMemo() {
  const params = useParams();

  const study = useSelector((state) => state.study.study);
  const user = useSelector((state) => state.user.user);
  const isMember = is_member_check(study, user);

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
    } else if (content === "") {
      return alert("내용을 입력하세요.");
    } else {
      axios({
        method: "post",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/board`,
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
        .catch((err) => {
          // console.log(err.response.data);
          if (err.response.data.errorCode === "402") {
            alert("스터디보드는 최대 5개까지 입력 가능합니다.");
          }
        });
      handleClose();
    }
  };

  return (
    <>
      {isMember ? (
        <a onClick={handleShow} className={styles.add_btn}>
          + 보드 추가하기
        </a>
      ) : null}

      <Modal open={show} onClose={handleClose}>
        <div className={styles.modal}>
          <CloseIcon className={styles.close} onClick={handleClose} />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            fullWidth
          >
            <div className={styles.modal_tex_aria}>
              <h3>메모</h3>
              <input
                className={styles.title}
                value={title}
                onChange={onTitleHandler}
              />
              <h3>상세내용</h3>
              <textarea
                className={styles.content}
                value={content}
                onChange={onContentHandler}
              />
            </div>
            <div className={styles.modal_bottom}>
              <h3>
                {content.length}/{contentLimit}
              </h3>
              <div className={styles.modal_btn_wrap}>
                <button className={styles.modal_btn} onClick={handleAddMemo}>
                  글쓰기
                </button>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
}
export default AddMemo;
