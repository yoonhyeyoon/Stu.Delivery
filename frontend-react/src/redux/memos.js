import { createAction, handleActions } from "redux-actions";
const MEMO_INSERT = "memos/MEMO_INSERT";
const MEMO_REMOVE = "memos/MEMO_REMOVE";
const MEMO_UPDATE = "memos/MEMO_UPDATE";
const MEMO_LOAD = "memos/MEMO_LOAD";

// GET
export const loadMemo = createAction(MEMO_LOAD, (memos) => memos);
// POST
export const insertMemo = createAction(MEMO_INSERT, (id, content) => ({
  id: id,
  content,
}));
// DELETE
export const removeMemo = createAction(MEMO_REMOVE, (id) => id);
// PUT
export const updateMemo = createAction(MEMO_UPDATE, (id, content) => ({
  id: id,
  content: content,
}));

// Reducer
const memos = handleActions(
  {
    [MEMO_LOAD]: (state, action) => ({
      memos: action.payload,
    }),
    [MEMO_INSERT]: (state, action) => ({
      memos: state.memos.concat(action.payload),
      id: action.id,
    }),
    [MEMO_REMOVE]: (state, { payload: id }) => ({
      ...state,
      memos: state.memos.filter((memo) => memo.id !== id),
    }),
    [MEMO_UPDATE]: (state, { payload: id, content }) => ({
      ...state,
      memos: state.memos.map((memo) =>
        memo.id === id ? { ...memo, content: content } : memo
      ),
    }),
  },
  {
    memos: [],
  }
);
export default memos;
