import axios from "axios"

export const userLonginA=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:"USER_LOGIN_REQ"})
        const config={headers:{"Content-Type":"application/json"}}
        const {data}=await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/user/login",{email,password},config)
        dispatch({type:"USER_LOGIN_SUC",payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(e){
        dispatch({type:"USER_LOGIN_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const userRegisterA=(name,email,password)=>async(dispatch)=>{
    try{
        dispatch({type:"USER_REGISTER_REQ"})
        const config={headers:{"Content-Type":"application/json"}}
    const {data}=await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/user/register",{name,email,password},config)
        dispatch({type:"USER_REGISTER_SUC",payload:data})
        dispatch({type:"USER_LOGIN_SUC",payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(e){
        dispatch({type:"USER_REGISTER_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}

export const logout=()=>(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type:"USER_LOGOUT"})
}

export const getSearchUserA=(userKeyword)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"GET_SEARCH_USER_REQ"})
        const {userLogin:{userInfo}}=getState()
        const config={headers:{"Content-Type":"application/json",Authorization:`Bearer ${userInfo.token}`}}
        const {data}=await axios.get(process.env.REACT_APP_BACKEND_URL+`/api/user/search/?userKeyword=${userKeyword}`,config)
        dispatch({type:"GET_SEARCH_USER_SUC",payload:data})
    }catch(e){
        dispatch({type:"GET_SEARCH_USER_FAIL",payload:e.response&&e.response.message ? e.response.message : e.message})
    }
}
