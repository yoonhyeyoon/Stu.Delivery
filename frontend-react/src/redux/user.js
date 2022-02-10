import axios from "axios";
import { useDispatch } from "react-redux";
import { createAction, handleActions } from "redux-actions";
import { setHeader } from "../utils/api";
const GET_USER = "user/GET_USER";
const IS_LOADED = "study/STUDY_INFO_UPDATE";

export const loadUser = createAction(GET_USER, (user) => user);

export const isLoad = createAction(IS_LOADED, (loaded) => loaded);

// export const getUserFB = () => {
//   return function (dispatch) {
//     axios({
//       method: "get",
//       url: "https://i6d201.p.ssafy.io/api/v1/users/me",
//       headers: setHeader(),
//     })
//       .then((res) => {
//         const id = res.data.id;
//         const email = res.data.email;
//         const nickname = res.data.nickname;
//         const profile_img = res.data.profile_img;
//         // action 발생
//         dispatch(loadUser(id, email, nickname, profile_img));
//         dispatch(isLoad(true));
//       })
//       .catch((err) => console.log(err.request));
//   };
// };

//Reducer
const user = handleActions(
  {
    [GET_USER]: (state, action) => ({
      user: action.payload,
    }),
    [IS_LOADED]: (state, { payload: loaded }) => ({
      ...state,
      is_loaded: loaded,
    }),
  },
  {
    user: [],
  }
);
export default user;
