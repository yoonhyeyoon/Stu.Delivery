import { combineReducers } from "redux";
import memos from "./memos";
import user from "./user";

const rootReducer = combineReducers({
  user,
  memos,
});
export default rootReducer;
