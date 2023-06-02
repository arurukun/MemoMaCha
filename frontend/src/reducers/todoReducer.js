export const createTodoR=(state={},action)=>{
    switch(action.type){
        case "CREATE_TODO_REQ":
            return {loading:true}
        case "CREATE_TODO_SUC":
            return {loading:false,data:action.payload}
        case "CREATE_TODO_FAIL":
            return {loading:false,error:action.papyload}
        default:
            return state
    }
}

export const listTodoR=(state=[],action)=>{
    switch(action.type){
        case "LIST_TODO_REQ":
            return {loading:true}
        case "LIST_TODO_SUC":
            return {loading:false,data:action.payload}
        case "LIST_TODO_FAIL":
            return {loading:false,error:action.papyload}
        default:
            return state
    }
}