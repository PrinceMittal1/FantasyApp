import {createStore, combineReducers, applyMiddleware} from "redux"
import {thunk} from 'redux-thunk'
import { getContestReducer } from "./Reducers/getContestReducer"
import { postContestReducer } from "./Reducers/postContestReducer"
import saveDataMiddleware from "../functions/saveDataToMiddleWare"

const rootReducer = combineReducers({
    allContest : postContestReducer
})

const initialstate = {}

const middleware = [thunk, saveDataMiddleware]

const store = createStore(rootReducer, initialstate, applyMiddleware(...middleware))

export default store
