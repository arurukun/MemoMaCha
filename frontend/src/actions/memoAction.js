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