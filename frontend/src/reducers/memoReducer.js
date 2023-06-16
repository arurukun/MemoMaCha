export const createMemoR=(state={},action)=>{
    switch(action.type){
        case "CREATE_MEMO_REQ":
            return {loading:true}
        case "CREATE_MEMO_SUC":
            return {loading:false,data:action.payload}
        case "CREATE_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const listMemoR=(state=[],action)=>{
    switch(action.type){
        case "LIST_MEMO_REQ":
            return {loading:true}
        case "LIST_MEMO_SUC":
            return {loading:false,data:action.payload}
        case "LIST_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getMemoR=(state={},action)=>{
    switch(action.type){
        case "GET_MEMO_REQ":
            return {loading:true}
        case "GET_MEMO_SUC":
            return {loading:false,memo:action.payload}
        case "GET_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const editMemoR=(state={},action)=>{
    switch(action.type){
        case "EDIT_MEMO_REQ":
            return {loading:true}
        case "EDIT_MEMO_SUC":
            return {loading:false,memo:action.payload}
        case "EDIT_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const deleteMemoR=(state={},action)=>{
    switch(action.type){
        case "DELETE_MEMO_REQ":
            return {loading:true}
        case "DELETE_MEMO_SUC":
            return {loading:false,memo:action.payload}
        case "DELETE_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const addWriteUserMemoR=(state={},action)=>{
    switch(action.type){
        case "ADD_WRITE_USER_MEMO_REQ":
            return {loading:true}
        case "ADD_WRITE_USER_MEMO_SUC":
            return {loading:false,memo:action.payload}
        case "ADD_WRITE_USER_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const addReadUserMemoR=(state={},action)=>{
    switch(action.type){
        case "ADD_READ_USER_MEMO_REQ":
            return {loading:true}
        case "ADD_READ_USER_MEMO_SUC":
            return {loading:false,memo:action.payload}
        case "ADD_READ_USER_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}