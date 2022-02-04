import React, { useState } from "react";
import { updateMemo, removeMemo } from "../../../../redux/memos";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Memo.module.css";
import Draggable from "react-draggable";
import EditMemo from "./EditMemo";

function Memo({ title, content, user_id, id, created, box }) {
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

  const dispatch = useDispatch();
  const [updateTitle, setUpdateTitle] = useState(content);
  const [updateContent, setUpdateContent] = useState(content);
  const contentLimit = 200;

  const onTitleHandler = (event) => {
    setUpdateTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setUpdateContent(event.target.value);
  };

  const handleUpdateMemo = async () => {
    const memo = {
      title: updateTitle,
      content: updateContent,
    };
    axios({
      method: "put",
      url: "",
      data: memo,
    })
      .then((res) => {
        const resData = res.data;
        dispatch(updateMemo(resData.id, updateTitle, updateContent));
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveMemo = async () => {
    dispatch(removeMemo(id));
    axios.delete("");
  };

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
              <h4>{title}</h4>
              <p>{content}</p>
            </div>
            <div className={styles.bottom}>
              {created.slice(0, 10)}
              <EditMemo
                defaultTitle={title}
                defaultContent={content}
                board_id={id}
              />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
export default Memo;
