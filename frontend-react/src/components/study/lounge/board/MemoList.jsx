import React, { useEffect, useState, useRef } from "react";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Memo from "./Memo";
import AddMemo from "./AddMemo";
import styles from "./Memo.module.css";
import { useParams } from "react-router";

function MemoList() {
  const params = useParams();
  const memoContainer = useRef();
  const [box, setBox] = useState({});

  const dispatch = useDispatch();
  // const [memos, setMemos] = useState();
  const memos = useSelector((state) => state.memos.memos); // 조회

  useEffect(() => {
    const fetchMemo = async () => {
      await axios({
        method: "get",
        url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/board`,
      })
        .then((res) => {
          dispatch(loadMemo(res.data));
        })
        .catch((err) => console.log(err));
    };
    fetchMemo();
  }, [dispatch]);

  return (
    <>
      <div className={styles.frame_header}>
        <AddMemo />
      </div>
      {memos.length ? (
        <div className={styles.frame} ref={memoContainer}>
          {memos &&
            memos.map((memo) => <Memo key={memo.study_board_id} memo={memo} />)}
        </div>
      ) : null}
    </>
  );
}
export default MemoList;
