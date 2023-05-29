export const createMemoR=(state={},action)=>{
    switch(action.type){
        case "CREATE_MEMO_REQ":
            return {loading:true}
        case "CREATE_MEMO_SUC":
            return {loading:false,data:action.payload}
        case "CREATE_MEMO_FAIL":
            return {loading:false,error:action.papyload}
        default:
            return state
    }
}