import { combineReducers } from "redux";
import memos from "./memos";
import user from "./user";
import study from "./study";

const rootReducer = combineReducers({
  study,
  user,
  memos,
});
export default rootReducer;
