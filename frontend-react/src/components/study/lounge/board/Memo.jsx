import React, { useState } from "react";
import { updateMemo, removeMemo } from "../../../../redux/memos";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";
import Draggable from "react-draggable";
import EditMemo from "./EditMemo";

function Memo({ memo }) {
  // const [pos, setPos] = useState({ x: 0, y: 0 });
  // const handleStart = (e, data) => {
  //   setPos({ x: data.x, y: data.y });
  // };
  // const handleStop = (e, data) => {
  //   console.log(e.target.style.left);
  //   if (
  //     box.left < data.x &&
  //     data.x < box.right &&
  //     box.top < data.y &&
  //     data.y < box.bottom
  //   ) {
  //     setPos({ x: data.x, y: data.y });
  //   } else {
  //     e.target.style.left = `${pos.x}px`;
  //     e.target.style.top = `${pos.y}px`;
  //   }
  // };
  return (
    <div>
      {/* <input type="text" defaultValue={title} onChange={onTitleHandler} />
      <textarea
        cols="30"
        rows="10"
        defaultValue={content}
        onChange={onContentHandler}
      ></textarea>
      <div>
        <small>
          {contentLimit - content.length}/{contentLimit}
        </small>
        <button onClick={handleUpdateMemo}>수정</button>
        <button onClick={handleRemoveMemo}>삭제</button>
      </div> */}
      <Draggable>
        {/* onDrag={(e, data) => trackPos(data)}
        onStart={handleStart}
        onStop={handleStop} */}
        <div className={styles.postIt}>
          <div className={styles.form}>
            <div className={styles.textAria}>
              <h4>{memo.title}</h4>
              <p>{memo.content}</p>
            </div>
            <div className={styles.bottom}>
              {memo.created_at && memo.created_at.slice(0, 10)}
              <EditMemo memo={memo} />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
export default Memo;
