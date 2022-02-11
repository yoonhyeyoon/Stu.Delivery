import { createAction, handleActions } from "redux-actions";

const GET_STUDY = "user/GET_STUDY";

export const loadStudy = createAction(GET_STUDY, (study) => study);

const study = handleActions(
  {
    [GET_STUDY]: (state, action) => ({
      study: action.payload,
    }),
  },
  {
    study: [],
  }
);
export default study;
