import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { getSearchUserR, getUserProfileR, userLoginR, userRegisterR } from "./reducers/userReducer"
import { addReadUserMemoR, addWriteUserMemoR, createMemoR,deleteMemoR,editMemoR,getMemoR,listMemoR } from "./reducers/memoReducer"
import { addReadUserTodoR, addWriteUserTodoR, createTodoR, deleteTodoR, editTodoR, getTodoR, listTodoR } from "./reducers/todoReducer"

const reducer=combineReducers({
    userLogin:userLoginR,
    userRegister:userRegisterR,
    userProfile:getUserProfileR,
    createMemo:createMemoR,
    createTodo:createTodoR,
    listMemo:listMemoR,
    listTodo:listTodoR,
    getMemo:getMemoR,
    getTodo:getTodoR,
    editMemo:editMemoR,
    editTodo:editTodoR,
    deleteMemo:deleteMemoR,
    deleteTodo:deleteTodoR,
    getSearchUser:getSearchUserR,
    addWriteUserMemo:addWriteUserMemoR,
    addReadUserMemo:addReadUserMemoR,
    addWriteUserTodo:addWriteUserTodoR,
    addReadUserTodo:addReadUserTodoR,
})

const userUserInfoFromStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState={userLogin:{userInfo:userUserInfoFromStorage}}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store