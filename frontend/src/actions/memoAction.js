import axios from "axios"

export const createMemoA=(tytle,content)=>async(dispatch,getState)=>{
    try{

        dispatch({type:"CREATE_MEMO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/memo",{tytle,content},config)
        dispatch({type:"CREATE_MEMO_SUC",payload:data})
    }catch(e){
        dispatch({type:"CREATE_MEMO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const listMemoA=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"LIST_MEMO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/memo",config)
        dispatch({type:"LIST_MEMO_SUC",payload:data})
    }catch(e){
        dispatch({type:"LIST_MEMO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const getMemoA=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"GET_MEMO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        // console.log(process.env.REACT_APP_BACKEND_URL)
        // console.log(process.env.REACT_APP_BACKEND_URL+`/api/memo/edit/${id}`)
        const {data}=await axios.get(process.env.REACT_APP_BACKEND_URL+`/api/memo/edit/${id}`,config)
        // console.log(data)
        dispatch({type:"GET_MEMO_SUC",payload:data})
    }catch(e){
        dispatch({type:"GET_MEMO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const editMemoA=(id,tytle,content)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"EDIT_MEMO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.put(process.env.REACT_APP_BACKEND_URL+`/api/memo/edit/${id}`,{tytle,content},config)
        dispatch({type:"EDIT_MEMO_SUC",payload:data})
    }catch(e){
        dispatch({type:"EDIT_MEMO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const deleteMemoA=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"DELETE_MEMO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.delete(process.env.REACT_APP_BACKEND_URL+`/api/memo/edit/${id}`,config)
        dispatch({type:"DELETE_MEMO_SUC",payload:data})
    }catch(e){
        dispatch({type:"DELETE_MEMO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const addWriteUserMemoA=(id,selectedUser)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"ADD_WRITE_USER_MEMO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.post(process.env.REACT_APP_BACKEND_URL+`/api/memo/selectWriteUser/${id}`,{selectedUser},config)
        dispatch({type:"ADD_WRITE_USER_MEMO_SUC",payload:data})
    }catch(e){
        dispatch({type:"ADD_WRITE_USER_MEMO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const addReadUserMemoA=(id,selectedUser)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"ADD_READ_USER_MEMO_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.post(process.env.REACT_APP_BACKEND_URL+`/api/memo/selectReadUser/${id}`,{selectedUser},config)
        dispatch({type:"ADD_READ_USER_MEMO_SUC",payload:data})
    }catch(e){
        dispatch({type:"ADD_READ_USER_MEMO_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}