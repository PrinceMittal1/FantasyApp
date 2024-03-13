import { GET_All_CONTEST_REQUEST, GET_All_CONTEST_SUCCESS, GET_All_CONTEST_FAIL } from "../type";

export const getContestAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_All_CONTEST_REQUEST })
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch({ type: GET_All_CONTEST_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: GET_All_CONTEST_FAIL, payload: e?.data ? e?.data : null })
    }
}