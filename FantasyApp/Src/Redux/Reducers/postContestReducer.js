import { POST_All_CONTEST_REQUEST, POST_All_CONTEST_SUCCESS, POST_All_CONTEST_FAIL } from "../types";


export const postContestReducer = (state = {allContest:[]}, action ) =>{

    // console.log("in reducer ", state)

     switch (action.type){
        case POST_All_CONTEST_REQUEST:
            return {loading : true, allContest:[]}
  
        case POST_All_CONTEST_SUCCESS : 
            return {loading : false, allContest:action.payload}

        case POST_All_CONTEST_FAIL:
            return {loading:true,allContest:[], error : action.payload}

        default: return state

     }
}