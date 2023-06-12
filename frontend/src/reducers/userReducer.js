export const userLoginR=(state={},action)=>{
    switch(action.type){
        case "USER_LOGIN_REQ":
            return {loading:true}
        case "USER_LOGIN_SUC":
            return {loading:false,userInfo:action.payload}
        case "USER_LOGIN_FAIL":
            return {loading:false,error:action.payload}
        case "USER_LOGOUT":
            return {}
        default:
            return state
    }
}

export const userRegisterR=(state={},action)=>{
    switch(action.type){
        case "USER_REGISTER_REQ":
            return {loading:true}
        case "USER_REGISTER_SUC":
            return {loading:false,userInfo:action.payload}
        case "USER_REGISTER_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getSearchUserR=(state=[],action)=>{
    switch(action.type){
        case "GET_SEARCH_USER_REQ":
            return {loading:true}
        case "GET_SEARCH_USER_SUC":
            return {loading:false,searchUserList:action.payload}
        case "GET_SEARCH_USER_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}