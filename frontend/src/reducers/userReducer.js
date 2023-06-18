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
            return {loading:true, searchUserList:[]}
        case "GET_SEARCH_USER_SUC":
            return {loading:false,searchUserList:action.payload}
        case "GET_SEARCH_USER_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getUserProfileR=(state={},action)=>{
    switch(action.type){
        case "GET_USER_PROFILE_REQ":
            return {loading:true}
        case "GET_USER_PROFILE_SUC":
            return {loading:false,user:action.payload}
        case "GET_USER_PROFILE_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const updateUserProfileR=(state={user:{}},action)=>{
    switch(action.type){
        case "UPDATE_USER_PROFILE_REQ":
            return {loading:true}
        case "UPDATE_USER_PROFILE_SUC":
            return {loading:false,user:action.payload,success:true}
        case "UPDATE_USER_PROFILE_FAIL":
            return {loading:false,error:action.payload}
        case "UPDATE_RESET":
            return {user:{}}
        default:
            return state
    }
}