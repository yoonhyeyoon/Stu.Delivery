import React, { useState } from "react";
import { updateMemo, removeMemo } from "../../../../redux/memos";
import { useDispatch } from "react-redux";
import axios from "axios";

function BoardMemo({ id, title, content, date, author }) {
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
      <div>
        <input type="text" defaultValue={title} onChange={onTitleHandler} />
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
        </div>
      </div>
    </div>
  );
}
export default BoardMemo;
