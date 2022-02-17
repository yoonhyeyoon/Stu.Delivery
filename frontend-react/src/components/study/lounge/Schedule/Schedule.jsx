import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Schedule.module.css";
import { Modal } from "@mui/material";
import Button from "@material-ui/core/Button";
import { is_member_check, setHeader } from "../../../../utils/api";
import SelectDate from "./SelectDate";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import { ModalBody, ModalTitle } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function Schedule({ schedule }) {
  const params = useParams();
  const study = useSelector((state) => state.study.study);
  const user = useSelector((state) => state.user.user);
  const isMember = is_member_check(study, user);

  const [show, setShow] = useState(false);
  const study_id = 1;
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (isMember) {
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
        url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/schedule/${schedule.id}`,
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
      url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/schedule/${schedule.id}`,
      headers: setHeader(),
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err.response.data));
  };
  const offset = new Date().getTimezoneOffset() * 60000;
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          isMember ? (
            <IconButton
              edge="end"
              aria-label="delete"
              title="Delete"
              onClick={handleRemoveMemo}
            >
              <DeleteIcon />
            </IconButton>
          ) : null
        }
        className={styles.form}
      >
        <ListItemText
          className={styles.text_aria}
          onClick={handleShow}
          primary={schedule.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {new Date(newStartDate - offset).toLocaleString()}
              </Typography>
              {schedule.content}
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Modal show={show} onHide={handleClose}>
        <Form className={styles.bg}>
          <Modal.Header>
            <Modal.Title>
              스터디 일정
              <CloseIcon className={styles.close} onClick={handleClose} />
            </Modal.Title>
          </Modal.Header>
          <ModalBody>
            <SelectDate
              startDate={newStartDate}
              setStartDate={setNewStartDate}
            />
            <Form.Control
              size="lg"
              type="text"
              className={styles.bg}
              value={newTitle}
              placeholder="일정명"
              onChange={onTitleHandler}
            />
            <Form.Control
              className={styles.bg}
              as="textarea"
              cols="30"
              rows="10"
              placeholder="상세내용"
              value={newContent}
              onChange={onContentHandler}
            />
          </ModalBody>
          <Modal.Footer>
            <p>
              {newContent.length}/{contentLimit}
            </p>
            <EditIcon onClick={handleUpdateSchedule} className={styles.btn} />
            {/* <Button onClick={handleRemoveMemo}>삭제</Button> */}
      {/* </Modal.Footer>
        </Form>
      </Modal> */}
      <Modal open={show} onClose={handleClose}>
        <div className={styles.modal}>
          <CloseIcon className={styles.close} onClick={handleClose} />
          <form>
            <div className={styles.modal_text_aria}>
              <div className={styles.modal_date}>
                <SelectDate
                  startDate={newStartDate}
                  setStartDate={setNewStartDate}
                />
              </div>
              <h3>일정명</h3>
              <input
                className={styles.title}
                value={newTitle}
                onChange={onTitleHandler}
              />
              <h3>상세내용</h3>
              <textarea
                className={styles.content}
                value={newContent}
                onChange={onContentHandler}
              />
            </div>
            <div className={styles.modal_bottom}>
              <div className={styles.modal_len}>
                <h3>
                  {newContent.length}/{contentLimit}
                </h3>
              </div>
              <div className={styles.modal_btn_wrap}>
                <button
                  className={styles.modal_btn}
                  onClick={handleUpdateSchedule}
                >
                  수정하기
                </button>
              </div>
              {/* {memo.created_at && memo.created_at.slice(0, 10)}
              <EditMemo memo={memo} /> */}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default Schedule;
