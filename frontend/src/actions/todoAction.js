import axios from "axios";

export const createTodoA=(category,todoItems)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"CREATE_TODO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/todo",{category,todoItems},config)
        dispatch({type:"CREATE_TODO_SUC",payload:data})
    }catch(e){
        dispatch({type:"CREATE_TODO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const listTodoA=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"LIST_TODO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.post(process.env.REACT_APP_BACKEND_URL+"/",config)
        dispatch({type:"LIST_TODO_SUC",payload:data})
    }catch(e){
        dispatch({type:"LIST_TODO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}