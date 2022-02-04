import React, { useEffect, useState, useRef } from "react";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Memo from "./Memo";
import AddMemo from "./AddMemo";
import styles from "./Memo.module.css";

function MemoList() {
  const memoContainer = useRef();
  const [box, setBox] = useState({});
  // useEffect(() => {
  //   const box = memoContainer.current.getBoundingClientRect();
  //   setBox({
  //     top: box.top,
  //     left: box.left,
  //     bottom: box.top + box.height,
  //     right: box.left + box.width,
  //   });
  // }, []);

  const dispatch = useDispatch();
  // const [memos, setMemos] = useState();
  const memos = useSelector((state) => state.memos.memos); // 조회

  useEffect(() => {
    const study_id = 1;
    const fetchMemo = async () => {
      axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${study_id}/board`,
      })
        .then((res) => {
          // console.log(res.data);
          // setMemos(res.data);
          dispatch(loadMemo(res.data));
        })
        .catch((err) => console.log(err));
    };
    fetchMemo();
  }, [dispatch]);
  return (
    <div className={styles.frame} ref={memoContainer}>
      <AddMemo />
      {memos &&
        memos.map((memo) => (
          <Memo
            key={memo.study_board_id}
            title={memo.title}
            content={memo.content}
            created={memo.created_at}
            user_id={memo.user_id}
            id={memo.study_board_id}
            box={box}
          />
        ))}
    </div>
  );
}
export default MemoList;
