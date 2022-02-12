import React, { useState } from "react";
// import { insertMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Schedule.module.css";
import { Modal } from "@mui/material";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import SelectDate from "./SelectDate";
import { is_member_check, setHeader } from "../../../../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import { ModalBody } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router";

function AddSchedule() {
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
  const [startDate, setStartDate] = useState(new Date());
  const contentLimit = 200;

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const handleAddSchedule = async (event) => {
    event.preventDefault();
    if (title === "") {
      return alert("일정명을 입력하세요.");
    } else if (content === "") {
      return alert("상세내용을 입력하세요.");
    } else {
      axios({
        method: "post",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/schedule`,
        data: {
          title: title,
          content: content,
          time: startDate.toISOString(),
        },
        headers: setHeader(),
      })
        .then((res) => {
          console.log(res);
          const resData = res.data;
          // dispatch(
          //   insertMemo(
          //     resData.study_board_id,
          //     resData.title,
          //     resData.content,
          //     resData.user_id,
          //     resData.created_at
          //   )
          // );
          window.location.reload();
        })
        .catch((err) => console.log(err.response.data));
      handleClose();
    }
  };
  return (
    <div>
      <div className={styles.frame_header}>
        {isMember ? (
          <EditIcon onClick={handleShow} className={styles.btn} />
        ) : null}
      </div>
      {/* <Modal show={show} onHide={handleClose}>
        <Form className={styles.bg}>
          <Modal.Header>
            <Modal.Title>
              스터디 일정
              <CloseIcon className={styles.close} onClick={handleClose} />
            </Modal.Title>
          </Modal.Header>
          <ModalBody>
            <SelectDate startDate={startDate} setStartDate={setStartDate} />
            <Form.Control
              size="lg"
              type="text"
              className={styles.bg}
              value={title}
              placeholder="일정명"
              onChange={onTitleHandler}
            />
            <Form.Control
              className={styles.bg}
              as="textarea"
              cols="30"
              rows="10"
              placeholder="상세내용"
              value={content}
              onChange={onContentHandler}
            />
          </ModalBody>
          <Modal.Footer>
            <p>
              {content.length}/{contentLimit}
            </p>
            <EditIcon onClick={handleAddSchedule} className={styles.btn} />
            {/* <Button onClick={handleRemoveMemo}>삭제</Button> */}
      {/* </Modal.Footer>
        </Form>
      </Modal> */}
      <Modal open={show} onClose={handleClose}>
        <div className={styles.modal}>
          <CloseIcon className={styles.close} onClick={handleClose} />
          <form>
            <div className={styles.modal_text_aria}>
              <SelectDate startDate={startDate} setStartDate={setStartDate} />
              <h3>일정명</h3>
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
              <button className={styles.modal_btn} onClick={handleAddSchedule}>
                글쓰기
              </button>
              {/* {memo.created_at && memo.created_at.slice(0, 10)}
              <EditMemo memo={memo} /> */}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
export default AddSchedule;
