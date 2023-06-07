import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { userLoginR, userRegisterR } from "./reducers/userReducer"
import { createMemoR,editMemoR,getMemoR,listMemoR } from "./reducers/memoReducer"
import { createTodoR, editTodoR, getTodoR, listTodoR } from "./reducers/todoReducer"

const reducer=combineReducers({
    userLogin:userLoginR,
    userRegister:userRegisterR,
    createMemo:createMemoR,
    createTodo:createTodoR,
    listMemo:listMemoR,
    listTodo:listTodoR,
    getMemo:getMemoR,
    getTodo:getTodoR,
    editMemo:editMemoR,
    editTodo:editTodoR,
})

const userUserInfoFromStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState={userLogin:{userInfo:userUserInfoFromStorage}}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store