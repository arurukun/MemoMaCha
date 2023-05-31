import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { userLoginR, userRegisterR } from "./reducers/userReducer"
import { createMemoR } from "./reducers/memoReducer"
import { createTodoR } from "./reducers/todoReducer"

const reducer=combineReducers({
    userLogin:userLoginR,
    userRegister:userRegisterR,
    createMemo:createMemoR,
    createTodo:createTodoR,
})

const userUserInfoFromStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState={userLogin:{userInfo:userUserInfoFromStorage}}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store