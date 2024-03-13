import { GET_All_CONTEST_REQUEST, GET_All_CONTEST_SUCCESS, GET_All_CONTEST_FAIL } from "../type";


export const getContestReducer = (state = {users:[]}, action ) =>{

     switch (action.type){
        case GET_All_CONTEST_REQUEST:
            return {loading : true, users:[]}
  
        case GET_All_CONTEST_SUCCESS : 
            return {loading : false, users:action.payload}

        case GET_All_CONTEST_FAIL:
            return {loading:true, error : action.payload}

        default: return state

     }
}