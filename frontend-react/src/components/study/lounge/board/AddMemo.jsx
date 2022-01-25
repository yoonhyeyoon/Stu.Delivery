import React, { useState } from "react";
import { insertMemo } from "../../../../redux/memos";
import { useDispatch } from "react-redux";
import axios from "axios";

function MemoInput() {
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
    if (title == "") {
      return alert("제목을 입력하세요.");
    } else if ((content = "")) {
      return alert("내용을 입력하세요.");
    } else {
      const memo = {
        title: title,
        content: content,
      };
      axios({
        method: "post",
        url: "",
        data: memo,
      })
        .then((res) => {
          const resData = res.data;
          dispatch(insertMemo(resData.id, title, content));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form onSubmit={handleAddMemo}>
        <input
          type="text"
          value={title}
          placeholder="제목"
          onChange={onTitleHandler}
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="내요오옹"
          value={content}
          onChange={onContentHandler}
        ></textarea>
        <div>
          <small>
            {contentLimit - content.length}/{contentLimit}
          </small>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}
export default MemoInput;
