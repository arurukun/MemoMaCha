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

export const editMemoR=(state={},action)=>{
    switch(action.type){
        case "EDIT_MEMO_REQ":
            return {loading:true}
        case "EDIT_MEMO_SUC":
            return {loading:false,data:action.payload}
        case "EDIT_MEMO_FAIL":
            return {loading:false,error:action.payload}
        default:
            return state
    }
}