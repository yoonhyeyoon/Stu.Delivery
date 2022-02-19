import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Schedule.module.css";
import { Modal } from "@mui/material";
import SelectDate from "./SelectDate";
import { is_member_check, setHeader } from "../../../../utils/api";
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
          <a onClick={handleShow} className={styles.add_btn}>
            + 일정 추가하기
          </a>
        ) : null}
      </div>
      <Modal open={show} onClose={handleClose}>
        <div className={styles.modal}>
          <CloseIcon className={styles.close} onClick={handleClose} />
          <form>
            <div className={styles.modal_text_aria}>
              <div className={styles.modal_date}>
                <SelectDate startDate={startDate} setStartDate={setStartDate} />
              </div>
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
              <div className={styles.modal_btn_wrap}>
                <button
                  className={styles.modal_btn}
                  onClick={handleAddSchedule}
                >
                  글쓰기
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
export default AddSchedule;
