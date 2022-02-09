import React, { useState } from "react";
// import { insertMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Schedule.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import SelectDate from "./SelectDate";
import { is_member_check, setHeader } from "../../../../utils/api";

function AddSchedule() {
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
      return alert("제목을 입력하세요.");
    } else if (content === "") {
      return alert("내용을 입력하세요.");
    } else {
      const study_id = 1;
      axios({
        method: "post",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/schedule`,
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
      {isMember ? (
        <a onClick={handleShow} className={styles.btn}>
          + 일정 추가하기
        </a>
      ) : null}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleAddSchedule}>
          <SelectDate startDate={startDate} setStartDate={setStartDate} />
          <Form.Control
            type="text"
            value={title}
            placeholder="일정명"
            onChange={onTitleHandler}
          />
          <Form.Control
            as="textarea"
            cols="30"
            rows="10"
            placeholder="상세내용"
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
export default AddSchedule;
