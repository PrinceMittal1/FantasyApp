import { POST_All_CONTEST_REQUEST, POST_All_CONTEST_SUCCESS, POST_All_CONTEST_FAIL } from "../types";

export const PostContestAction = (data) => async (dispatch) => {

    try {
        dispatch({ type: POST_All_CONTEST_REQUEST })
        dispatch({ type: POST_All_CONTEST_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: POST_All_CONTEST_FAIL, payload: e?.data ? e?.data : null })
    }
}