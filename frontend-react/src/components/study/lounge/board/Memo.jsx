import React, { useState } from "react";
import { updateMemo, removeMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";
import Draggable from "react-draggable";
import EditMemo from "./EditMemo";
import { Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Memo({ memo }) {
  const user = useSelector((state) => state.user.user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.hvrGrow}>
      <div className={styles.form}>
        <div onClick={handleShow} className={styles.text_aria}>
          <h4>{memo.title}</h4>
          <p>{memo.content}</p>
        </div>
        <div className={styles.bottom}>
          {memo.created_at && memo.created_at.slice(0, 10)}
          <EditMemo memo={memo} />
        </div>
      </div>
      <Modal open={show} onClose={handleClose}>
        <div className={styles.modal}>
          <div>
            <div className={styles.modal_text_aria}>
              <h2>{memo.title}</h2>
              <p>{memo.content}</p>
            </div>
            <div className={styles.modal_bottom}>
              {memo.created_at && memo.created_at.slice(0, 10)}
              <EditMemo memo={memo} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Memo;
