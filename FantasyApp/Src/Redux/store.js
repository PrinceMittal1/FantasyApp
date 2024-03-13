import {createStore, combineReducers, applyMiddleware} from "redux"
import {thunk} from 'redux-thunk'
import { getContestReducer } from "./Reducers/getContestReducer"

const rootReducer = combineReducers({
    allContest : getContestReducer
})

const initialstate = {}

const middleware = [thunk]

const store = createStore(rootReducer, initialstate, applyMiddleware(...middleware))

export default store
