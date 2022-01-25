import React, { useEffect } from "react";
import { loadMemo } from "../../../../redux/memos";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Memo from "./Memo";
import AddMemo from "./AddMemo";

function BoardList() {
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memos.memos); // 조회
  useEffect(() => {
    const fetchMemo = async () => {
      axios({
        method: "get",
        url: "",
      })
        .then((res) => {
          dispatch(loadMemo(res.data));
        })
        .catch((err) => console.log(err));
    };
    fetchMemo();
  }, [dispatch]);
  return (
    <div>
      <AddMemo />
      {memos.map((memo) => {
        <Memo key={memo.id} />;
      })}
    </div>
  );
}
export default BoardList;
